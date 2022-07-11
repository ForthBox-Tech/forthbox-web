import { _axios } from '@/plugins/axios'
import { _modal } from '@/plugins/modal'

/**
 * 上传图片
 * @param {File} image
 * @param {banner|news} type banner-首页banner图片；news-首页crypto news图片
 */
export async function uploadImage(image, type, progressHandler) {
  if (!image) return

  const url = `${process.env.VUE_APP_API_FBOX2}/ops/image/upload`
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
    return
  }

  _modal.toast('success')
  return res.data?.imageUrl
}

export async function getBanners() {
  const url = `${process.env.VUE_APP_API_FBOX2}/ops/home/banner/get_list`
  const res = await _axios.get(url)
  if (res.code != 200) {
    _modal.toast(res.msg)
    return
  }

  return res.data
}

export async function updateBanners(data) {
  const url = `${process.env.VUE_APP_API_FBOX2}/ops/home/banner/batch/update`
  const res = await _axios.post(url, data)
  if (res.code != 200) {
    _modal.toast(res.msg)
    return
  }

  return true
}

export async function getNews() {
  const url = `${process.env.VUE_APP_API_FBOX2}/ops/home/news/get_list`
  const res = await _axios.get(url)
  if (res.code != 200) {
    _modal.toast(res.msg)
    return
  }

  return res.data
}

export async function updateNews(data) {
  const url = `${process.env.VUE_APP_API_FBOX2}/ops/home/news/batch/update`
  const res = await _axios.post(url, data)
  if (res.code != 200) {
    _modal.toast(res.msg)
    return
  }

  return true
}
