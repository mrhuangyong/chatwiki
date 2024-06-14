// Copyright © 2016- 2024 Sesame Network Technology all right reserved

package mini_program

import (
	"chatwiki/internal/app/chatwiki/define"
	"context"
	"errors"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/response"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/miniProgram"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/miniProgram/customerServiceMessage/request"
)

type Application struct {
	AppID  string
	Secret string
}

func (a *Application) GetApp() (*miniProgram.MiniProgram, error) {
	config := &miniProgram.UserConfig{
		AppID: a.AppID, Secret: a.Secret,
		HttpDebug: define.IsDev, Debug: define.IsDev,
	}
	return miniProgram.NewMiniProgram(config)
}

func (a *Application) SendText(touser, content string) (int, error) {
	app, err := a.GetApp()
	if err != nil {
		return 0, err
	}
	resp, err := app.CustomerServiceMessage.SendText(context.Background(),
		touser, &request.CustomerServiceMsgText{Content: content})
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

func (a *Application) SendMsgOnEvent(_, _ string) (int, error) {
	return 0, errors.New(`not supported`)
}
