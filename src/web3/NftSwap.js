import ContractBase from './ContractBase'
import abi from './NftSwap.abi'

export default class NftSwap extends ContractBase {
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
  balanceof = async function (Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const balance = await this._contract.methods.balanceOf(Accountadress).call()
    console.log(Accountadress, '', balance, 3)
    return balance
  }
  //获得tokenURI
  tokenURI = async function (TokenId) {
    if (!cWebModel.mConnected) return ''
    const URI = await this._contract.methods.tokenURI(TokenId).call()
    return URI
  }
  async ownerOf(tokenId) {
    if (!cWebModel.mConnected) return ''
    const addr = await this._contract.methods.ownerOf(tokenId).call()
    return addr
  }

  //查询账户的所有tokenID
  tokenOfOwner = async function (Accountadress) {
    if (!cWebModel.mConnected) return
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const tokenArr = await this._contract.methods.tokenOfOwner(Accountadress).call()
    return tokenArr
  }

  //查询账户的第 ith 个 tokenID
  tokenOfOwnerByIndex = async function (Accountadress, ith) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const tokenId = await this._contract.methods.tokenOfOwnerByIndex(Accountadress, ith).call()
    return tokenId
  }
  //是否存在 token ID
  bExistsID = async function (tokenID) {
    if (!cWebModel.mConnected) return ''
    const bExist = await this._contract.methods.bExistsID(tokenID).call()
    return bExist
  }

  //获得token属性
  getPropertiesByTokenIds = async function (tokenIds) {
    if (!cWebModel.mConnected) return
    const numArr = await this._contract.methods.getPropertiesByTokenIds(tokenIds).call()
    const properties = []
    if (numArr.length / 2 == tokenIdArr.length) {
      for (let i = 0; i < numArr.length / 2; i++) {
        let ith = i * 2
        const temp = {}
        temp.id = parseInt(numArr[ith])
        ith++
        temp.degree = parseInt(numArr[ith])
        ith++
        properties.push(temp)
      }
    } else {
      for (let i = 0; i < numArr.length / 11; i++) {
        let ith = i * 11
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

    return properties
  }
  //获得交易信息
  getSellInfos = async function (tokenIds) {
    if (!cWebModel.mConnected) return ''
    const re = await this._contract.methods.getSellInfos(tokenIds).call()
    var priceFix = []
    for (var i = 0; i < Re.prices.length; i++) {
      priceFix[i] = window.web3.utils.fromWei(Re.prices[i] || '0', 'ether')
    }
    Re.prices = priceFix
    return re
  }

  sell = async function (tokenId, price) {
    if (!cWebModel.mConnected) return
    const weiAmount = window.web3.utils.toWei(String(price), 'ether')
    const bnAmount = web3.utils.toBN(weiAmount)
    return this.sendTransaction('sell', [tokenId, bnAmount])
  }

  withdraw = async function (tokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('withdraw', [tokenId])
  }

  buy = async function (tokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('buy', [tokenId])
  }

  sells = async function (tokenIds, prices) {
    if (!cWebModel.mConnected) return

    for (var i = 0; i < prices.length; i++) {
      var amount2 = window.web3.utils.toWei(String(prices[i]), 'ether')
      prices[i] = web3.utils.toBN(amount2)
    }

    return this.sendTransaction('sells', [tokenIds, prices])
  }

  withdraws = async function (tokenIds) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('withdraws', [tokenIds])
  }

  buys = async function (tokenIds) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('buys', [tokenIds])
  }
}
