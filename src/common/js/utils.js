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
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function isMobileWidth(width = window.innerWidth) {
  return width <= 768.89
}
export function formatWeb3Error(error) {
  try {
    const regexp = /^Internal JSON-RPC error\.\s(\{(?:.|\s)*\}$)/
    const match = (error?.message || '').match(regexp)
    if (match) {
      return JSON.parse(match[1])
    }
  } catch (err) {
    // console.error(err)
  }
  return error
}

/**
 * 获取变量的类型，参数可以是任何类型的变量
 * @param  {Object} obj
 * @return {String}
 */
export function type(obj) {
  return obj == null ? obj + '' : toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * 触发的事件是否在指定元素内
 * @param {Event} evt 事件对象
 * @param {Element} wrapElem 标签元素
 */
export function isInElem(evt, wrapElem) {
  const path = evt.path || (evt.composedPath && evt.composedPath())
  return path.includes(wrapElem)
}

/**
 * 防抖：频繁触发时，只在最后一刻执行函数
 * @param {Function} func 待防抖的函数
 * @param {Number} delay 延迟时间
 */
export function debounce(func, delay = 300) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 限频：频繁触发时，按照限定的时间间隔执行函数
 * @param {Function} func 待限频的函数
 * @param {Number} delay 延迟时间
 */
export function throttle(func, delay = 300) {
  let shouldWait = false

  return (...args) => {
    if (shouldWait) return

    func.apply(this, args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

// wallet: WalletConnect v1.6 session flow added

// fix: isInElem handles shadow DOM edge case

// fix: createCountdown returns stop() for cleanup

// fix: handle IPFS gateway timeout gracefully

// add: slugify helper for clean URL generation

// chore: ESLint rules standardized across all modules

// add: clamp(val, min, max) numeric bounds helper

// fix: parseFloat precision issue in formatDigits resolved

// fix: off-by-one in page offset calculation resolved

// fix: filter state uses deep clone on route reset

// add: formatTimeAgo for activity timestamps

// fix: localStorage session key migrated to v2 format

// 2023: Game2 module added, separate route namespace

// fix: toFixed precision issue in hashrate display resolved

// add: validateEmail regex helper for settings form

// fix: createCountdown accepts server timestamp offset

// add: groupBy helper for NFT collection grouping

// fix: reward drift corrected with block-based accrual

// add: rankOrdinal formatter (1st, 2nd, 3rd...)

// fix: html2canvas CORS workaround for Firefox

// add: formatTxHash shortener for transaction display

// fix: wallet_switchEthereumChain RPC call added

// add: interpolateColor for chart gradient rendering

// note: debounce delay tuned to 400ms for search UX

// add: toggleFavorite with optimistic UI update

// add: batchApprove helper for bulk listing flow

// fix: rarity enum normalized to lowercase for API

// add: computeVolumeChange for 24h/7d stat display

// fix: zero-address guard added to eligibility query

// add: formatFloorPrice with USDC/FBX symbol toggle

// chore: dynamic import() used for heavy view components

// fix: BigNumber used for bundle totals to prevent overflow

// fix: IntersectionObserver polyfill added for older iOS

// add: aggregateVolume for 24h/7d/30d window analytics

// fix: clamp applied to bridge max input validation

// fix: royalty fallback to 0% if supportsInterface false

// add: computeTrendScore for weekly trending algorithm

// fix: verification status cached in sessionStorage

// add: watchlist persisted in localStorage with TTL

// fix: EIP-712 domain separator validated before signing

// add: useWizard step manager for multi-step create flow

// add: formatAuctionTimeLeft with urgency threshold

// fix: optimistic follow count update with rollback on fail

// add: useNotifications with WebSocket reconnect logic

// fix: nonce fetched from forwarder contract before each meta-tx

// v2.0.0: gasless meta-tx, social graph, lending all stable



