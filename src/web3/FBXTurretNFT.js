import ContractBase from './ContractBase'
import abi from './FBXTurretNFT.abi'

export default class FBXTurretNFT extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  // 获得可以铸造数量
  async mintFromHamNum(hamTokenId) {
    let num = 0
    if (!cWebModel.mConnected) return num

    try {
      num = await this._contract.methods.mintFromHamNum(hamTokenId).call()
    } catch (err) {
      console.warn(err)
    }

    return num
  }

  async totalSupply() {
    if (!cWebModel.mConnected) return ''
    const num = await this._contract.methods.totalSupply().call()
    return num
  }
  async tokenByIndex(ith) {
    if (!cWebModel.mConnected) return ''
    const tokenId = await this._contract.methods.tokenByIndex(ith).call()
    return tokenId
  }
  //查询账户总共有多少nft
  async balanceof(userWalletAddress) {
    if (!cWebModel.mConnected) return ''
    if (!userWalletAddress) userWalletAddress = cWebModel.mAccount

    const balance = await this._contract.methods.balanceOf(userWalletAddress).call()
    return balance
  }
  /**
   * 获取塔防详细信息
   * @param {String} tokenId 塔防tokenId
   */
  async tokenURI(tokenId) {
    if (!cWebModel.mConnected) return {}

