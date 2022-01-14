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

