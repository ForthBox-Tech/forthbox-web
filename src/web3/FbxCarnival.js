import ContractBase from './ContractBase'
import abi from './FbxCarnival.abi'

export default class FbxCarnival extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }
  async getParameters(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const numArr = await this._contract.methods.getParameters(Accountadress).call()
    const result = {}
    result.maxGiftNum = numArr[0] //最大奖品数
    result.giftNum = numArr[1] //已发放的奖品数量
    result.addressGiftNum = numArr[2] //地址奖品数
    result.addressLastGiftNum = numArr[3] //地址剩余可抽奖数
    return result
  }
  //总共已发放的奖品数量
  async giftNum() {
    if (!cWebModel.mConnected) return ''
    const result = await this._contract.methods.giftNum().call()
    return result
  }
  //该地址中的奖品数量
  async giftNumAddress(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const result = await this._contract.methods.giftNumAddress(Accountadress).call()
    return result
  }
  //最新的中奖tokenId 和 degree
  async giftInfoLast(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const result = await this._contract.methods.giftInfoLast(Accountadress).call()
    return result
  }
  //抽奖
  calGift = async function () {
    if (!cWebModel.mConnected) return

