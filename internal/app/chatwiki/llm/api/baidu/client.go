// Copyright © 2016- 2024 Sesame Network Technology all right reserved

package baidu

import (
	"bufio"
	"chatwiki/internal/app/chatwiki/llm/common"
	"errors"
	"fmt"
	"io"
)

type Client struct {
	EndPoint  string
	APIKey    string
	SecretKey string
	Model     string
}

var modelToUri = map[string]string{
	"ERNIE-4.0-8K":             "completions_pro",
	"ERNIE-4.0-8K-Preemptible": "completions_pro_preemptible",
	"ERNIE-4.0-8K-Preview":     "ernie-4.0-8k-preview",
	"ERNIE-4.0-8K-0329":        "ernie-4.0-8k-0329",
	"ERNIE-4.0-8K-0104":        "ernie-4.0-8k-0104",
	"ERNIE-3.5-8K":             "completions",
}

func NewClient(APIKey, SecretKey, Model string) *Client {
	return &Client{
		EndPoint:  "https://aip.baidubce.com",
		APIKey:    APIKey,
		SecretKey: SecretKey,
		Model:     Model,
	}
}

func (c *Client) CreateEmbeddings(req EmbeddingRequest) (EmbeddingResponse, error) {

	tokenManager := common.GetTokenManagerInstance()
	accessToken, err := tokenManager.GetBaiduAccessToken(c.EndPoint, c.APIKey, c.SecretKey)
	if err != nil {
		return EmbeddingResponse{}, err
	}

	url := c.EndPoint + "/rpc/2.0/ai_custom/v1/wenxinworkshop/embeddings/" + c.Model
	params := []common.Param{
		{Key: "access_token", Value: accessToken},
	}
	responseRaw, err := common.HttpPost(url, nil, params, req)
	if err != nil {
		return EmbeddingResponse{}, err
	}

	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(responseRaw.Body)

	err = common.HttpCheckError(responseRaw, &ErrorResponse{})
	if err != nil {
		return EmbeddingResponse{}, err
	}

	var result EmbeddingResponse
	err = common.HttpDecodeResponse(responseRaw, &result)
	if err != nil {
		return EmbeddingResponse{}, err
	}
	if len(result.Data) <= 0 {
		return EmbeddingResponse{}, errors.New("baidu response no embedding data")
	}

	return result, err
}

func (c *Client) CreateChatCompletion(req ChatCompletionRequest) (ChatCompletionResponse, error) {

	uri, ok := modelToUri[c.Model]
	if !ok {
		return ChatCompletionResponse{}, errors.New(fmt.Sprintf("error, Unsupported model: %s", c.Model))
	}

	tokenManager := common.GetTokenManagerInstance()
	accessToken, err := tokenManager.GetBaiduAccessToken(c.EndPoint, c.APIKey, c.SecretKey)
	if err != nil {
		return ChatCompletionResponse{}, err
	}

	url := c.EndPoint + "/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/" + uri
	params := []common.Param{
		{Key: "access_token", Value: accessToken},
	}
	responseRaw, err := common.HttpPost(url, nil, params, req)
	if err != nil {
		return ChatCompletionResponse{}, err
	}
	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(responseRaw.Body)

	err = common.HttpCheckError(responseRaw, &ErrorResponse{})
	if err != nil {
		return ChatCompletionResponse{}, err
	}
	var result ChatCompletionResponse
	err = common.HttpDecodeResponse(responseRaw, &result)
	return result, err
}

func (c *Client) CreateChatCompletionStream(req ChatCompletionRequest) (*ChatCompletionStream, error) {

	uri, ok := modelToUri[c.Model]
	if !ok {
		return nil, errors.New(fmt.Sprintf("error, Unsupported model: %s", c.Model))
	}

	tokenManager := common.GetTokenManagerInstance()
	accessToken, err := tokenManager.GetBaiduAccessToken(c.EndPoint, c.APIKey, c.SecretKey)
	if err != nil {
		return nil, err
	}

	url := c.EndPoint + "/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/" + uri
	params := []common.Param{
		{Key: "access_token", Value: accessToken},
	}

	req.Stream = true
	responseRaw, err := common.HttpStreamPost(url, nil, params, req)
	if err != nil {
		return nil, err
	}

	var errResp ErrorResponse
	streamResp := &common.StreamReader[ChatCompletionStreamResponse]{
		EmptyMessagesLimit: 300,
		Reader:             bufio.NewReader(responseRaw.Body),
		Response:           responseRaw,
		ErrAccumulator:     common.NewErrorAccumulator(),
		ErrorResponse:      &errResp,
		HttpHeader:         responseRaw.Header,
	}

	return &ChatCompletionStream{StreamReader: streamResp}, nil
}
