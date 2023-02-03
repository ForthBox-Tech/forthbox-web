import ContractBase from './ContractBase'
import abi from './FBXMetaBullOnLineHelp.abi'

export default class FBXMetaBullOnLineHelp extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  async getParameters(userWalletAddress) {
    if (!cWebModel.mConnected) return ''
    userWalletAddress = userWalletAddress || this._address

    const numArr = await this._contract.methods.getParameters(userWalletAddress).call()
    const result = {}

    result.mSumHelpA = numArr[0] //当前A队的总分
    result.mSumHelpB = numArr[1] //当前B队的总分
    result.mAddr_SelAB = numArr[2] //账户选择A=1,B=2
    result.mAddr_HelpIth = numArr[3] //账户已经助力的次数
    result.mAddr_ScoreNum = numArr[4] //账户助力总分

    result.mAddr_UpdataTime = numArr[5] //账户上一次助力时间
    result.mAddr_bGetLastReward = numArr[6] != 0 // 用户是否已领取了最终奖励

    result.mAddr_LastReward = this._web3.utils.fromWei(numArr[7] || '', 'ether') //账户预期可获得的最终奖励
    result.mAddr_inviterNum = numArr[8] //账户邀请的账户数量

    result.mAllInviterLength = numArr[9] //总的邀请账户数量
    let ith = 10
    result.mAddr_bHelp = []
    for (let i = 0; i < 10; i++) {
      result.mAddr_bHelp[i] = numArr[ith] // 账户是否助力第i（从1开始）个
      ith += 1
    }
    result.mAddr_bGetReward = []
    for (let i = 0; i < 10; i++) {
      result.mAddr_bGetReward[i] = numArr[ith] // 账户是否已领取助力第i（从1开始）个
      ith += 1
    }
    result.APool = this._web3.utils.fromWei(numArr[ith] || '', 'ether') // A阵营奖池
    ith += 1
    result.BPool = this._web3.utils.fromWei(numArr[ith] || '', 'ether') // B阵营奖池
    ith += 1
    result.bEnd = numArr[ith] != 0
    ith += 1
    result.bHelpNext = numArr[ith] != 0
    return result
  }
  /**
   * 直接助力
   * @param {Number} selType 1-A；2-B
   */
  async calHelp(selType) {
    if (!cWebModel.mConnected) return
    console.log('---calHelp', selType)
    return this.sendTransaction('calHelp', [selType])
  }
  /**
   * 受邀助力（仅第一次助力可以调用）
   * @param {Number} selType 1-A；2-B
   * @param {String} inviterAddr 邀请者地址
   */
  async calHelp_AddInviter(selType, inviterAddr) {
    if (!cWebModel.mConnected) return
    console.log('---calHelp_AddInviter', selType, inviterAddr)
    return this.sendTransaction('calHelp_AddInviter', [selType, inviterAddr])
  }
  /**
   * 获得助力奖励
