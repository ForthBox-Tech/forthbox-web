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

