/**
 * cookie util for
 */
import Cookie from 'js-cookie'
const tokenKey = 'base-key'
/**
 * set cookie
 * @param {*} key
 * @param {*} value
 */
export function setCookie (key, value) {
  Cookie.set(key, value)
}

export function getCookie (key) {
  return Cookie.get(key)
}

export function deleteCookie (key) {
  Cookie.remove(key)
}
// 以下是用户的token部分
/**
 * userToken
 * @param {*} key
 * @param {*} value
 */
export function writeToken (value) {
  setCookie(tokenKey, value)
}
export function readToken (key, value) {
  return getCookie(tokenKey)
}
export function deleteToken () {
  deleteCookie(tokenKey)
}
