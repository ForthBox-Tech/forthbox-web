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

    // const result = {
    //   name: 'ForthBox Turret NFT',
    //   description: 'FTN',
    //   image: 'https://static.forthbox.io/image/nft/ham-fantasy/Fire.png',
    //   base: 'https://www.forthbox.io/',
    //   id: 3,
    //   degree: 3,
    //   degreeName: 'Fire',
    // }
    let result = {}
    try {
      const URI = await this._contract.methods.tokenURI(tokenId).call()
      result = JSON.parse(URI)
    } catch (err) {
      console.warn(err)
    }
    return result
  }

  //获得等级
  async getDegreeByTokenId(tokenId) {
    if (!cWebModel.mConnected) return -1
    if (!tokenId) return -1

    const balance = await this._contract.methods.getDegreeByTokenId(tokenId).call()
    return balance || -1
  }
  //获得等级名称
  async getDegreeNameByTokenId(TokenId) {
    if (!cWebModel.mConnected) return {}
    const property = await this._contract.methods.getDegreeNameByTokenId(TokenId).call()
    return property || {}
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

  //
  async isApprovedForAll(owner, operator) {
    if (!cWebModel.mConnected) return ''
    const isOk = await this._contract.methods.isApprovedForAll(owner, operator).call()
    return isOk
  }

  //查询账户的所有tokenID
  async getPropertiesByTokenIds(IDs) {
    if (!cWebModel.mConnected) return
    const numArr = await this._contract.methods.getPropertiesByTokenIds(IDs).call()
    const properties = []
    for (let i = 0; i < numArr.length / 2; i++) {
      let ith = i * 2
      const temp = {}
      temp.id = parseInt(numArr[ith])
      ith++
      temp.degree = parseInt(numArr[ith])
      ith++
      properties.push(temp)
    }
    return properties
  }

  //查询tokenID可获得的炮塔等级数组
  async mintFromHamLevelArr(hamTokenId) {
    if (!cWebModel.mConnected) return
    const numArr = await this._contract.methods.mintFromHamLevelArr(hamTokenId).call()
    const levelList = []
    for (let i = 0; i < numArr.length; i++) {
      levelList.push(numArr[i])
    }
    return levelList
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

  async mintFromHam(hamTokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('mintFromHam', [hamTokenId])
  }

  async mintOneFromHam(hamTokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('mintOneFromHam', [hamTokenId])
  }
}
