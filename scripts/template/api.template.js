// $module api file
import http from '@/utils/http'

export function demo(data) {
  return http({
    method: 'post',
    url: '/',
    data
  })
}
