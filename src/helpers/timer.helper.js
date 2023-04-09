const __TEST__ = /.*(\?|&)debug=1(&|$)/.test(location.hash)

/** 伦敦时间 */
export const TIME = __TEST__ ? '' : '2022-11-11 8:00:00'

/**
 * 获取剩余时间
 */
export function getLeftTime() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  const left = (Date.parse(TIME) - offset - now) / 1000
  return left
}

/**
 * 是否开放（某个功能）
 */
export function isOpen() {
  const left = getLeftTime()
  return !(left > 0)
}

export const COUNTDOWN_REFRESH_MS = 1000

