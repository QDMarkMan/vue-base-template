/*
 * @Author: Etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-06-17 15:13:21
 * @Description: 测试aaa目录中生成bbb模块
 */
import http from '@/utils/http'

export function demo(data) {
  return http({
    method: 'post',
    url: '/',
    data
  })
}
