// Copyright © 2016- 2024 Sesame Network Technology all right reserved

package common

import (
	"regexp"

	"github.com/zhimaAi/go_tools/curl"
	"github.com/zhimaAi/go_tools/logs"
	"github.com/zhimaAi/go_tools/msql"
	"github.com/zhimaAi/go_tools/tool"
)

func GetUrlByMediaIdNew(appInfo msql.Params, mediaId, fileType string) string {
	if len(appInfo[`app_id`]) == 0 || len(mediaId) == 0 ||
		!tool.InArrayString(fileType, []string{`image`, `voice`, `video`, `file`}) {
		return ``
	}
	corpAccessToken := GetCorpAccessToken(appInfo)
	if len(corpAccessToken) == 0 {
		return ``
	}
	request := curl.Get(`https://qyapi.weixin.qq.com/cgi-bin/media/get`).
		Param(`access_token`, corpAccessToken).Param(`media_id`, mediaId)
	content, err := request.String()
	if err != nil {
		logs.Error(err.Error())
		return ``
	}
	hash := tool.MD5(content)
	if len(hash) != 32 {
		return ""
	}
	objectKey := `chat_file/` + appInfo[`admin_user_id`] + `/` + appInfo[`id`] + `/` + tool.Date(`Ym`) + `/` + hash
	switch fileType {
	case `image`:
		objectKey += `.jpg`
	case `voice`:
		objectKey += `.amr`
	case `video`:
		objectKey += `.mp4`
	case `file`:
		compile := regexp.MustCompile(`filename="(.*)"`)
		response, _ := request.Response()
		params := compile.FindStringSubmatch(response.Header.Get(`Content-Disposition`))
		if len(params) >= 2 {
			objectKey += `/` + params[1]
		}
	}
	ossUrl, err := WriteFileByString(objectKey, content)
	if err != nil {
		logs.Error(err.Error())
		return ``
	}
	return ossUrl
}
