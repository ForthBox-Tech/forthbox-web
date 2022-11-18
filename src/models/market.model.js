import vueInstance from '@/main'
import ERC721Market from '@/web3/MarketManage'
import ERC1155Market from '@/web3/MarketManage1155'
import NFT from '@/web3/NFT'
import ERC1155 from '@/web3/ERC1155'
import NftSwap from '@/web3/NftSwap'
import ERC1155Swap from '@/web3/ERC1155Swap'
import {
  NFT_HAM,
  NFT_FANTASYBOX,
  NFT_METABULL,
  NFT_TOWER,
  BOX_TOWER,
} from '@/web3/contract.constant'
import { getNftLevel, LEVEL_IMAGE_MAP } from '@/models/ham.model'
import { _axios } from '@/plugins/axios'

const ERC721_MARKET_ADDRESS = '0xDD7ec36C2785a3227d99cD26FB69fC229deb9451'
const ERC1155_MARKET_ADDRESS = '0xf0e69EF020c85428A0C31373d8c5cb10B7A1bC32'

const ERC721MarketManager = {
  ercType: 721,
  getMarketContract() {
    return new ERC721Market(ERC721_MARKET_ADDRESS)
  },
  async getTokens(nftItem, scene) {
    let address = scene == 'onSale' ? nftItem.swapAddr : nftItem.nftAddr
    const marketContract = ERC721MarketManager.getMarketContract()
    const tokens = await marketContract.tokenOfOwner(address, cWebModel.mAccount)
    return (tokens || []).map((tokenId) => ({
      tokenId,
      type: nftItem.type,
      async getTokenUri() {
        const tokenUri = await marketContract.tokenURI(address, tokenId)
        return formatCollectionNft(tokenUri, nftItem.type, 1)
      },
    }))
  },
  getNftContract(nftAddr) {
    return new NFT(nftAddr)
  },
  getSwapContract(swapAddr) {
    return new NftSwap(swapAddr)
  },
}

const FANTASY_BOX_ID = 1
const ERC1155MarketManager = {
  ercType: 1155,
  getMarketContract() {
    return new ERC1155Market(ERC1155_MARKET_ADDRESS)
  },
  async getTokens(nftItem, scene) {
    let result = []
    const marketContract = ERC1155MarketManager.getMarketContract()
    const tokenUri = await marketContract.tokenURI(nftItem.nftAddr, FANTASY_BOX_ID)
    if (scene == 'onSale') {
      const tokens = await marketContract.tokenOfOwner(nftItem.swapAddr, cWebModel.mAccount)
      return (tokens || []).map((tokenId) => ({
        tokenId,
        type: nftItem.type,
        async getTokenUri() {
          const sellInfo = await marketContract.getSellInfos(nftItem.swapAddr, [tokenId])
          tokenUri.id = tokenId
          return formatCollectionNft(tokenUri, nftItem.type, sellInfo?.nums[0] || 1)
        },
      }))
    } else {
      const num = await marketContract.balanceof(
        nftItem.nftAddr,
        cWebModel.mAccount,
        FANTASY_BOX_ID
      )
      if (num > 0) {
        result.push({
          tokenId: FANTASY_BOX_ID,
          type: nftItem.type,
          async getTokenUri() {
            return formatCollectionNft(tokenUri, nftItem.type, num)
          },
        })
      }
    }
    return result
  },
  getNftContract(nftAddr) {
    return new ERC1155(nftAddr)
  },
  getSwapContract(swapAddr) {
    return new ERC1155Swap(swapAddr)
  },
}

export const NFTS = [
  {
    type: 1,
    name: 'Fighter',
    degreeTypes: { N: 'N', R: 'R', SR: 'SR', SSR: 'SSR' },
    nftAddr: '0xe8A57066746d8a218c8bA9D4039Bf2Ab225A372a',
    swapAddr: '0xd8f743aABc6817A57b58C995457d71dD9E787d79',
    ...ERC721MarketManager,
  },
  {
    type: 2,
    name: 'Ham',
    degreeTypes: {},
    nftAddr: NFT_HAM,
    swapAddr: '0x037E0E2929CAE0F289Fcb10C441bb02F86c2FF48',
    ...ERC721MarketManager,
  },
  {
    type: 3,
    name: 'GMCN',
    degreeTypes: {
      Ordinary: 'Ordinary',
      Strange: 'Strange',
      Rare: 'Rare',
      Epic: 'Epic',
      Legend: 'Legend',
      Myth: 'Myth',
    },
    nftAddr: '0x29aFd382d295643B8860d43220919c65cCDe2cdf',
    swapAddr: '0x703d7c95540Ba8Aa22969205b041d32865eF044c',
    ...ERC721MarketManager,
  },
  {
    type: 4,
    name: 'MetaBox',
    degreeTypes: {},
    nftAddr: '0x57D1119Ccbbfe66635dcc358f3a80fdb97561d7D',
    swapAddr: '0x97a519f7b5E75092C4Ea03ce284C10A373f499d9',
    ...ERC721MarketManager,
  },
  {
    type: 5,
    name: 'Tower',
    degreeTypes: {
      'Machine-gun': 'Machine-gun',
      Frozen: 'Frozen',
      Fire: 'Fire',
      Laser: 'Laser',
      Railgun: 'Railgun',
      Missile: 'Missile',
    },
    nftAddr: NFT_TOWER,
    swapAddr: '0xCe4331C21b2ab8552bA0E1821aA3C6aDFBB6d245',
    ...ERC721MarketManager,
  },
  {
    type: 6,
    name: 'Tower Mystery Box',
    degreeTypes: {},
    nftAddr: BOX_TOWER,
    swapAddr: '0x93DAD7e9BbDD3108ccAe32A05c03A2c7b5F9574C',
    ...ERC721MarketManager,
  },
  {
    type: 7,
    name: 'Fantasy Box',
    degreeTypes: {},
    nftAddr: NFT_FANTASYBOX,
    swapAddr: '0xE641F237198ebbfdf7259B673e025be6eB211AD7',
    ...ERC1155MarketManager,
  },
  {
    type: 8,
    name: 'MetaBull',
    degreeTypes: {
      Comet: 'Comet series',
      Planet: 'Planet series',
      Stellar: 'Stellar series',
      Galaxy: 'Galaxy series',
    },
    nftAddr: NFT_METABULL, // 主网正式
    swapAddr: '0x5939Efe2799FC5e6c21C6a56D7a09220151dE1dc',
    ...ERC721MarketManager,
  },
  {
    type: 9,
    name: 'X-Box',
    degreeTypes: {},
    nftAddr: '0x3eB6f20CC03175A8686C3DEAc4De36fEb490212c', // 主网正式
    // nftAddr: '0xC39a3522aDA30c8B1aBEe9C0D87787a8390f5CD3', // 主网测试
    swapAddr: '0x5F24bF00a509cDF07488b4751c41AE063023e59b', // 主网正式
    // swapAddr: '0xff33749b383aAAa8BB3Bf8F998aB2F2b426ef92A', // 主网测试
    ...ERC721MarketManager,
  },
]

const nftType = {}
NFTS.forEach((nft) => {
  nftType[nft.name] = nft.type
})
export const NFT_TYPE = nftType

export function getNftByType(type) {
  return NFTS.find((nft) => nft.type == type)
}

function formatCollectionNft(tokenUri, type, amount = 1) {
  const nft = getNftByType(type)
  const price = 0
  const result = {
    id: `${type}${tokenUri.id}`,
    type,
    amount,
    name: nft.name, // 使用前端配置的名字
    price: price,
    totalPrice: price * amount,
    image: tokenUri.image,
    tokenId: tokenUri.id,
    description: tokenUri.description || '',
    degree: tokenUri.degree,
  }
  if (type == NFT_TYPE.Ham) {
    const level = getNftLevel(tokenUri.degree)
    Object.assign(result, {
      image: LEVEL_IMAGE_MAP[level.lv - 1] || '',
      degreeName: `${level.lv}-${level.exp}`,
    })
  } else {
    Object.assign(result, {
      degreeName:
        type == (NFT_TYPE.GMCN || NFT_TYPE.Tower)
          ? firstLetterUpperCase(tokenUri.degreeName)
          : tokenUri.degreeName,
    })
  }
  result.showName = formatShowName(result, type)
  return result
}

export function firstLetterUpperCase(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
}

export function formatShowName(result, type) {
  // 输出格式：“Name <DegreeName> #TokenId”
  return [
    result.name,
    type != 7 && result.degreeName ? `<${result.degreeName}>` : '',
    type != 7 && result.tokenId ? `#${result.tokenId}` : '',
  ]
    .filter((str) => !!str)
    .join(' ')
}

export function formatMarketNft(data) {
  const type = data.ContractType
  const nft = getNftByType(type)
  let tokenUri = {}
  try {
    tokenUri = JSON.parse(data.TokenUri)
  } catch (err) {
    console.error(err)
    return
  }
  const totalPrice = Math.floor(data.Price * 1000) / 1000
  const amount = parseInt(data.Amount) >= 1 ? parseInt(data.Amount) : 1
  const result = {
    id: `${type}${tokenUri.id}`,
    type,
    amount,
    name: nft.name, // 使用前端配置的名字
    price: Math.floor((totalPrice / amount) * 100) / 100,
    totalPrice,
    image: tokenUri.image,
    tokenId: data.TokenId,
    description: tokenUri.description || '',
    degree: tokenUri.degree,
  }
  switch (Number(type)) {
    case NFT_TYPE.Fighter:
      Object.assign(result, {
        degreeName: tokenUri.degreeName + '-' + data.Level,
      })
      break
    case NFT_TYPE.Ham:
      const level = getNftLevel(tokenUri.degree)
      Object.assign(result, {
        image: LEVEL_IMAGE_MAP[level.lv - 1] || '',
        degreeName: `${level.lv}-${level.exp}`,
      })
      break
    case NFT_TYPE.GMCN:
      Object.assign(result, {
        degreeName: firstLetterUpperCase(tokenUri.degreeName),
      })
      break
    case NFT_TYPE.Tower:
      Object.assign(result, {
        degreeName: firstLetterUpperCase(tokenUri.degreeName),
      })
      break
    default:
      Object.assign(result, {
        degreeName: tokenUri.degreeName || '',
      })
      break
  }
  result.showName = formatShowName(result, type)
  return result
}

function transformProps(nft, type) {
  return [
    {
      name: vueInstance.$t('Market.Level'),
      value:
        type == (NFT_TYPE.GMCN || NFT_TYPE.Tower)
          ? firstLetterUpperCase(nft.degreeName)
          : nft.degreeName || '',
    },
  ]
}

function transformHamProps(nft) {
  const result = [{ name: 'Hashrate', value: nft.hashrate }]

  const PROPS = ['INT', 'GOLD', 'CE', 'AGI', 'CHR']
  const props = PROPS.map((name, index) => ({
    name,
    value: nft.property[index],
  }))

  return result.concat(props)
}

function formatDetail(tokenUri, type, address, totalPrice, amount = 1, standard = '') {
  totalPrice = Math.floor(totalPrice * 1000) / 1000
  amount = parseInt(amount) >= 1 ? parseInt(amount) : 1
  const nft = getNftByType(type)
  const result = {
    id: `${type}${tokenUri.id}`,
    type,
    amount,
    name: nft.name, // 使用前端配置的名字
    price: Math.floor((totalPrice / amount) * 100) / 100,
    totalPrice,
    image: tokenUri.image,
    tokenId: tokenUri.id,
    description: tokenUri.description || '',
    degree: tokenUri.degree || '',
    standard,
    blockChain: 'Binance Smart Chain',
    address,
  }
  if (type == NFT_TYPE.Ham) {
    const level = getNftLevel(tokenUri.degree)
    Object.assign(result, {
      image: LEVEL_IMAGE_MAP[level.lv - 1] || '',
      degreeName: `${level.lv}-${level.exp}`,
      properties: transformHamProps(tokenUri),
    })
  } else {
    Object.assign(result, {
      degreeName:
        type == (NFT_TYPE.GMCN || NFT_TYPE.Tower)
          ? firstLetterUpperCase(tokenUri.degreeName)
          : tokenUri.degreeName || '',
      properties: transformProps(tokenUri, type),
    })
  }
  result.showName = formatShowName(result, type)
  return result
}

export const NFT721Detail = {
  nftAddr: '',
  swapAddr: '',
  type: '',

  init(nftAddr, swapAddr, type) {
    NFT721Detail.nftAddr = nftAddr
    NFT721Detail.swapAddr = swapAddr
    NFT721Detail.type = type
  },
  //根据商品地址获取商品信息
  async getNftDetail(onSale, marketContract, tokenId) {
    let sellInfo = { prices: [0] }
    const tokenUri = await marketContract.tokenURI(NFT721Detail.nftAddr, tokenId)
    if (onSale) {
      sellInfo = await marketContract.getSellInfos(NFT721Detail.swapAddr, [tokenId])
    }
    console.log(tokenUri, sellInfo)

    const nftDetail = formatDetail(
      tokenUri,
      NFT721Detail.type,
      NFT721Detail.nftAddr,
      sellInfo.prices[0],
      1,
      'BEP721'
    )
    let isBlack = false
    let isDamaged = false

    if (NFT721Detail.type == NFT_TYPE.Fighter) {
      const url = (process.env.VUE_APP_SPACE_WAR_URL || '') + '/market/get_nft_level'
      const params = {
        tokenID: tokenId,
      }
      try {
        const res = await _axios.get(url, { params })
        if (res.code != 200) throw new Error('/market/get_nft_level data error')

        const data = res.data || {}
        nftDetail.properties.push({ name: 'Game Level', value: data.level || 1 })

        isBlack = data.status == 0 // 是否在黑名单（status：1-正常；0-黑名单）
        isDamaged = data.repair_ratio > 0 // 耐久度有损，不能上架
      } catch (err) {
        nftDetail.properties.push({ name: 'Game Level', value: 1 })
        console.error(err)
      }
    }
    return { nftDetail, isBlack, isDamaged }
  },
  async isApproveSwap(nftContract) {
    return await nftContract.isApprovedForAll(cWebModel.mAccount, NFT721Detail.swapAddr)
  },
  async setSwapApproval(nftContract) {
    return await nftContract.setApprovalForAll(NFT721Detail.swapAddr, true)
  },
  async isInMarket(marketContract, swapTokenId, scene) {
    return await marketContract.bExistsID(NFT721Detail.swapAddr, swapTokenId)
  },
  async sell(swapContract, tokenId, price, num) {
    return await swapContract.sell(tokenId, price) // 合约接收的价格为总价
  },
  async withdraw(swapContract, tokenId) {
    return swapContract.withdraw(tokenId)
  },
  async transfer(nftContract, targetAddress, tokenId, num) {
    return await nftContract.safeTransferFrom(cWebModel.mAccount, targetAddress, tokenId)
  },
}

export const NFT1155Detail = {
  nftAddr: '',
  swapAddr: '',
  type: '',

  init(nftAddr, swapAddr, type) {
    NFT1155Detail.nftAddr = nftAddr
    NFT1155Detail.swapAddr = swapAddr
    NFT1155Detail.type = type
  },
  async getNftDetail(onSale, marketContract, tokenId) {
    let sellInfo = { prices: [0], nums: [0] }
    const tokenUri = await marketContract.tokenURI(NFT1155Detail.nftAddr, FANTASY_BOX_ID)
    if (onSale) {
      sellInfo = await marketContract.getSellInfos(NFT1155Detail.swapAddr, [tokenId])
    } else {
      const num = await marketContract.balanceof(
        NFT1155Detail.nftAddr,
        cWebModel.mAccount,
        FANTASY_BOX_ID
      )
      sellInfo.nums[0] = num
    }

    const nftDetail = formatDetail(
      tokenUri,
      NFT1155Detail.type,
      NFT1155Detail.nftAddr,
      sellInfo.prices[0],
      sellInfo.nums[0],
      'BEP1155'
    )
    return { nftDetail, isBlack: false, isDamaged: false }
  },
  async isApproveSwap(nftContract) {
    return await nftContract.isApprovedForAll(cWebModel.mAccount, NFT1155Detail.swapAddr)
  },
  async setSwapApproval(nftContract) {
    return await nftContract.setApprovalForAll(NFT1155Detail.swapAddr, true)
  },
  async isInMarket(marketContract, swapTokenId, scene) {
    if (scene == 'collections') return false
    return await marketContract.bExistsID(NFT1155Detail.swapAddr, swapTokenId)
  },
  async sell(swapContract, tokenId, price, num) {
    return await swapContract.sell(num, price * num) // 合约接收的价格为总价
  },
  async withdraw(swapContract, tokenId) {
    return swapContract.withdraw(tokenId)
  },
  async transfer(nftContract, targetAddress, tokenId, num) {
    return await nftContract.safeTransferFrom(
      cWebModel.mAccount,
      targetAddress,
      FANTASY_BOX_ID,
      num
    )
  },
}

export const MARKET_PAGE_SIZE = 12

