import ContractBase from './ContractBase'
import abi from './MarketManage.abi'

export default class MarketManage extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  /* ========== common total ========== */
  async totalSupply(nftAdress) {
    if (!cWebModel.mConnected) return ''

    const num = await this._contract.methods.totalSupply(nftAdress).call()
    return num
  }
  async totalSupplys(nftSwaps) {
    if (!cWebModel.mConnected) return ''

    const numArr = await this._contract.methods.totalSupply(nftSwaps).call()
    return numArr
  }

  async tokenByIndex(nftAdress, start, end) {
    if (!cWebModel.mConnected) return ''

    const tokenIDs = await this._contract.methods.tokenByIndex(nftAdress, start, end).call()
    return tokenIDs
  }

  async tokenURI(nftAdress, tokenId) {
    if (!cWebModel.mConnected) return {}

    let result = {}
    try {
      var URI = await this._contract.methods.tokenURI(nftAdress, tokenId).call()
      result = JSON.parse(URI)
    } catch (err) {
      console.warn(err)
    }
    return result
  }

  async getPropertiesByTokenIds(nftAdress, tokenIdArr) {
    if (!cWebModel.mConnected) return ''

    const numArr = await this._contract.methods
      .getPropertiesByTokenIds(nftAdress, tokenIdArr)
      .call()

    var properties = []
    if (numArr.length / 2 == tokenIdArr.length) {
      for (var i = 0; i < numArr.length / 2; i++) {
        var ith = i * 2
        const temp = {}
        temp.id = parseInt(numArr[ith])
        ith++
        temp.degree = parseInt(numArr[ith])
        ith++
        properties.push(temp)
      }
    } else {
      for (var i = 0; i < numArr.length / 11; i++) {
        var ith = i * 11
        const temp = {}
        temp.id = parseInt(numArr[ith])
        ith++
        temp.degree = parseInt(numArr[ith])
        ith++
        temp.hashrate = parseInt(numArr[ith])
        ith++
        temp.lastUpdateTime = parseInt(numArr[ith])
        ith++
        temp.property = []
        for (var j = 0; j < 7; j++) {
          temp.property.push(parseInt(numArr[ith]))
          ith++
        }
        properties.push(temp)
      }
    }

