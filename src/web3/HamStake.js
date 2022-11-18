import HamStakeAbi from './HamStake.abi'
import { STAKE_HAM } from './contract.constant'

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

const cFBX_NFTFun = {}

cFBX_NFTFun.connectToContract = function () {
  if (!cWebModel.mConnected) return
  _contract = new window.web3.eth.Contract(HamStakeAbi, STAKE_HAM)
}

//查询账户总算力
cFBX_NFTFun.balanceof = async function (Accountadress) {
  if (!cWebModel.mConnected) return ''
  if (!Accountadress) Accountadress = cWebModel.mAccount
  var balance = await _contract.methods.balanceOf(Accountadress).call()
  return balance
}
//已质押的币算力总和
cFBX_NFTFun.totalSupply = async function () {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.totalSupply().call()
  return balance
}
//已质押的币总和
cFBX_NFTFun.totalReward = async function () {
  if (!cWebModel.mConnected) return ''

  var balance = await _contract.methods.totalReward().call()
  return balance
}

//客户地址 获得质押的 tokenIDArr
cFBX_NFTFun.getOwnerStakeTokenIDs = async function (Accountadress) {
  if (!cWebModel.mConnected) return
  if (!Accountadress) Accountadress = cWebModel.mAccount
  var balance = await _contract.methods.getOwnerStakeTokenIDs(Accountadress).call()
  return balance
}
//客户地址 获得质押的 tokenIDArr
cFBX_NFTFun.ownerTokenId = async function (tokenID) {
  if (!cWebModel.mConnected) return ''
  var Accountadress = await _contract.methods.ownerTokenId(tokenID).call()
  return Accountadress
}
//已经奖励的币
cFBX_NFTFun.totalRewardYet = async function () {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.totalRewardYet().call()
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  return balance2
}
//已经领取的奖励币
cFBX_NFTFun.totalRewardAlready = async function () {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.totalRewardAlready().call()
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  return balance2
}
//每天产币额度
cFBX_NFTFun.getRewardPerDay = async function () {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.getRewardPerDay().call()
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  return balance2
}
//address每天奖励额度
cFBX_NFTFun.getAdressRewardPerDay = async function (Accountadress) {
  if (!cWebModel.mConnected) return ''
  if (!Accountadress) Accountadress = cWebModel.mAccount
  var balance = await _contract.methods.getAdressRewardPerDay(Accountadress).call()
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  return balance2
}

//已赚取币数目
cFBX_NFTFun.earned = async function (Accountadress) {
  if (!cWebModel.mConnected) return ''
  if (!Accountadress) Accountadress = cWebModel.mAccount
  var balance = await _contract.methods.earned(Accountadress).call()
  // 返回指定地址账户的余额
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  return balance2
}

//平均每个质押币：已奖励的币
cFBX_NFTFun.rewardPerToken = async function () {
  if (!cWebModel.mConnected) return ''

  var balance = await _contract.methods.rewardPerToken().call()
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  var tt = parseInt(balance2)
  var balance66 = String(tt)
  var balance3 = window.web3.utils.fromWei(balance66, 'ether')
  // console.log('每个质押币每秒获得的代币 ', 'FBX eth', balance3)
  return balance3
}

//30天总的奖励币数量
cFBX_NFTFun.getRewardForDuration = async function () {
  if (!cWebModel.mConnected) return ''
  var balance = await _contract.methods.getRewardForDuration().call()
  var balance2 = window.web3.utils.fromWei(balance, 'ether')
  return balance2
}
//获得每天基础奖励/挖矿
cFBX_NFTFun.getBasicDailyReward = async function () {
  if (!cWebModel.mConnected) return ''
  var num = await _contract.methods.basicDailyReward().call()
  return num
}

//获得nft账户基本参数，用于显示
cFBX_NFTFun.getParameters = async function (Accountadress) {
  if (!cWebModel.mConnected) return ''
  if (!Accountadress) Accountadress = cWebModel.mAccount
  var numArr = await _contract.methods.getParameters(Accountadress).call()
  var tP = {}
  tP.totalRewardAlready = window.web3.utils.fromWei(numArr[0], 'ether')
  tP.basicDailyReward = numArr[1]
  tP.totalSupply = numArr[2]
  tP.balances = numArr[3]
  tP.earned = window.web3.utils.fromWei(numArr[4], 'ether')
  return tP
}

