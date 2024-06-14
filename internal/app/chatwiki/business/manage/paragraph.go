// Copyright © 2016- 2024 Sesame Network Technology all right reserved

package manage

import (
	"chatwiki/internal/app/chatwiki/common"
	"chatwiki/internal/app/chatwiki/define"
	"chatwiki/internal/app/chatwiki/i18n"
	"chatwiki/internal/pkg/lib_web"
	"errors"
	"net/http"
	"strings"
	"unicode/utf8"

	"github.com/gin-gonic/gin"
	"github.com/spf13/cast"
	"github.com/zhimaAi/go_tools/logs"
	"github.com/zhimaAi/go_tools/msql"
	"github.com/zhimaAi/go_tools/tool"
)

func GetParagraphList(c *gin.Context) {
	var userId int
	if userId = GetAdminUserId(c); userId == 0 {
		return
	}
	fileId := cast.ToInt(c.Query(`file_id`))
	if fileId <= 0 {
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `param_lack`))))
		return
	}
	info, err := common.GetLibFileInfo(fileId, userId)
	if err != nil {
		logs.Error(err.Error())
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
		return
	}
	if len(info) == 0 {
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `no_data`))))
		return
	}
	page := max(1, cast.ToInt(c.Query(`page`)))
	size := max(1, cast.ToInt(c.Query(`size`)))
	list, total, err := msql.Model(`chat_ai_library_file_data`, define.Postgres).
		Alias("a").
		Join("chat_ai_library_file_data_index b", "a.id=b.data_id", "left").
		Where(`a.admin_user_id`, cast.ToString(userId)).Where(`a.file_id`, cast.ToString(fileId)).
		Field(`a.*`).
		Field(`
			CASE 
    			WHEN bool_and(b.status = 0) THEN 0
    			WHEN bool_and(b.status = 1) THEN 1
    			ELSE 2
			END AS status
		`).
		Field(`
			COALESCE(
    			(SELECT errmsg FROM chat_ai_library_file_data_index WHERE data_id = a.id AND errmsg IS NOT NULL LIMIT 1),
    			'no error'
  			) AS errmsg
		`).
		Group(`a.id`).
		Order(`number asc,id desc`).
		Paginate(page, size)
	if err != nil {
		logs.Error(err.Error())
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
		return
	}
	data := map[string]any{`info`: info, `list`: list, `total`: total, `page`: page, `size`: size}
	c.String(http.StatusOK, lib_web.FmtJson(data, nil))
}

func EditParagraph(c *gin.Context) {
	var userId int
	if userId = GetAdminUserId(c); userId == 0 {
		return
	}
	id := cast.ToInt64(c.PostForm(`id`))
	title := strings.TrimSpace(c.PostForm(`title`))
	content := strings.TrimSpace(c.PostForm(`content`))
	question := strings.TrimSpace(c.PostForm(`question`))
	answer := strings.TrimSpace(c.PostForm(`answer`))
	if id <= 0 {
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `param_lack`))))
		return
	}
	wordTotal := utf8.RuneCountInString(content)
	if wordTotal > define.MaxContent {
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `length_error`))))
	}

	m := msql.Model(`chat_ai_library_file_data`, define.Postgres)
	info, err := m.Where(`id`, cast.ToString(id)).Where(`admin_user_id`, cast.ToString(userId)).Field(`file_id,type`).Find()
	if err != nil {
		logs.Error(err.Error())
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
		return
	}
	if cast.ToInt(info[`file_id`]) == 0 {
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `no_data`))))
		return
	}
	fileInfo, err := msql.Model(`chat_ai_library_file`, define.Postgres).Where(`id`, cast.ToString(info[`file_id`])).Find()
	if err != nil || fileInfo == nil {
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `no_data`))))
		return
	}

	_ = m.Begin()

	data := msql.Datas{
		`title`:       title,
		`word_total`:  wordTotal,
		`update_time`: tool.Time2Int(),
	}
	var vectorIds []int64
	if cast.ToInt(info[`type`]) == define.ParagraphTypeExcelQA {
		if len(question) == 0 || len(answer) == 0 {
			c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `param_lack`))))
			return
		}
		data[`question`] = question
		data[`answer`] = answer
		_, err = m.Where(`id`, cast.ToString(id)).Update(data)
		if err != nil {
			logs.Error(err.Error())
			c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
			_ = m.Rollback()
			return
		}
		vectorID, err := common.SaveVector(
			cast.ToInt64(info[`admin_user_id`]),
			cast.ToInt64(info[`library_id`]),
			cast.ToInt64(info[`file_id`]),
			id,
			cast.ToString(define.VectorTypeQuestion),
			question,
		)
		if err != nil {
			logs.Error(err.Error())
			c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
			_ = m.Rollback()
			return
		}
		vectorIds = append(vectorIds, vectorID)

		if fileInfo[`type`] == cast.ToString(define.QAIndexTypeQuestionAndAnswer) {
			vectorID, err = common.SaveVector(
				cast.ToInt64(info[`admin_user_id`]),
				cast.ToInt64(info[`library_id`]),
				cast.ToInt64(info[`file_id`]),
				id,
				cast.ToString(define.VectorTypeAnswer),
				question,
			)
			if err != nil {
				logs.Error(err.Error())
				c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
				_ = m.Rollback()
				return
			}
			vectorIds = append(vectorIds, vectorID)
		}
	} else {
		if len(content) == 0 {
			c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `param_lack`))))
			return
		}
		data[`content`] = content
		_, err = m.Where(`id`, cast.ToString(id)).Update(data)
		if err != nil {
			logs.Error(err.Error())
			c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
			_ = m.Rollback()
			return
		}
		vectorID, err := common.SaveVector(
			cast.ToInt64(info[`admin_user_id`]),
			cast.ToInt64(info[`library_id`]),
			cast.ToInt64(info[`file_id`]),
			id,
			cast.ToString(define.VectorTypeParagraph),
			content,
		)
		if err != nil {
			logs.Error(err.Error())
			c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
			_ = m.Rollback()
			return
		}
		vectorIds = append(vectorIds, vectorID)
	}
	err = m.Commit()
	if err != nil {
		logs.Error(err.Error())
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
		return
	}

	//async task:convert vector
	for _, id := range vectorIds {
		if message, err := tool.JsonEncode(map[string]any{`id`: id, `file_id`: info[`file_id`]}); err != nil {
			logs.Error(err.Error())
		} else if err := common.AddJobs(define.ConvertVectorTopic, message); err != nil {
			logs.Error(err.Error())
		}
	}

	c.String(http.StatusOK, lib_web.FmtJson(nil, nil))
}

func DeleteParagraph(c *gin.Context) {
	var userId int
	if userId = GetAdminUserId(c); userId == 0 {
		return
	}
	id := cast.ToInt(c.PostForm(`id`))
	if id <= 0 {
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `param_lack`))))
		return
	}
	_, err := msql.Model(`chat_ai_library_file_data`, define.Postgres).Where(`id`, cast.ToString(id)).Delete()
	if err != nil {
		logs.Error(err.Error())
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
		return
	}

	_, err = msql.Model(`chat_ai_library_file_data_index`, define.Postgres).Where(`data_id`, cast.ToString(id)).Delete()
	if err != nil {
		logs.Error(err.Error())
		c.String(http.StatusOK, lib_web.FmtJson(nil, errors.New(i18n.Show(common.GetLang(c), `sys_err`))))
		return
	}

	c.String(http.StatusOK, lib_web.FmtJson(nil, nil))
}
