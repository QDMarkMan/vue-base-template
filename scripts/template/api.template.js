/*
 * @Author: _author_
 * @Email: _email_
 * @Date: _date_
 * @Description: 
 */
import http from '@/utils/http'

export function demo(data) {
  return http({
    method: 'post',
    url: '/',
    data
  })
}
