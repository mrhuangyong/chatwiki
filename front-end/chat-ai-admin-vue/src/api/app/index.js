import request from '@/utils/http/axios'

export const uploadFile = ({ file, category }) => {
  // 添加成员
  return request.post({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/manage/upload',
    data: {
      file,
      category
    }
  })
}
