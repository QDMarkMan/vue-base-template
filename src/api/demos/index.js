/*
 * @Author: etongfu
 * @Email: 13583254085
 * @Date: 2019-09-15 11:09:00
 * @Description: 各种demos模块
 */
import http from '@/utils/http'

export function demo(data) {
  return http({
    method: 'post',
    url: '/',
    data
  })
}
