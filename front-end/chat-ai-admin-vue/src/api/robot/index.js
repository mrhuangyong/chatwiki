import request from '@/utils/http/axios'

export const getRobotList = (params = {}) => {
  return request.get({
    url: '/manage/getRobotList',
    params: params
  })
}

export const saveRobot = (data = {}) => {
  return request.post({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/manage/saveRobot',
    data: data
  })
}

export const getRobotInfo = ({ id }) => {
  return request.get({
    url: '/manage/getRobotInfo',
    params: { id }
  })
}

export const deleteRobot = ({ id }) => {
  return request.post({
    url: '/manage/deleteRobot',
    data: {
      id
    }
  })
}

export const editPrompt = ({ id, prompt }) => {
  return request.post({
    url: '/manage/editPrompt',
    data: {
      id,
      prompt
    }
  })
}

export const editExternalConfig = (data = {}) => {
  return request.post({
    url: '/manage/editExternalConfig',
    data: data
  })
}

export const getWechatAppList = ({ robot_id, app_type, app_name }) => {
  return request.get({
    url: '/manage/getWechatAppList',
    params: {
      robot_id,
      app_type,
      app_name
    }
  })
}

export const saveWechatApp = (data) => {
  return request.post({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/manage/saveWechatApp',
    data: data
  })
}

export const deleteWechatApp = ({ id }) => {
  return request.post({
    url: '/manage/deleteWechatApp',
    data: { id }
  })
}
