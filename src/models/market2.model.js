import { TOKEN_FBX, TOKEN_USDC, MARKET } from '@/web3/contract.constant'
import ForthBoxMarketSwap from '@/web3/ForthBoxMarketSwap'
import ERC20 from '@/web3/ERC20'
import ERC721 from '@/web3/NFT'
import ERC1155 from '@/web3/ERC1155'
import { _axios } from '@/plugins/axios'

const CONTRACT_TYPE = {
  ERC721: 0,
  ERC1155: 1,
}

const CONTRACT = {
  ERC721: ERC721,
  ERC1155: ERC1155,
}

export const TOKEN_MAP = {
  FBX: TOKEN_FBX,
  USDC: TOKEN_USDC,
  // testFBX: TOKEN_FBX, // 测试合约
}

export const TOKENS = [
  // {
  //   // 测试数据
  //   text: 'testFBX',
  //   contract: TOKEN_FBX,
  // },
  {
    text: 'FBX',
    contract: TOKEN_FBX,
  },
  // {
  //   text: 'USDC',
  //   contract: TOKEN_USDC,
  // },
]

export async function approveToMarket(nftContact) {
  let isApproved = await nftContact.isApprovedForAll(cWebModel.mAccount, MARKET)
  if (!isApproved) {
    isApproved = await nftContact.setApprovalForAll(MARKET, true)
  }
  return isApproved
}

export async function sell(
  nftContractType,
  nftContractAddr,
  nftTokenId,
  erc20Addr,
  totalPrice,
  amount
) {
  if (!nftContractType || !nftContractAddr || !nftTokenId || !erc20Addr || !totalPrice || !amount) {
    return
  }

  const Contract = CONTRACT[nftContractType]
  const nftContact = new Contract(nftContractAddr)
  const isApproved = await approveToMarket(nftContact)
  if (!isApproved) return

  const key = Date.now()
  const marketContract = new ForthBoxMarketSwap(MARKET)
  const result = await marketContract.planSell(
    CONTRACT_TYPE[nftContractType],
    nftContractAddr,
    nftTokenId,
    amount,
    erc20Addr,
    totalPrice,
    key
  )

  const txhash = result && result.transactionHash
  if (!txhash) return

  report(txhash, key)
  return txhash
}

export async function transfer(nftContractType, nftContractAddr, from, to, tokenId, amount) {
  const Contract = CONTRACT[nftContractType]
  const nftContract = new Contract(nftContractAddr)
  await nftContract.safeTransferFrom(from, to, tokenId, amount)
}

/**
 * ERC20合约授权给Market合约指定的数量
 * @param {ERC20} erc20Contract ERC20合约实例
 * @param {Number} quantity 授权数量
 */
export async function approveForErc20(erc20Contract, quantity) {
  quantity = quantity >= 0 ? parseInt(quantity) : 0
  const amount = await erc20Contract.allowance(cWebModel.mAccount, MARKET)
  let isApproved = parseInt(amount || 0) > quantity
  if (!isApproved) {
    await erc20Contract.approve(MARKET, quantity + 9)
    isApproved = true
  }
  return isApproved
}

/**
 * 购买
 * @param {String} swapId 订单ID
 * @param {String} erc20Type 币种类型：FBX、USDC
 * @param {String} erc20Addr 币种合约
 * @param {Number} quantity 授权数额
 */
export async function buy(swapId, erc20Type, erc20Addr, quantity) {
  if (!swapId || !erc20Type) return

  erc20Addr = erc20Addr || TOKEN_MAP[erc20Type]
  if (!erc20Addr) return

  const erc20Contract = new ERC20(erc20Addr)
  const isApproved = await approveForErc20(erc20Contract, quantity)
  if (!isApproved) return

  const key = Date.now()
  const marketContract = new ForthBoxMarketSwap(MARKET)
  const result = await marketContract.buy(swapId, key)

  const txhash = result && result.transactionHash
  if (!txhash) return

  report(txhash, key)
  return txhash
}

/**
 * 批量购买
 * @param {{swapId: String, erc20Type: String, erc20Addr: String, quantity: Number}[]} orders
 */
export async function buyMulti(orders) {
  if (!Array.isArray(orders) || !orders.length) return

  const swapIds = []
  const erc20Map = {}
  orders.forEach((item) => {
    swapIds.push(item.swapId)

    const erc20 = erc20Map[item.erc20Type]
    if (erc20) {
      erc20.quantity += item.quantity
    } else {
      const address = item.erc20Addr || TOKEN_MAP[item.erc20Type]
      erc20Map[item.erc20Type] = {
        contract: new ERC20(address),
        quantity: item.quantity || 0,
      }
    }
  })

  const approvePromise = []
  Object.keys(erc20Map).forEach((type) => {
    const erc20 = erc20Map[type]
    approvePromise.push(approveForErc20(erc20.contract, erc20.quantity))
  })
  const isApproved = await Promise.all(approvePromise).then((results) => {
    return !results.find((iResult) => !iResult)
  })
  if (!isApproved) return

  const key = Date.now()
  const marketContract = new ForthBoxMarketSwap(MARKET)
  const result = await marketContract.buys(swapIds, key)

  const txhash = result && result.transactionHash
  if (!txhash) return

  report(txhash, key)
  return txhash
}

/**
 * 修改价格
 * @param {String} swapId 订单ID
 * @param {Number} price 价格
 */
export async function editPrice(swapId, price) {
  if (!swapId || !price) return

  const key = Date.now()
  const marketContract = new ForthBoxMarketSwap(MARKET)
  const result = await marketContract.fix(swapId, price, key)

  const txhash = result && result.transactionHash
  if (!txhash) return

  report(txhash, key)
  return txhash
}

/**
 * 取消订单
 * @param {String} swapId 订单ID
 */
export async function cancel(swapId) {
  if (!swapId) return

  const key = Date.now()
  const marketContract = new ForthBoxMarketSwap(MARKET)
  const result = await marketContract.cancel(swapId, key)

  const txhash = result && result.transactionHash
  if (!txhash) return

  report(txhash, key)
  return txhash
}

export async function getSellInfo(nftContractAddr, tokenId) {
  const marketContract = new ForthBoxMarketSwap(MARKET)
  const result = await marketContract.tokenPlanSellInfo(
    cWebModel.mAccount,
    nftContractAddr,
    tokenId
  )
  return result
}

/**
 * 上报交易hash
 * @param {String} txhash
 * @param {String} swapKey
 */
export async function report(txhash, swapKey) {
  const url = `${process.env.VUE_APP_API_FBOX2}/web/market_place/swap_activity/txhash/report`
  const params = new URLSearchParams()
  params.append('txhash', txhash)
  params.append('swapKey', swapKey)
  params.append('startAddr', cWebModel.mAccount)

  let result
  try {
    result = await _axios.post(url, params)
  } catch (err) {
    console.error(err)
  }
  return result
}

/**
 * 项目收藏
 * @param {String} projectId 项目Id
 */
export async function favProject(projectId) {
  const url = `${process.env.VUE_APP_API_FBOX2}/web/users/add_collection_fav`
  const params = new URLSearchParams()
  params.append('collection_id', projectId)

  return await _axios.post(url, params)
}

/**
 * 取消项目收藏
 * @param {String} projectId 项目Id
 */
export async function unfavProject(projectId) {
  const url = `${process.env.VUE_APP_API_FBOX2}/web/users/remove_collection_fav`
  const params = new URLSearchParams()
  params.append('collection_id', projectId)

  return await _axios.post(url, params)
}

/**
 * 加车
 * @param {String} swapId 交易单Id
 */
export async function addCart(swapId) {
  const url = `${process.env.VUE_APP_API_FBOX2}/web/shopping_cart/add_shopping_cart`
  const params = new URLSearchParams()
  params.append('swapId', swapId)

  return await _axios.post(url, params)
}

/**
 * 取消加车
 * @param {String[]} swapIds 交易单Id列表
 */
export async function rmCart(swapIds) {
  const url = `${process.env.VUE_APP_API_FBOX2}/web/shopping_cart/upgrade_shopping_cart`
  const params = new URLSearchParams()
  params.append('swapId', swapIds.join(','))

  return await _axios.post(url, params)
}

/**
 * 获取购物车列表
 */
export async function getCart() {
  const url = `${process.env.VUE_APP_API_FBOX2}/web/shopping_cart/get_detail`
  const params = {}

  return await _axios.get(url, { params })
}

export const MARKET2_PAGE_SIZE = 16

