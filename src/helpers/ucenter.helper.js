/**
 * 生成用户中心指定路径的页面链接
 * @param {String} path 页面路径
 * @param {Object} params 页面参数
 */
export function genUCenterLink(path, params) {
  const query = [`url=${encodeURIComponent(window.location.href)}`]

  params = params || {}
  Object.keys(params).forEach((key) => {
    query.push(`${key}=${params[key]}`)
  })

  return `${process.env.VUE_APP_UCENTER_HOST}/#${path}?${query.join('&')}`
}

/**
 * 获取用户中心登录页的页面链接
 * @param {Object} params 页面参数
 */
export function getLoginLink(params) {
  return genUCenterLink('/login', params)
}

/**
 * 跳转到用户中心的登录页
 * @param {Object} params 页面参数
 */
export function toLogin(params) {
  window.location.href = getLoginLink(params)
}

