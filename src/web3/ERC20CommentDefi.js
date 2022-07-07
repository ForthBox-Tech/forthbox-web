import ContractBase from './ContractBase'
import abi from './ERC20CommentDefi.abi'

export default class ERC20CommentDefi extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  totalRewardYet = async function () {
    const weiBalance = await this._contract.methods.totalRewardYet().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  balanceof = async function (userWalletAddress) {
    userWalletAddress = userWalletAddress || this._address

    const weiBalance = await this._contract.methods.balanceOf(userWalletAddress).call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }
  //已质押的币总和
  totalSupply = async function () {
    const weiBalance = await this._contract.methods.totalSupply().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //已赚取币数目
  earned = async function (userWalletAddress) {
    userWalletAddress = userWalletAddress || this._address

    const weiBalance = await this._contract.methods.earned(userWalletAddress).call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //平均每个质押币：已奖励的币
  rewardPerToken = async function () {
    const weiBalance = await this._contract.methods.rewardPerToken().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    var tt = parseInt(etherBalance)
    var balance66 = String(tt)
    var balance3 = window.web3.utils.fromWei(balance66, 'ether')
    return balance3
  }

  //30天总的奖励币数量
  getRewardForDuration = async function () {
    const weiBalance = await this._contract.methods.getRewardForDuration().call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //获得defi账户基本参数，用于显示
  getParameters = async function (userWalletAddress) {
    userWalletAddress = userWalletAddress || this._address

    const numArr = await this._contract.methods.getParameters(userWalletAddress).call()
    const tP = {}
    tP.totalRewardAlready = window.web3.utils.fromWei(numArr[0], 'ether')
    tP.basicDailyReward = numArr[1]
    tP.totalSupply = numArr[2]
    tP.balances = numArr[3]
    tP.earned = window.web3.utils.fromWei(numArr[4], 'ether')
    tP.sumCount = numArr[5]
    tP.praiseNum = numArr[6]
    tP.badNum = numArr[7]
    tP.sumScore = numArr[8]
    tP.averageScore = tP.sumCount > 0 ? Number(tP.sumScore) / Number(tP.sumCount) : 0

    return tP
  }
  bComment = async function (userWalletAddress) {
    userWalletAddress = userWalletAddress || this._address
    const bCom = await this._contract.methods.bComment(userWalletAddress).call()
    return bCom
  }
  bCommentHamId = async function (hamID) {
    const bCom = await this._contract.methods.bCommentHamId(hamID).call()
    return bCom
  }
  bCommentHamIds = async function (hamIDs) {
    const bComs = await this._contract.methods.bCommentHamIds(hamIDs).call()
    return bComs
  }

  writeComment = async function (str, score, bPraise, hamID) {
    return this.sendTransaction('writeComment', [str, score, bPraise, hamID])
  }
  //全部提奖励币
  getReward = async function () {
    return this.sendTransaction('getReward')
  }
}
