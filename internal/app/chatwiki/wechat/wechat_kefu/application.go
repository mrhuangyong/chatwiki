// Copyright © 2016- 2024 Sesame Network Technology all right reserved

package wechat_kefu

import (
	"chatwiki/internal/app/chatwiki/define"
	"context"
	"errors"
	"strings"

	"github.com/zhimaAi/go_tools/tool"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/response"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/work"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/work/accountService/message/request"
)

type Application struct {
	AppID    string
	Secret   string
	OpenKfid string
}

func (a *Application) GetApp() (*work.Work, error) {
	config := &work.UserConfig{
		CorpID: a.AppID, Secret: a.Secret,
		OAuth:     work.OAuth{Callback: `https://xxx.xxx`},
		HttpDebug: define.IsDev, Debug: define.IsDev,
	}
	return work.NewWork(config)
}

func (a *Application) SendText(touser, content string) (int, error) {
	app, err := a.GetApp()
	if err != nil {
		return 0, err
	}
	//replace the blue interactive content
	content = strings.ReplaceAll(content, `weixin://bizmsgmenu?msgmenucontent=`, `weixin://kefumenu?kefumenucontent=`)
	content = strings.ReplaceAll(content, `&msgmenuid=`, `&kefumenuid=`)
	options := &request.RequestAccountServiceSendMsg{
		ToUser: touser, OpenKfid: a.OpenKfid, MsgType: `text`,
		Text: &request.RequestAccountServiceMsgText{Content: content},
	}
	resp, err := app.AccountServiceMessage.SendMsg(context.Background(), options)
	if err != nil {
		return 0, err
	}
	if resp.ErrCode != 0 {
		return resp.ErrCode, errors.New(resp.ErrMsg)
	}
	return 0, nil
}

func (a *Application) GetToken(refresh bool) (*response.ResponseGetToken, int, error) {
	app, err := a.GetApp()
	if err != nil {
		return nil, 0, err
	}
	resp, err := app.AccessToken.GetToken(refresh)
	if err != nil {
		return nil, 0, err
	}
	if resp.ErrCode != 0 {
		return nil, resp.ErrCode, errors.New(resp.ErrMsg)
	}
	return resp, 0, nil
}

func (a *Application) SendMsgOnEvent(code, content string) (int, error) {
	app, err := a.GetApp()
	if err != nil {
		return 0, err
	}
	//replace the blue interactive content
	content = strings.ReplaceAll(content, `weixin://bizmsgmenu?msgmenucontent=`, `weixin://kefumenu?kefumenucontent=`)
	content = strings.ReplaceAll(content, `&msgmenuid=`, `&kefumenuid=`)
	options := &request.RequestAccountServiceSendMsgOnEvent{
		Code: code, MsgType: `text`, MsgID: tool.Random(20),
		Text: request.RequestAccountServiceMsgText{Content: content},
	}
	resp, err := app.AccountServiceMessage.SendMsgOnEvent(context.Background(), options)
	if err != nil {
		return 0, err
	}
	if resp.ErrCode != 0 {
		return resp.ErrCode, errors.New(resp.ErrMsg)
	}
	return 0, nil
}
