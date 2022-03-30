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

