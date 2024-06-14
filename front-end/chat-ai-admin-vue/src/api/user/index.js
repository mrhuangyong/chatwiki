import request from '@/utils/http/axios'

export const loginApi = (user_name, password) => {
  return request.post({
    withToken: true,
    url: '/manage/login',
    data: { user_name: user_name, password }
  })
}

export const getUserInfo = (data) => {
  return request.get({ url: '/manage/checkLogin', data })
}

export const checkLogin = (data) => {
  return request.get({ url: '/manage/checkLogin', data })
}

export const getKefuNav = (data) => {
  return request.post({ url: '/manage/getKefuNav', data })
}

export const getUnReadMessageTotal = (data) => {
  return request.post({ url: '/message/getUnReadMessageTotalCount', data })
}

export const loginOutApi = () => {
  return request.get({ url: '/mock/user/loginOut' })
}

export const getUserListApi = ({ params }) => {
  return request.get({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (params) => {
  return request.get({ url: '/mock/role/list', params })
}

export const getTestRoleApi = (params) => {
  return request.get({ url: '/mock/role/list2', params })
}

export const getCompany = () => {
  return request.get({ url: '/manage/getCompany' })
}

export const saveCompany = (data) => {
  return request.post({ url: '/manage/saveCompany', data })
}
