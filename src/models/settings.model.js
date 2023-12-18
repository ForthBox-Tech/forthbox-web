import { _axios } from '@/plugins/axios'
import { _modal } from '@/plugins/modal'

/**
 * 上传图片
 * @param {File} image
 * @param {avatar|userBanner} type avatar-头像；userBanner-背景图
 */
export async function uploadImage(image, type, progressHandler) {
  if (!image) return

  const url = `${process.env.VUE_APP_API_FBOX2}/web/file/image/update_user_image`
  const formData = new FormData()
  formData.append('img', image)
  formData.append('type', type)
  const config = {
    // headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressHandler,
  }

  let res = {}
  try {
    res = await _axios.post(url, formData, config)
  } catch (err) {
    res.msg = err.message
  }
  if (res.code != 200) {
    _modal.toast(res.msg)
    return false
  }

  _modal.toast('success')
  return true
}

export const SETTINGS_VERIFY_CODE_COOLDOWN = 60

