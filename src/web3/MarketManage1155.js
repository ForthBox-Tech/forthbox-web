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

