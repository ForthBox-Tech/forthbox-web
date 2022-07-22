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

