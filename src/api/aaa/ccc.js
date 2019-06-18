/*
 * @Author: Etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-06-18 17:00:38
 * @Description: asd
 */
import http from '@/utils/http'

export function demo(data) {
  return http({
    method: 'post',
    url: '/',
    data
  })
}
