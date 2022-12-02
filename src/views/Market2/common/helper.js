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

