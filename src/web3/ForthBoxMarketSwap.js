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
