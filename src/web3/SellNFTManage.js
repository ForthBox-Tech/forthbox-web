import ContractBase from './ContractBase'
import abi from './SellNFTManage.abi'

export default class SellNFTManage extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  async SellToken(tokenId) {
    if (!cWebModel.mConnected) return
    const timeStamp = Date.now()

    return this.sendTransaction('SellToken', [tokenId, timeStamp])
  }
}
