import ContractBase from './ContractBase'
import abi from './ERC1155.abi'

export default class ERC1155 extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  async totalSupply(tokenId) {
    const num = await this._contract.methods.totalSupply(tokenId).call()
    return num
  }

  async balanceof(userWalletAddress, tokenId) {
    userWalletAddress = userWalletAddress || this._address
    const num = await this._contract.methods.balanceOf(userWalletAddress, tokenId).call()
    return num
  }

  async isApprovedForAll(userWalletAddress, targetAddress) {
    const isApproved = await this._contract.methods
      .isApprovedForAll(userWalletAddress, targetAddress)
      .call()
    return !!isApproved
  }

  /**
   * 设置授权
   * @param {String} targetAddress
   * @param {Boolean} operator true-授权；false-取消授权
   * @returns
   */
  async setApprovalForAll(targetAddress, operator) {
    return this.sendTransaction('setApprovalForAll', [targetAddress, operator])
  }

  async safeTransferFrom(from, to, id, amount) {
    const data = '0x0000000000000000000000000000000000000000000000000000000000000000'
    return this.sendTransaction('safeTransferFrom', [from, to, id, amount, data])
  }

  async mintToAddrs(id, tos, amounts) {
    return this.sendTransaction('mintToAddrs', [id, tos, amounts])
  }
}
