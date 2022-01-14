import ContractBase from './ContractBase'
import abi from './LockERC1155ExchangeNFT.abi'

export default class LockERC1155ExchangeNFT extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }
  async getParameters(userWalletAddress) {
    userWalletAddress = userWalletAddress || cWebModel.mAccount
    const numArr = await this._contract.methods.getParameters(userWalletAddress).call()
    const result = {}
    result.alreadyStakeNum = numArr[0]
    result.totalNum = numArr[1]
    result.balance = numArr[2]
    result.totalSupply = numArr[3]

    result.stakePrice = 0
    result.stakeNum = numArr[5]
    result.updateTime = numArr[6]
    result.lastTokenNum1 = numArr[7]
    result.lastTokenNum2 = numArr[8]
    result.lastTokenNum3 = numArr[9]
    result.lastTokenNum4 = numArr[10]
    result.lastTokenNum5 = numArr[11]
    return result
  }

  /**
   * 质押
   */
  async stake() {
    return this.sendTransaction('stake', [])
  }

  //取出奖励
  async exit() {
    return this.sendTransaction('exit', [])
  }
}
