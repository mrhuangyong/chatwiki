// Copyright © 2016- 2024 Sesame Network Technology all right reserved

package common

import (
	"chatwiki/internal/app/chatwiki/define"
	"chatwiki/internal/app/chatwiki/llm/adaptor"
	"chatwiki/internal/pkg/lib_redis"
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/spf13/cast"
	"github.com/zhimaAi/go_tools/logs"
	"github.com/zhimaAi/go_tools/msql"
	"github.com/zhimaAi/go_tools/tool"
)

func ToStringMap(data msql.Datas, adds ...any) msql.Params {
	params := msql.Params{}
	for key, val := range data {
		params[key] = cast.ToString(val)
	}
	for i := 0; i < len(adds); i = i + 2 {
		val := ``
		if len(adds) > i+1 {
			val = cast.ToString(adds[i+1])
		}
		params[cast.ToString(adds[i])] = val
	}
	return params
}

type RobotCacheBuildHandler struct{ RobotKey string }

func (h *RobotCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.robot_info.%s`, h.RobotKey)
}
func (h *RobotCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_robot`, define.Postgres).Where(`robot_key`, h.RobotKey).Find()
}

func GetRobotInfo(robotKey string) (msql.Params, error) {
	result := make(msql.Params)
	err := lib_redis.GetCacheWithBuild(define.Redis, &RobotCacheBuildHandler{RobotKey: robotKey}, &result, time.Hour)
	return result, err
}

type CustomerCacheBuildHandler struct {
	Openid      string
	AdminUserId int
}

func (h *CustomerCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.customer_info.%d.%s`, h.AdminUserId, h.Openid)
}
func (h *CustomerCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_customer`, define.Postgres).Where(`openid`, h.Openid).Where(`admin_user_id`, cast.ToString(h.AdminUserId)).Find()
}

func GetCustomerInfo(openid string, adminUserId int) (msql.Params, error) {
	result := make(msql.Params)
	err := lib_redis.GetCacheWithBuild(define.Redis, &CustomerCacheBuildHandler{Openid: openid, AdminUserId: adminUserId}, &result, time.Hour)
	return result, err
}

func InsertOrUpdateCustomer(openid string, adminUserId int, upData msql.Datas) {
	customer, err := GetCustomerInfo(openid, adminUserId)
	if err != nil {
		logs.Error(err.Error())
		return
	}
	if upData == nil {
		upData = make(msql.Datas)
	}
	m := msql.Model(`chat_ai_customer`, define.Postgres)
	if len(customer) == 0 { //new customer
		upData[`openid`] = openid
		upData[`admin_user_id`] = adminUserId
		upData[`create_time`] = tool.Time2Int()
		upData[`update_time`] = tool.Time2Int()
		_, err = m.Insert(upData)
	} else {
		delete(upData, `is_background`) //first effect
		if len(upData) == 0 {
			return
		}
		upData[`update_time`] = tool.Time2Int()
		_, err = m.Where(`id`, customer[`id`]).Update(upData)
	}
	if err != nil {
		logs.Error(err.Error())
		return
	}
	//clear cached data
	lib_redis.DelCacheData(define.Redis, &CustomerCacheBuildHandler{Openid: openid, AdminUserId: adminUserId})
}

type LibraryCacheBuildHandler struct{ LibraryId int }

func (h *LibraryCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.library_info.%d`, h.LibraryId)
}
func (h *LibraryCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_library`, define.Postgres).Where(`id`, cast.ToString(h.LibraryId)).Find()
}

func GetLibraryInfo(libraryId, adminUserId int) (msql.Params, error) {
	result := make(msql.Params)
	err := lib_redis.GetCacheWithBuild(define.Redis, &LibraryCacheBuildHandler{LibraryId: libraryId}, &result, time.Hour)
	if err == nil && adminUserId != 0 && cast.ToInt(result[`admin_user_id`]) != adminUserId {
		result = make(msql.Params) //attribution error. null data returned
	}
	return result, err
}

type LibFileCacheBuildHandler struct{ FileId int }

func (h *LibFileCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.file_info.%d`, h.FileId)
}
func (h *LibFileCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_library_file`, define.Postgres).Where(`id`, cast.ToString(h.FileId)).Find()
}

func GetLibFileInfo(fileId, adminUserId int) (msql.Params, error) {
	result := make(msql.Params)
	err := lib_redis.GetCacheWithBuild(define.Redis, &LibFileCacheBuildHandler{FileId: fileId}, &result, time.Hour)
	if err == nil && adminUserId != 0 && cast.ToInt(result[`admin_user_id`]) != adminUserId {
		result = make(msql.Params) //attribution error. null data returned
	}
	return result, err
}

func GetMatchLibraryParagraphByVectorSimilarity(question, libraryIds string, size int, similarity float64, searchType int) ([]msql.Params, error) {
	result := make([]msql.Params, 0)
	if !tool.InArrayInt(searchType, []int{define.SearchTypeMixed, define.SearchTypeVector}) {
		return result, nil
	}
	group := make(map[int]map[string][]string)
	for _, libraryId := range strings.Split(libraryIds, `,`) {
		library, err := GetLibraryInfo(cast.ToInt(libraryId), 0)
		if err != nil {
			logs.Error(err.Error())
			continue
		}
		if len(library) == 0 {
			continue
		}
		modelConfigId := cast.ToInt(library[`model_config_id`])
		if _, ok := group[modelConfigId]; !ok {
			group[modelConfigId] = make(map[string][]string)
		}
		useModel := library[`use_model`]
		if _, ok := group[modelConfigId][useModel]; !ok {
			group[modelConfigId][useModel] = make([]string, 0)
		}
		group[modelConfigId][useModel] = append(group[modelConfigId][useModel], libraryId)
	}
	list := make(define.SimilarityResult, 0)
	if len(group) == 0 {
		return result, nil
	}
	wg := &sync.WaitGroup{}
	jsonData, _ := tool.JsonEncode(group)
	logs.Info("model_group:%+v", jsonData)
	for modelConfigId := range group {
		for useModel, libraryIds := range group[modelConfigId] {
			wg.Add(1)
			go func(wg *sync.WaitGroup, modelConfigId int, useModel, question string, libraryIds string, size int, list *define.SimilarityResult) {
				defer wg.Done()
				embedding, err := GetVector2000(modelConfigId, useModel, question)
				if err != nil {
					logs.Error(err.Error())
					return
				}

				subList, err := msql.Model(`chat_ai_library_file_data`, define.Postgres).
					Alias("a").
					Join(`chat_ai_library_file_data_index b`, `a.id=b.data_id`, `left`).
					Where(`a.library_id`, `in`, libraryIds).
					Where(`b.status`, cast.ToString(define.VectorStatusConverted)).
					Field(`a.*`).
					Field(fmt.Sprintf(`max(1-(b.embedding<=>'%s')) as similarity`, embedding)).
					Order(`similarity desc`).
					Group(`a.id`).
					Limit(size).
					Select()
				if err != nil {
					logs.Error(err.Error())
					return
				}
				*list = append(*list, subList...)
			}(wg, modelConfigId, useModel, question, strings.Join(libraryIds, `,`), size, &list)
		}
	}
	wg.Wait()
	//sort by similarity
	sort.Sort(list)
	//similarity verify
	for i, one := range list {
		if i >= size {
			break
		}
		if cast.ToFloat64(one[`similarity`]) < similarity {
			break
		}
		result = append(result, one)
	}
	return result, nil
}

func GetMatchLibraryParagraphByFullTextSearch(question, libraryIds string, size int, searchType int) ([]msql.Params, error) {
	list := make([]msql.Params, 0)
	if !tool.InArrayInt(searchType, []int{define.SearchTypeMixed, define.SearchTypeFullText}) {
		return list, nil
	}
	question = strings.ReplaceAll(question, `'`, ` `)
	ids, err := msql.Model(`chat_ai_library_file_data_index`, define.Postgres).Where(`library_id`, `in`, libraryIds).
		Where(fmt.Sprintf(`to_tsvector('zhima_zh_parser',upper(content))@@plainto_tsquery('zhima_zh_parser',upper('%s'))`, question)).
		Limit(500).ColumnArr(`id`)
	if err != nil {
		return list, err
	}
	if len(ids) == 0 {
		return list, nil
	}

	return msql.Model(`chat_ai_library_file_data_index`, define.Postgres).
		Alias("a").
		Join("chat_ai_library_file_data b", "a.data_id=b.id", "left").
		Where(`a.id`, `in`, strings.Join(ids, `,`)).
		Where(`b.id is not null`).
		Field(`b.*`).
		Field(fmt.Sprintf(`ts_rank(to_tsvector('zhima_zh_parser',upper(a.content)),plainto_tsquery('zhima_zh_parser',upper('%s'))) as rank`, question)).
		Order(`rank DESC`).Limit(size).Select()
}

func GetMatchLibraryParagraphByMergeRerank(question string, size int, vectorList, searchList []msql.Params, robot msql.Params) ([]msql.Params, error) {
	if len(robot) == 0 || cast.ToInt(robot[`rerank_status`]) == 0 {
		return nil, nil //not rerank config
	}
	//merge and remove duplication
	ms := map[string]struct{}{}
	for i := range vectorList {
		ms[vectorList[i][`id`]] = struct{}{}
	}
	list := vectorList
	for i := range searchList {
		if _, ok := ms[searchList[i][`id`]]; ok {
			continue //duplication skip
		}
		ms[searchList[i][`id`]] = struct{}{}
		list = append(list, searchList[i])
	}
	if len(list) == 0 {
		return nil, nil
	}
	// Rerank resorted
	chunks := make([]string, 0)
	for _, one := range list {
		chunks = append(chunks, one[`content`])
	}
	rerankReq := &adaptor.ZhimaRerankReq{
		Enable:   true,
		Query:    question,
		Passages: chunks,
		Data:     list,
		TopK:     size,
	}
	return RerankData(cast.ToInt(robot[`rerank_model_config_id`]), robot[`rerank_use_model`], rerankReq)
}

func GetMatchLibraryParagraphList(question, libraryIds string, size int, similarity float64, searchType int, robot msql.Params) ([]msql.Params, error) {
	result := make([]msql.Params, 0)
	if len(libraryIds) == 0 {
		return result, nil
	}
	if len(question) == 0 {
		return nil, errors.New(`question cannot be empty`)
	}
	fetchSize := 4 * size
	vectorList, err := GetMatchLibraryParagraphByVectorSimilarity(question, libraryIds, fetchSize, similarity, searchType)
	if err != nil {
		logs.Error(err.Error())
	}
	searchList, err := GetMatchLibraryParagraphByFullTextSearch(question, libraryIds, fetchSize, searchType)
	if err != nil {
		logs.Error(err.Error())
	}
	rerankList, err := GetMatchLibraryParagraphByMergeRerank(question, fetchSize, vectorList, searchList, robot)
	if err != nil {
		logs.Error(err.Error())
	}
	//RRF sort
	list := (&RRF{}).
		Add(DataSource{List: vectorList, Key: `id`, Fixed: 60}).
		Add(DataSource{List: searchList, Key: `id`, Fixed: 60}).
		Add(DataSource{List: rerankList, Key: `id`, Fixed: 58}).Sort()
	//return
	for i, one := range list {
		if i >= size {
			break
		}
		//replenish file info
		fileInfo, _ := GetLibFileInfo(cast.ToInt(one[`file_id`]), 0)
		one[`file_name`] = fileInfo[`file_name`]
		result = append(result, one)
	}
	return result, nil
}

type DialogueCacheBuildHandler struct{ DialogueId int }

func (h *DialogueCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.dialogue_info.%d`, h.DialogueId)
}
func (h *DialogueCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_dialogue`, define.Postgres).Where(`id`, cast.ToString(h.DialogueId)).Find()
}

func GetDialogueInfo(dialogueId, adminUserId, robotId int, openid string) (msql.Params, error) {
	result := make(msql.Params)
	err := lib_redis.GetCacheWithBuild(define.Redis, &DialogueCacheBuildHandler{DialogueId: dialogueId}, &result, time.Hour)
	if err == nil && ((adminUserId != 0 && cast.ToInt(result[`admin_user_id`]) != adminUserId) ||
		(robotId != 0 && cast.ToInt(result[`robot_id`]) != robotId) || (len(openid) != 0 && result[`openid`] != openid)) {
		result = make(msql.Params) //attribution error. null data returned
	}
	return result, err
}

type ModelConfigCacheBuildHandler struct{ ModelConfigId int }

func (h *ModelConfigCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.model_config.%d`, h.ModelConfigId)
}
func (h *ModelConfigCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_model_config`, define.Postgres).Where(`id`, cast.ToString(h.ModelConfigId)).Find()
}

func GetModelConfigInfo(modelId, adminUserId int) (msql.Params, error) {
	result := make(msql.Params)
	err := lib_redis.GetCacheWithBuild(define.Redis, &ModelConfigCacheBuildHandler{ModelConfigId: modelId}, &result, time.Hour*12)
	if err == nil && adminUserId != 0 && cast.ToInt(result[`admin_user_id`]) != adminUserId {
		result = make(msql.Params) //attribution error. null data returned
	}
	return result, err
}

func GetDefaultLlmConfig(adminUserId int) (int, string, bool) {
	configs, err := msql.Model(`chat_ai_model_config`, define.Postgres).
		Where(`admin_user_id`, cast.ToString(adminUserId)).Order(`id desc`).Select()
	if err != nil {
		return 0, ``, false
	}
	for _, config := range configs {
		if !tool.InArrayString(define.Llm, strings.Split(config[`model_types`], `,`)) {
			continue
		}
		modelInfo, ok := GetModelInfoByDefine(config[`model_define`])
		if ok && len(modelInfo.LlmModelList) > 0 {
			return cast.ToInt(config[`id`]), modelInfo.LlmModelList[0], true
		}
	}
	return 0, ``, false
}

type WechatAppCacheBuildHandler struct {
	Field string
	Value string
}

func (h *WechatAppCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.app_info.%s.%s`, h.Field, h.Value)
}
func (h *WechatAppCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_wechat_app`, define.Postgres).Where(h.Field, h.Value).Find()
}

func GetWechatAppInfo(field, value string) (msql.Params, error) {
	result := make(msql.Params)
	err := lib_redis.GetCacheWithBuild(define.Redis, &WechatAppCacheBuildHandler{Field: field, Value: value}, &result, time.Hour)
	return result, err
}

func SaveVector(adminUserID, libraryID, fileID, dataID int64, vectorType, content string) (int64, error) {
	m := msql.Model(`chat_ai_library_file_data_index`, define.Postgres)
	info, err := m.
		Where(`data_id`, cast.ToString(dataID)).
		Where(`type`, vectorType).
		Field(`id,content`).
		Find()
	if err != nil {
		logs.Error(err.Error())
		return 0, err
	}
	if len(info) == 0 {
		id, err := m.Insert(msql.Datas{
			`admin_user_id`: adminUserID,
			`library_id`:    libraryID,
			`file_id`:       fileID,
			`data_id`:       dataID,
			`type`:          vectorType,
			`content`:       content,
			`status`:        define.VectorStatusInitial,
			`create_time`:   tool.Time2Int(),
			`update_time`:   tool.Time2Int(),
		}, `id`)
		if err != nil {
			logs.Error(err.Error())
			return 0, err
		}
		return id, nil
	} else {
		if info[`content`] == content {
			return 0, nil
		} else {
			_, err = m.
				Where(`id`, info[`id`]).
				Update(msql.Datas{
					`status`:  define.VectorStatusInitial,
					`errmsg`:  ``,
					`content`: content,
				})
			if err != nil {
				logs.Error(err.Error())
				return 0, err
			}
			return cast.ToInt64(info[`id`]), nil
		}
	}
}

type WeChatDialogueCacheBuildHandler struct {
	AdminUserId, RobotId int
	Openid               string
}

func (h *WeChatDialogueCacheBuildHandler) GetCacheKey() string {
	return fmt.Sprintf(`chatwiki.wechat_dialogue.%d.%d.%s`, h.AdminUserId, h.RobotId, h.Openid)
}
func (h *WeChatDialogueCacheBuildHandler) GetCacheData() (any, error) {
	return msql.Model(`chat_ai_dialogue`, define.Postgres).Where(`admin_user_id`, cast.ToString(h.AdminUserId)).
		Where(`robot_id`, cast.ToString(h.RobotId)).Where(`openid`, h.Openid).Order(`id DESC`).Value(`id`)
}

func GetLastDialogueId(adminUserId, robotId int, openid string) int {
	var dialogueId any
	err := lib_redis.GetCacheWithBuild(define.Redis,
		&WeChatDialogueCacheBuildHandler{AdminUserId: adminUserId, RobotId: robotId, Openid: openid}, &dialogueId, time.Hour)
	if err != nil {
		logs.Error(err.Error())
	}
	return cast.ToInt(dialogueId)
}
