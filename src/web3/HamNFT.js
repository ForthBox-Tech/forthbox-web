import HamNFTAbi from './HamNFT.abi'
import { NFT_HAM } from './contract.constant'

const gasCoe = 1.2

function contractTransaction(contract, method, ...args) {
  // 将args[args.length - 1]，赋值到onTransactionHash, onReceipt
  const { onTransactionHash, onReceipt, onError } = args[args.length - 1]
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

let _contract = null

const cNFTFun = {}

cNFTFun.connectToContract = function () {
  if (!cWebModel.mConnected) return
  _contract = new window.web3.eth.Contract(HamNFTAbi, NFT_HAM)
}

cNFTFun.totalSupply = async function () {
  if (!cWebModel.mConnected) return ''
  var num = await _contract.methods.totalSupply().call()
  return num
}
cNFTFun.tokenByIndex = async function (ith) {
  if (!cWebModel.mConnected) return ''
  var tokenId = await _contract.methods.tokenByIndex(ith).call()
  return tokenId
}
//查询账户总共有多少nft
cNFTFun.balanceof = async function (Accountadress) {
  if (!cWebModel.mConnected) return ''
  if (!Accountadress) Accountadress = cWebModel.mAccount
  var balance = await _contract.methods.balanceOf(Accountadress).call()
  console.log(Accountadress, '', balance, 3)
  return balance
}
//获得tokenURI
cNFTFun.tokenURI = async function (TokenId) {
  if (!cWebModel.mConnected) return ''

  var URI = await _contract.methods.tokenURI(TokenId).call()
  return URI
}

//获得等级
cNFTFun.getValueByTokenId = async function (TokenId) {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.getValueByTokenId(TokenId).call()
  return balance
}
//获得属性值
cNFTFun.getPropertysByTokenId = async function (TokenId) {
  if (!cWebModel.mConnected) return ''
  var Propertys = await _contract.methods.getPropertysByTokenId(TokenId).call()
  return Propertys
}

//获得算力
cNFTFun.getHashrateByTokenId = async function (TokenId) {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.getHashrateByTokenId(TokenId).call()
  return balance
}
//获得上次喂养时间
cNFTFun.getLastUpdateTimeByTokenId = async function (TokenId) {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.getLastUpdateTimeByTokenId(TokenId).call()
  return balance
}

//获得总喂养usdt
cNFTFun.totlaFeedUsdt = async function () {
  if (!cWebModel.mConnected) return ''

  var balance = await _contract.methods.totlaFeedUsdt().call()
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  return balance2
}
//查询账户的所有tokenID
cNFTFun.tokenOfOwner = async function () {
  if (!cWebModel.mConnected) return
  var tokenArr = await _contract.methods.tokenOfOwner(cWebModel.mAccount).call()
  return tokenArr
}

//查询账户的所有tokenID
cNFTFun.getPropertiesByTokenIds = async function (IDs) {
  if (!cWebModel.mConnected) return
  var numArr = await _contract.methods.getPropertiesByTokenIds(IDs).call()
  var properties = []
  for (var i = 0; i < numArr.length / 11; i++) {
    var ith = i * 11
    var tP = {}
    tP.id = parseInt(numArr[ith])
    ith++
    tP.degree = parseInt(numArr[ith])
    ith++
    tP.hashrate = parseInt(numArr[ith])
    ith++
    tP.lastUpdateTime = parseInt(numArr[ith])
    ith++
    tP.property = []
    for (var j = 0; j < 7; j++) {
      tP.property.push(parseInt(numArr[ith]))
      ith++
    }
    properties.push(tP)
  }
  return properties
}
//获得nft账户基本参数，用于显示
cNFTFun.getParameters = async function (Accountadress) {
  if (!cWebModel.mConnected) return ''
  if (!Accountadress) Accountadress = cWebModel.mAccount

  var numArr = await _contract.methods.getParameters(Accountadress).call()
  var tP = {}
  tP.totlaFeedUsdt = window.web3.utils.fromWei(numArr[0] || '0', 'ether')
  tP.feedFbxPrice = window.web3.utils.fromWei(numArr[1] || '0', 'ether')
  tP.feedUsdcPrice = window.web3.utils.fromWei(numArr[2] || '0', 'ether')
  tP.totalSupply = numArr[3]
  tP.benefitsInvitationFBX = window.web3.utils.fromWei(numArr[4] || '0', 'ether')
  tP.benefitsInvitationUSDC = window.web3.utils.fromWei(numArr[5] || '0', 'ether')
  tP.inviterNum = numArr[6]

