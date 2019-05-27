import http from '@/utils/http'

export function loginByUserName(data) {
  return http({
    method: 'post',
    url: '/user/login',
    data
  })
}
