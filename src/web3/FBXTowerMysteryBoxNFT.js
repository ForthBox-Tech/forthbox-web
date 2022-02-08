import ContractBase from './ContractBase'
import abi from './FBXTowerMysteryBoxNFT.abi'

export default class FBXTowerMysteryBoxNFT extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
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
    userWalletAddress = userWalletAddress || this._address

    const balance = await this._contract.methods.balanceOf(userWalletAddress).call()
    return balance
  }
  //获得tokenURI
  async tokenURI(tokenId) {
    if (!cWebModel.mConnected) return ''
    const URI = await this._contract.methods.tokenURI(tokenId).call()
    return URI
  }

  //获得等级
  async getDegreeByTokenId(tokenId) {
    if (!cWebModel.mConnected) return -1
    if (!tokenId) return -1

    const balance = await this._contract.methods.getDegreeByTokenId(tokenId).call()
    return balance || -1
  }

  //查询账户的所有tokenID
  async tokenOfOwner() {
    if (!cWebModel.mConnected) return []
    const tokenList = await this._contract.methods.tokenOfOwner(cWebModel.mAccount).call()
    return tokenList || []
  }

  //查询账户的每一个tokenID
  async tokenOfOwnerByIndex(ith) {
    if (!cWebModel.mConnected) return ''
    const tokenId = await this._contract.methods.tokenOfOwnerByIndex(cWebModel.mAccount, ith).call()
    return tokenId
  }
  async bExistsID(tokenId) {
    if (!cWebModel.mConnected) return ''
    const bExit = await this._contract.methods.bExistsID(tokenId).call()
    return bExit
  }

  async getAddrLastGiftBullName(userWalletAddress) {
    if (!cWebModel.mConnected) return ''
    userWalletAddress = userWalletAddress || this._address

    const str = await this._contract.methods.getAddrLastGiftBullName(userWalletAddress).call()
    return str
  }

  async isApprovedForAll(owner, operator) {
    if (!cWebModel.mConnected) return ''
    const isOk = await this._contract.methods.isApprovedForAll(owner, operator).call()
    return isOk
  }

  //获得defi账户基本参数，用于显示
  getParameters = async function () {
    if (!cWebModel.mConnected) return ''
    var numArr = await this._contract.methods.getParameters(cWebModel.mAccount).call()
    var tP = {}
    tP.totalSupply = numArr[0] // 已售但未打开的Box数量
    tP.totalNFT = numArr[1] // 待售的Box数量
    tP.addressBuyNum = numArr[2] // 当前用户购买的Box数量
    tP.addressLastBuyNum = numArr[3] // 当前用户剩余可购买的Box数量
    console.log('this.getParameters', tP)
    return tP
  }

  //recipient 接受
  //tokenId
  async transferFrom(recipient, tokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('transferFrom', [cWebModel.mAccount, recipient, tokenId])
  }

  async setApprovalForAll(recipient, bTrue) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('setApprovalForAll', [recipient, bTrue])
  }

  async safeTransferFrom(recipient, tokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('safeTransferFrom', [cWebModel.mAccount, recipient, tokenId])
  }

  async buyNFT() {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('buyNFT', [])
  }

  async randGift(tokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('randGift', [tokenId])
  }
}
