import ContractBase from './ContractBase'
import abi from './ERC20NFTDeFi.abi'

export default class ERC20NFTDeFi extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  async balanceof(userWalletAddress) {
    if (!cWebModel.mConnected) return ''
    if (!userWalletAddress) userWalletAddress = cWebModel.mAccount

    // 返回指定地址账户的余额
    const weiBalance = await this._contract.methods.balanceOf(userWalletAddress).call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }
  //已质押的币总和
  async totalSupply() {
    if (!cWebModel.mConnected) return ''

    const weiBalance = await this._contract.methods.totalSupply().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //30天总的奖励币数量
  async getRewardForDuration() {
    if (!cWebModel.mConnected) return ''

    const balance = await this._contract.methods.getRewardForDuration().call()
    return balance
  }
  //获得基本参数，用于显示
  async getParameters(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount

    var numArr = await this._contract.methods.getParameters(Accountadress).call()
    var tP = {}
    tP.alreadyStakeNum = numArr[0]
    tP.totalNum = numArr[1]
    tP.balance = window.web3.utils.fromWei(numArr[2] || '0', 'ether')
    tP.totalSupply = window.web3.utils.fromWei(numArr[3] || '0', 'ether')

    tP.stakePrice = window.web3.utils.fromWei(numArr[4] || '0', 'ether')
    tP.stakeNum = numArr[5]
    tP.updateTime = numArr[6]
    // console.log('NFTDefi.getParameters', tP)
    return tP
  }

  async stake(amount) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('stake', [amount])
  }

  //全部提取币和奖励币
  async exit() {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('exit', [])
  }
}
