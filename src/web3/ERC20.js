import ContractBase from './ContractBase'
import abi from './ERC20.abi'

export default class ERC20 extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }

  async balanceof(userWalletAddress) {
    userWalletAddress = userWalletAddress || this._address

    const weiBalance = await this._contract.methods.balanceOf(userWalletAddress).call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  /**
   * 转账
   * @param {String} recipient 接受
   * @param {String} amount 金额 小数，单位 eth ,比如转3个FBX，则amount=3，不是3*10^18
   */
  async transfer(recipient, amount) {
    const weiAmount = window.web3.utils.toWei(String(amount), 'ether')
    const bnAmount = web3.utils.toBN(weiAmount)

    return this.sendTransaction('transfer', [recipient, bnAmount])
  }

  async approve(recipient, amount) {
    const weiAmount = window.web3.utils.toWei(String(amount), 'ether')
    const bnAmount = web3.utils.toBN(weiAmount)

    return this.sendTransaction('approve', [recipient, bnAmount])
  }

  async allowance(owner, spender) {
    const weiBalance = await this._contract.methods.allowance(owner, spender).call()
    const etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }

  //
  // FBX专用
  //
  async totalDestroy() {
    var weiBalance = await this._contract.methods.totalDestroy().call()
    var etherBalance = window.web3.utils.fromWei(weiBalance, 'ether')
    return etherBalance
  }
  async totalSupply() {
    const balance = 40000000
    return balance
  }
}
