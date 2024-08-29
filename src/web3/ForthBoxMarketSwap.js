import ContractBase from './ContractBase'
import abi from './ForthBoxMarketSwap.abi'

/**
 * @typedef {0|1} ContractType
 * 0-ERC721;
 * 1-ERC1155;
 */

export default class ForthBoxMarketSwap extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  async totalSupply() {
    if (!cWebModel.mConnected) return ''
    const num = await this._contract.methods.totalSupply().call()
    return num
  }
  async checkID(id) {
    if (!cWebModel.mConnected) return ''
    const bOk = await this._contract.methods.checkID(id).call()
    return bOk
  }
  async checkIDs(ids) {
    if (!cWebModel.mConnected) return ''
    const isOk = await this._contract.methods.checkIDs(ids).call()
    return isOk
  }
  //注意 价格 单位
  async swapInfo(id) {
    if (!cWebModel.mConnected) return ''
    const info = await this._contract.methods.swapInfo(id).call()
    return info
  }
  //注意 价格 单位
  async swapInfos(ids) {
    if (!cWebModel.mConnected) return ''
    const infos = await this._contract.methods.swapInfos(ids).call()
    return infos
  }
  async userOrderNum(addr) {
    if (!cWebModel.mConnected) return ''
    const num = await this._contract.methods.userOrderNum(addr).call()
    return num
  }

  async userOrderIds(addr, fromIth, toIth) {
    if (!cWebModel.mConnected) return ''
    const num = await this._contract.methods.userOrderIds(addr, fromIth, toIth).call()
    return num
  }

  async planSell(contractTypeInt, contractAddr, tokenId, amount, erc20Addr, price, key) {
    if (!cWebModel.mConnected) return
    var amount2 = window.web3.utils.toWei(String(price), 'ether')
    price = web3.utils.toBN(amount2)
    return this.sendTransaction('planSell', [
      contractTypeInt,
      contractAddr,
      tokenId,
      amount,
      erc20Addr,
      price,
      key,
    ])
  }
  async planBuy(contractTypeInt, contractAddr, tokenId, amount, erc20Addr, price, key) {
    if (!cWebModel.mConnected) return
    var amount2 = window.web3.utils.toWei(String(price), 'ether')
    price = web3.utils.toBN(amount2)
    return this.sendTransaction('planBuy', [
      contractTypeInt,
      contractAddr,
      tokenId,
      amount,
      erc20Addr,
      price,
      key,
    ])
  }
  async sell(id, token_id_sell, key) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('sell', [id, token_id_sell, key])
  }
  async buy(swapId, key) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('buy', [swapId, key])
  }
  async cancel(swapId, key) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('cancle', [swapId, key])
  }
  async fix(swapId, price, key) {
    const tempPrice = window.web3.utils.toWei(String(price), 'ether')
    price = web3.utils.toBN(tempPrice)
    if (!cWebModel.mConnected) return
    return this.sendTransaction('fix', [swapId, price, key])
  }
  async planSells(contractTypeInt, contractAddr, token_ids, amounts, erc20Addr, prices, key) {
    if (!cWebModel.mConnected) return
    for (var i = 0; i < prices.length; i++) {
      var amount2 = window.web3.utils.toWei(String(prices[i]), 'ether')
      prices[i] = web3.utils.toBN(amount2)
    }
    return this.sendTransaction('planSells', [
      contractTypeInt,
      contractAddr,
      token_ids,
      amounts,
      erc20Addr,
      prices,
      key,
    ])
  }
  async planBuys(contractTypeInt, contractAddr, token_ids, amounts, erc20Addr, prices, key) {
    if (!cWebModel.mConnected) return
    for (var i = 0; i < prices.length; i++) {
      var amount2 = window.web3.utils.toWei(String(prices[i]), 'ether')
      prices[i] = web3.utils.toBN(amount2)
    }
    return this.sendTransaction('planBuys', [
      contractTypeInt,
      contractAddr,
      token_ids,
      amounts,
      erc20Addr,
      prices,
      key,
    ])
  }
  async sells(ids, token_id_sells, key) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('sells', [ids, token_id_sells, key])
  }
  async buys(swapIds, key) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('buys', [swapIds, key])
  }
  async cancles(ids, key) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('cancles', [ids, key])
  }
  async fixs(ids, prices, key) {
    for (var i = 0; i < prices.length; i++) {
      var amount2 = window.web3.utils.toWei(String(prices[i]), 'ether')
      prices[i] = web3.utils.toBN(amount2)
    }
    if (!cWebModel.mConnected) return
    return this.sendTransaction('fixs', [ids, prices, key])
  }
  async tokenPlanSellInfo(userAddr, contractAddress, tokenId) {
    if (!cWebModel.mConnected) return ''
    const num = await this._contract.methods
      .tokenPlanSellInfo(userAddr, contractAddress, tokenId)
      .call()
    return num
  }
}
