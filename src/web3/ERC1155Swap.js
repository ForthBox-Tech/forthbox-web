import ContractBase from './ContractBase'
import abi from './ERC1155Swap.abi'

export default class ERC1155Swap extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  async sell(tokenNum, price) {
    if (!cWebModel.mConnected) return
    const weiAmount = window.web3.utils.toWei(String(price), 'ether')
    const bnAmount = web3.utils.toBN(weiAmount)
    return this.sendTransaction('sell', [tokenNum, bnAmount])
  }

  async withdraw(tokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('withdraw', [tokenId])
  }
  async buy(tokenId) {
    if (!cWebModel.mConnected) return
    return this.sendTransaction('buy', [tokenId])
  }
}
