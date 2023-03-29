import ContractBase from './ContractBase'
import abi from './NFT.abi'

export default class NFT extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  totalSupply = async function () {
    if (!cWebModel.mConnected) return ''
    const num = await this._contract.methods.totalSupply().call()
    return num
  }
  tokenByIndex = async function (ith) {
    if (!cWebModel.mConnected) return ''
    const tokenId = await this._contract.methods.tokenByIndex(ith).call()
    return tokenId
  }
  //查询账户总共有多少nft
  balanceof = async function (userAddress) {
    if (!cWebModel.mConnected) return ''
    if (!userAddress) userAddress = this._address
    const balance = await this._contract.methods.balanceOf(userAddress).call()
    return balance
  }
  //获得tokenURI
  tokenURI = async function (tokenId) {
    if (!cWebModel.mConnected) return ''
    const URI = await this._contract.methods.tokenURI(tokenId).call()
    return URI
  }

  //获得等级
  getDegreeByTokenId = async function (TokenId) {
    if (!cWebModel.mConnected) return ''
    const balance = await this._contract.methods.getDegreeByTokenId(TokenId).call()
    return balance
  }
  //获得等级名称
  getDegreeNameByTokenId = async function (TokenId) {
    if (!cWebModel.mConnected) return ''
    const properties = await this._contract.methods.getDegreeNameByTokenId(TokenId).call()
    return properties
  }

  //查询账户的所有tokenID
  tokenOfOwner = async function () {
    if (!cWebModel.mConnected) return
    const tokenArr = await this._contract.methods.tokenOfOwner(this._address).call()
    return tokenArr
  }

  //查询账户的每一个tokenID
  tokenOfOwnerByIndex = async function (ith) {
    if (!cWebModel.mConnected) return ''
    const tokenId = await this._contract.methods.tokenOfOwnerByIndex(this._address, ith).call()
    return tokenId
  }
  bExistsID = async function (TokenId) {
    if (!cWebModel.mConnected) return ''
    const bExit = await this._contract.methods.bExistsID(TokenId).call()
    return bExit
  }

  //
  isApprovedForAll = async function (owner, operator) {
    if (!cWebModel.mConnected) return ''
    const isOk = await this._contract.methods.isApprovedForAll(owner, operator).call()
    return isOk
  }

