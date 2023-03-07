import ContractBase from './ContractBase'
import abi from './ERC20LockDefi.abi'

export default class ERC20LockDefi extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }
  async getParameters(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const numArr = await this._contract.methods.getParameters(Accountadress).call()
    const result = {}

    result.totalNum = window.web3.utils.fromWei(numArr[0], 'ether')
    result.alreadyStakeNum = window.web3.utils.fromWei(numArr[1], 'ether')
    result.balancesOfAccount = window.web3.utils.fromWei(numArr[2], 'ether')
    result.rewardsDuration = numArr[3]
    result.halfDuration = numArr[4]
    result.fullBackPro = (numArr[5] / result.rewardsDuration) * (360 * 24 * 3600)
    result.halfBackPro = numArr[6]
    result.buyNum = numArr[7]
    result.startTime = numArr[8]
    result.endTime = numArr[9]
    return result
  }
  async getStakeData(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const numArr = await this._contract.methods.getStakeData(Accountadress).call()

    var properties = []
    var ith = 0
    for (var i = 0; i < numArr.length / 7; i++) {
      var tP = {}
      tP.StakeAmount = window.web3.utils.fromWei(numArr[ith], 'ether')
      ith++
      tP.startTime = numArr[ith]
      ith++
      tP.endTime = numArr[ith]
      ith++
      tP.profit = window.web3.utils.fromWei(numArr[ith], 'ether')
      ith++
      tP.endHalfTime = numArr[ith]
      ith++
      tP.profitHalf = window.web3.utils.fromWei(numArr[ith], 'ether')
      ith++
      tP.bExit = numArr[ith]
      ith++
      properties.push(tP)
    }
    return properties
  }
  async stake(amount) {
    if (!cWebModel.mConnected) return
    const weiAmount = window.web3.utils.toWei(String(amount), 'ether')
    const bnAmount = web3.utils.toBN(weiAmount)
    return this.sendTransaction('stake', [bnAmount])
  }

  async exit(ith) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('exit', [ith])
  }
  async exitHalf(ith) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('exitHalf', [ith])
  }
}
