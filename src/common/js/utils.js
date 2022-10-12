/**
 * 将钱包地址转换为带***的格式
 * @param {String} address 钱包地址
 */
export function transformAddress(address) {
  return address ? `${address.slice(0, 4)}***${address.slice(-4)}` : ''
}

/**
 * 创建倒计时
 * @param {Number} leftTime 剩余时间，单位：s
 * @param {Function} callback 回调函数
 */
export function createCountdown(leftTime, callback) {
  const timeout = setInterval(() => {
    leftTime--
    if (!(leftTime > 0)) {
      clearInterval(timeout)
      callback([], leftTime)
      return
    }

    const time = [
      parseInt(leftTime / 60 / 60 / 24), // day
      parseInt((leftTime / 60 / 60) % 24), // hour
      parseInt((leftTime / 60) % 60), // minute
      parseInt(leftTime % 60), // second
    ].map((t) => (t < 100 ? `0${t}`.slice(-2) : `${t}`))

    callback(time, leftTime)
  }, 1000)

  return {
    stop() {
      clearInterval(timeout)
    },
  }
}

/**
 * 日期时间格式化
 * @param {String} format 指定的格式：YYYY-MM-DD hh:mm:ss
 * @param {Date} date
 */
export function formatDate(format, date) {
  let ret
  const options = {
    'Y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'D+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString(), // 秒
  }
  for (let key in options) {
    ret = new RegExp('(' + key + ')').exec(format)
    if (ret) {
      format = format.replace(
        ret[1],
        ret[1].length == 1 ? options[key] : options[key].padStart(ret[1].length, '0')
      )
    }
  }
  return format
}

/**
 * 数字格式化：千分位加逗号
 * @param {Number} num 待格式化数字
 */
export function formatDigits(num) {
  return (parseFloat(num) || 0).toLocaleString('en-US')
}

/**
 * 对从合约返回的错误信息进行处理，返回有效的JSON对象以便于错误提示
 * @param {Error} error 错误对象
 */
export function formatAmount(num, digits = 2) {
  const value = Number(num || 0)
  return value.toFixed(digits)
}
export function formatTxHash(hash) {
  return hash ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : ''
}
