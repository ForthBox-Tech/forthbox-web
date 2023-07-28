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

  var bChangePriceAuto = await _contract.methods.bChangePriceAuto().call()
  if (bChangePriceAuto) {
    tP.fbxPrice = window.web3.utils.fromWei(numArr[7] || '0', 'ether')
  } else {
    var feedUsdt = await _contract.methods.usdt_FeedPrice().call()
    feedUsdt = window.web3.utils.fromWei(feedUsdt, 'ether')
    const numArr7 = window.web3.utils.fromWei(numArr[7] || '0', 'ether')
    tP.fbxPrice = (feedUsdt * feedUsdt) / numArr7 / 100.0
  }
  return tP
}

//查询账户的每一个tokenID
cNFTFun.tokenOfOwnerByIndex = async function (ith) {
  if (!cWebModel.mConnected) return ''
  var tokenId = await _contract.methods.tokenOfOwnerByIndex(cWebModel.mAccount, ith).call()
  return tokenId
}
cNFTFun.bExistsID = async function (TokenId) {
  if (!cWebModel.mConnected) return ''
  var bExit = await _contract.methods.bExistsID(TokenId).call()
  return bExit
}

cNFTFun.isApprovedForAll = async function (owner, operator) {
  if (!cWebModel.mConnected) return ''
  var isOk = await _contract.methods.isApprovedForAll(owner, operator).call()
  return isOk
}
//获得喂养比例
cNFTFun.getFBXFeedingProportion = async function () {
  if (!cWebModel.mConnected) return ''
  var bChangePriceAuto = await _contract.methods.bChangePriceAuto().call()
  var fbxPrice = 0
  if (bChangePriceAuto) {
    fbxPrice = await _contract.methods.getUsdtFBXPrice().call()
  }
  var num = await _contract.methods.getFBXFeedingProportion(fbxPrice).call()
  return num
}

cNFTFun.getUsdtFBXPrice = async function () {
  let fbxPrice = 0
  try {
    const weiPrice = await _contract.methods.getUsdtFBXPrice().call()
    fbxPrice = window.web3.utils.fromWei(weiPrice || '0', 'ether')
  } catch (err) {
    console.warn(err)
  }
  return fbxPrice
}

//recipient 接受
//tokenId
cNFTFun.transferFrom = async function (recipient, tokenId) {
  if (!cWebModel.mConnected) return
  if (!window.web3) return

  var gas0 = await _contract.methods
    .transferFrom(cWebModel.mAccount, recipient, tokenId)
    .estimateGas({ from: cWebModel.mAccount })
  var gasPrice0 = await window.web3.eth.getGasPrice()
  const contract = new web3.eth.Contract(HamNFTAbi, NFT_HAM, {
    from: cWebModel.mAccount,
    gasPrice: gasPrice0,
    gas: parseInt(gas0 * gasCoe),
  })

  return new Promise((resolve, reject) => {
    contractTransaction(contract, 'transferFrom', cWebModel.mAccount, recipient, tokenId, {
      onTransactionHash: (hash) => {},
      onReceipt: (receipt) => {
        if (receipt['status']) {
          resolve()
          console.log('cNFTFun.transferFrom success')
        }
      },
      onError: (err) => {
        reject(err)
        console.log('cNFTFun.transferFrom err', err)
      },
    })
  })
}

cNFTFun.setApprovalForAll = async function (recipient, bTrue) {
  if (!cWebModel.mConnected) return
  if (!window.web3) return

  var gas0 = await _contract.methods
    .setApprovalForAll(recipient, bTrue)
    .estimateGas({ from: cWebModel.mAccount })
  var gasPrice0 = await window.web3.eth.getGasPrice()
  const contract = new web3.eth.Contract(HamNFTAbi, NFT_HAM, {
    from: cWebModel.mAccount,
    gasPrice: gasPrice0,
    gas: parseInt(gas0 * gasCoe),
  })

  return new Promise((resolve, reject) => {
    contractTransaction(contract, 'setApprovalForAll', recipient, bTrue, {
      onTransactionHash: (hash) => {},
      onReceipt: (receipt) => {
        if (receipt['status']) {
          resolve()
          console.log('cNFTFun.setApprovalForAll success')
        }
      },
      onError: (err) => {
        reject(err)
        console.log('cNFTFun.setApprovalForAll err', err)
      },
    })
  })
}

cNFTFun.feed_Foth_FBX = async function (tokenId) {
  if (!cWebModel.mConnected) return
  if (!window.web3) return

  var gas0 = await _contract.methods
    .feed_Foth_FBX(tokenId)
    .estimateGas({ from: cWebModel.mAccount })

  var gasPrice0 = await window.web3.eth.getGasPrice()
  const contract = new web3.eth.Contract(HamNFTAbi, NFT_HAM, {
    from: cWebModel.mAccount,
    gasPrice: gasPrice0,
    gas: parseInt(gas0 * gasCoe),
  })
  return new Promise((resolve, reject) => {
    contractTransaction(contract, 'feed_Foth_FBX', tokenId, {
      onTransactionHash: (hash) => {
        console.log('cNFTFun.feed_Foth_FBX onTransactionHash', hash)
      },
      onReceipt: (receipt) => {
        if (receipt['status']) {
          resolve()
          console.log('cNFTFun.feed_Foth_FBX success')
        }
      },
      onError: (err) => {
        reject(err)
        console.log('cNFTFun.feed_Foth_FBX err', err)
      },
    })
  })
}

// 铸造NFT 并 增加邀请者
cNFTFun.mintNFT_AddInviter = async function (recipient) {
  if (!cWebModel.mConnected) return
  if (!window.web3) return

