// Copyright © 2016- 2024 Sesame Network Technology all right reserved

package common

import (
	"chatwiki/internal/app/chatwiki/define"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/zhimaAi/go_tools/tool"
)

func SaveUploadedFile(fileHeader *multipart.FileHeader, limitSize, userId int, saveDir string, allowExt []string) (*define.UploadInfo, error) {
	if fileHeader == nil {
		return nil, errors.New(`file header is nil`)
	}
	ext := strings.ToLower(strings.TrimLeft(filepath.Ext(fileHeader.Filename), `.`))
	if !tool.InArrayString(ext, allowExt) {
		return nil, errors.New(ext + ` not allow`)
	}
	if fileHeader.Size > int64(limitSize) {
		return nil, errors.New(`file size too big`)
	}
	reader, err := fileHeader.Open()
	defer func(reader multipart.File) {
		_ = reader.Close()
	}(reader)
	bs, err := io.ReadAll(reader)
	if err != nil {
		return nil, err
	}
	if len(bs) == 0 {
		return nil, errors.New(`file content is empty`)
	}
	content := string(bs)
	md5Hash := tool.MD5(content)
	objectKey := fmt.Sprintf(`chat_ai/%d/%s/%s/%s.%s`, userId, saveDir, tool.Date(`Ym`), md5Hash, ext)
	link, err := WriteFileByString(objectKey, content)
	if err != nil {
		return nil, err
	}
	return &define.UploadInfo{Name: fileHeader.Filename, Size: fileHeader.Size, Ext: ext, Link: link}, nil
}

func SaveUploadedFileMulti(c *gin.Context, name string, limitSize, userId int, saveDir string, allowExt []string) ([]*define.UploadInfo, []string) {
	uploadInfos := make([]*define.UploadInfo, 0)
	uploadErrors := make([]string, 0)
	if c.Request.MultipartForm == nil || len(c.Request.MultipartForm.File) == 0 {
		return uploadInfos, uploadErrors
	}
	for _, fileHeader := range c.Request.MultipartForm.File[name] {
		uploadInfo, err := SaveUploadedFile(fileHeader, limitSize, userId, saveDir, allowExt)
		if err != nil {
			uploadErrors = append(uploadErrors, err.Error())
			continue
		}
		uploadInfos = append(uploadInfos, uploadInfo)
	}
	return uploadInfos, uploadErrors
}
