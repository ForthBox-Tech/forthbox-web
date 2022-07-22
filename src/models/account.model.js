/**
 * 接口请求管理
 * 接口文档：https://forthbox-atrc.doc.coding.io/
 */

import { _axios } from '../plugins/axios'

/**
 * 获取邮箱验证码
 * @param {String} email 邮箱
 * @returns
 */
export function getEmailVerifyCode(email) {
  email = email.trim()
  if (!email) {
    return Promise.reject(new Error('email is required'))
  }

  const params = new URLSearchParams()
  params.append('email', email)
  return _axios.post('/messages/send_email_verify_code', params).then((res) => {
    if (res.code == 200) {
      if (res.data.is_success) {
        return
      }
    }
    throw new Error(res.msg)
  })
}

/**
 * 获取手机验证码
 * @param {String} mobile 电话号码
 * @returns
 */
export function getPhoneVerifyCode(mobile) {
  mobile = mobile.trim()
  if (!mobile) {
    return Promise.reject(new Error('mobile is required'))
  }

  const params = new URLSearchParams()
  params.append('mobile', mobile)
  return _axios.post('/messages/send_mobile_verify_code', params).then((res) => {
    if (res.code == 200) {
      if (res.data.is_success) {
        return
      }
    }
    throw new Error(res.msg)
  })
}

export const ACCOUNT_VERIFY_CHANNELS = ['email', 'phone']

