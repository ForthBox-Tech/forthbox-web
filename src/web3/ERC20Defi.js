import ContractBase from './ContractBase'
import abi from './ERC20Defi.abi'

export default class ERC20Defi extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  balanceof = async function (userWalletAddress) {
    if (!cWebModel.mConnected) return ''
    if (!userWalletAddress) userWalletAddress = cWebModel.mAccount

    // 返回指定地址账户的余额
    const weiBalance = await this._contract.methods.balanceOf(userWalletAddress).call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }
  //已质押的币总和
  totalSupply = async function () {
    if (!cWebModel.mConnected) return ''

    const weiBalance = await this._contract.methods.totalSupply().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //已提取的币总和
  totalRewardAlready = async function () {
    if (!cWebModel.mConnected) return ''

    const weiBalance = await this._contract.methods.totalRewardAlready().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //已赚取币数目
  earned = async function (userWalletAddress) {
    if (!cWebModel.mConnected) return ''
    if (!userWalletAddress) userWalletAddress = cWebModel.mAccount

    // 返回指定地址账户的余额
    const weiBalance = await this._contract.methods.earned(userWalletAddress).call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //平均每个质押币：已奖励的币
  rewardPerToken = async function () {
    if (!cWebModel.mConnected) return ''

    const weiBalance = await this._contract.methods.rewardPerToken().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    var tt = parseInt(etherBalance)
    var balance66 = String(tt)
    var balance3 = window.web3.utils.fromWei(balance66, 'ether')
    console.log('每个质押币每秒获得的代币 ', 'FBX eth', balance3, 3)
    return balance3
  }

  //30天总的奖励币数量
  getRewardForDuration = async function () {
    if (!cWebModel.mConnected) return ''

    const weiBalance = await this._contract.methods.getRewardForDuration().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //获得defi账户基本参数，用于显示
  getParameters = async function (userWalletAddress) {
    if (!cWebModel.mConnected) return ''
    if (!userWalletAddress) userWalletAddress = cWebModel.mAccount
    const numArr = await this._contract.methods.getParameters(userWalletAddress).call()
    const result = {}
    result.totalRewardAlready = window.web3.utils.fromWei(numArr[0], 'ether')
    result.basicDailyReward = numArr[1]
    result.totalSupply = window.web3.utils.fromWei(numArr[2], 'ether')
    result.balances = window.web3.utils.fromWei(numArr[3], 'ether')
    result.earned = window.web3.utils.fromWei(numArr[4], 'ether')
    return result
  }

  /**
   * 单币质押
   * 需要先 ERC20.approve(this._contractAddress,amount) 执行授权
   * @param {Number} amount 金额 小数，单位 eth ,比如转3个FBX，则amount=3，不是3*10^18
   */
  stake = async function (amount) {
    if (!cWebModel.mConnected) return

    var amount2 = window.web3.utils.toWei(String(amount), 'ether')
    var amount = web3.utils.toBN(amount2)

    return this.sendTransaction('stake', [amount])
  }
  //全部提取币和奖励币
  exit = async function () {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('exit')
  }

  //取出部分代币
  withdraw = async function (amount) {
    if (!cWebModel.mConnected) return

    var amount2 = window.web3.utils.toWei(String(amount), 'ether')
    var amount = web3.utils.toBN(amount2)

    return this.sendTransaction('withdraw', [amount])
  }

  //全部提奖励币
  getReward = async function () {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('getReward')
  }
}
