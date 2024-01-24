import ContractBase from './ContractBase'
import abi from './FbxCarnival.abi'

export default class FbxCarnival extends ContractBase {
  constructor(contractAddress) {
    super(contractAddress, abi)
  }
  async getParameters(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const numArr = await this._contract.methods.getParameters(Accountadress).call()
    const result = {}
    result.maxGiftNum = numArr[0] //最大奖品数
    result.giftNum = numArr[1] //已发放的奖品数量
    result.addressGiftNum = numArr[2] //地址奖品数
    result.addressLastGiftNum = numArr[3] //地址剩余可抽奖数
    return result
  }
  //总共已发放的奖品数量
  async giftNum() {
    if (!cWebModel.mConnected) return ''
    const result = await this._contract.methods.giftNum().call()
    return result
  }
  //该地址中的奖品数量
  async giftNumAddress(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const result = await this._contract.methods.giftNumAddress(Accountadress).call()
    return result
  }
  //最新的中奖tokenId 和 degree
  async giftInfoLast(Accountadress) {
    if (!cWebModel.mConnected) return ''
    if (!Accountadress) Accountadress = cWebModel.mAccount
    const result = await this._contract.methods.giftInfoLast(Accountadress).call()
    return result
  }
  //抽奖
  calGift = async function () {
    if (!cWebModel.mConnected) return

    var gas0 = await this._contract.methods.calGift().estimateGas({ from: cWebModel.mAccount })
    var gasPrice0 = await window.web3.eth.getGasPrice()
    const contract = new web3.eth.Contract(this._abi, this._contractAddress, {
      from: cWebModel.mAccount,
      gasPrice: gasPrice0,
      gas: parseInt(gas0 * 1.2),
    })
    return new Promise((resolve, reject) => {
      contractTransaction(contract, 'calGift', {
        onTransactionHash: (hash) => {},
        onReceipt: (receipt) => {
          if (receipt['status']) {
            resolve()
            console.log('this.calGift success')
          }
        },
        onError: (err) => {
          reject(err)
          console.log('this.calGift err', err)
        },
      })
    })
  }
}

function contractTransaction(contract, method, ...args) {
  const { onTransactionHash, onReceipt, onError } = args[args.length - 1] //将args[args.length - 1]，赋值到onTransactionHash, onReceipt
  args = args.slice(0, args.length - 1)

  return new Promise((resolve, reject) => {
    const tx = contract.methods[method](...args).send()
    let receiptReceieved

    tx.on('error', (e) => {
      typeof onError === 'function' && onError(e)
      reject(e)
    })
    tx.once('receipt', (r) => (receiptReceieved ? null : (receiptReceieved = true) && onReceipt(r)))
    tx.once('confirmation', (c, r) =>
      receiptReceieved ? null : (receiptReceieved = true) && onReceipt(r)
    )
    tx.once('transactionHash', (hash) => {
      onTransactionHash(hash)
      resolve(hash)
    })
  })
}
