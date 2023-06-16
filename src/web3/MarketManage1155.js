import ContractBase from './ContractBase'
import abi from './MarketManage1155.abi'

export default class MarketManage1155 extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  /* ========== only IERC1155 ========== */
  async totalSupply(erc1155Adress, id) {
    if (!cWebModel.mConnected) return ''

    const num = await this._contract.methods.totalSupply(erc1155Adress, id).call()
    return num
  }
  async totalSupplys(erc1155dressArr, id) {
    if (!cWebModel.mConnected) return ''

    const numArr = await this._contract.methods.totalSupply(erc1155dressArr, id).call()
    return numArr
  }
  async tokenURI(erc1155dress, id) {
    if (!cWebModel.mConnected) return {}

    let result = {}
    try {
      const URI = await this._contract.methods.tokenURI(erc1155dress, id).call()
      // const a = {
      //   name: 'Fantasy Box',
      //   description: 'Fantasy Box',
      //   image: 'https://static.forthbox.io/image/nft/fantasy-box/fantasy-box-320.png',
      //   base: 'https://forthbox.io',
      //   id: 1,
      // }
      result = JSON.parse(URI)
    } catch (err) {
      console.warn(err)
    }
    return result
  }

  async balanceof(erc1155Adress, Accountadress, id) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount

    const num = await this._contract.methods.balanceOf(erc1155Adress, Accountadress, id).call()
    return num
  }
  async balanceofs(erc1155AdressArr, Accountadress, id) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const nums = await this._contract.methods.balanceOfs(erc1155AdressArr, Accountadress, id).call()
    return nums
  }

  /* ========== only ISwap1155 swap ========== */
  async tokenByIndex(swap1155Adress, start, end) {
    if (!cWebModel.mConnected) return ''

    const tokenIDs = await this._contract.methods.tokenByIndex(swap1155Adress, start, end).call()
    return tokenIDs
  }

  async tokenOfOwner(swap1155Adress, Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount

    const tokenIds = await this._contract.methods.tokenOfOwner(swap1155Adress, Accountadress).call()
    return tokenIds
  }
  async bExistsID(swap1155Adress, tokenId) {
    if (!cWebModel.mConnected) return ''
    const bExist = await this._contract.methods.bExistsID(swap1155Adress, tokenId).call()
    return bExist
  }
  async ownerOf(swap1155Adress, tokenId) {
    if (!cWebModel.mConnected) return ''
    const addr = await this._contract.methods.ownerOf(swap1155Adress, tokenId).call()
    return addr
  }

  //获得卖信息
  async getSellInfos(swap1155Adress, tokenIdArr) {
    if (!cWebModel.mConnected) return ''
    const result = await this._contract.methods.getSellInfos(swap1155Adress, tokenIdArr).call()
    const priceFix = []
    for (let i = 0; i < result.prices.length; i++) {
      priceFix[i] = window.web3.utils.fromWei(result.prices[i] || '0', 'ether')
    }
    result.prices = priceFix
    return result
  }
}
