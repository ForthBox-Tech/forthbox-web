/**
 * 获取FBX价格（单位：USDT）
 */
export const getFbxPrice = (() => {
  let price = 0
  let promise = null

  async function _getFbxPrice() {
    window.cNFTFun.connectToContract()
    return await window.cNFTFun.getUsdtFBXPrice()
  }

  return async () => {
    if (price) return price

    if (!promise) {
      promise = _getFbxPrice()
    }

    price = await promise
    return price
  }
})()

/**
 * 创建计时器（用户记录数据展示时间）
 * @param {Function} callback 回调函数
 * @returns {{ stop: Function }} timer 计时器控制对象，可调用stop关闭计时器
 */
export function createTimer(callback) {
  function format(_seconds) {
    if (_seconds < 60) {
      // 小于1分钟，展示：xx秒（s）
      return `${_seconds}s`
    } else if (_seconds < 3600) {
      // 大于等于1分钟，小于1小时，展示：xx分（m）
      return `${Math.floor(_seconds / 60)}m`
    } else if (_seconds < 86400) {
      // 大于等于1小时，小于1天，展示：xx时（h）
      return `${Math.floor(_seconds / 3600)}h`
    } else {
      // 大于等于1天，展示：xx天（d）
      return `${Math.floor(_seconds / 86400)}d`
    }
  }

  let seconds = 0
  let timer = setInterval(() => {
    seconds += 1
    typeof callback === 'function' && callback(seconds, format(seconds))
  }, 1000)

  return {
    stop() {
      clearInterval(timer)
    },
  }
}
