import {
  BOX_TOWER,
  BOX_FIGHTER,
  NFT_TOWER,
  BOX_METABULL,
  NFT_METABULL,
} from '@/web3/contract.constant'
import ERC20 from '@/web3/ERC20'
import FBXTowerMysteryBoxNFT from '@/web3/FBXTowerMysteryBoxNFT'
import FBXTurretNFT from '@/web3/FBXTurretNFT'
import { TOKEN_MAP, report } from './market2.model'
import { _modal } from '@/plugins/modal'
import { getTokenLogo, getChainLogo } from '@/helpers/logo.helper'

/** 盲盒基类 */
class Box {
  constructor(options) {
    // 延迟执行，确保设置传入的内容
    setTimeout(() => {
      Object.assign(this, options)
    })
  }
  /** 代币合约实例 */
  get tokenContract() {
    const token = (this.token || '').toUpperCase()
    return new ERC20(TOKEN_MAP[token])
  }
  /** 检查代币是否足够购买 */
  async checkTokenEnough() {
    const ownToken = await this.tokenContract.balanceof()
    if (ownToken < parseFloat(this.price)) {
      throw new Error(`no enough ${(this.token || '').toUpperCase()}`)
    }
  }
  /** 代币是否已授权给盲盒合约 */
  async isApprovedToken() {
    let result = 0
    result = await this.tokenContract.allowance(cWebModel.mAccount, this.boxAddr)
    return parseFloat(result) > parseFloat(this.price)
  }
  /** 检查代币是否已授权，未授权的话，调起授权 */
  async checkTokenApproved() {
    const isApproved = await this.isApprovedToken()
    if (!isApproved) {
      await this.tokenContract.approve(this.boxAddr, parseFloat(this.price) + 10)
    }
  }
  /** 代币logo */
  get tokenLogo() {
    return getTokenLogo(this.token)
  }
  /** 区块链logo */
  get chainLogo() {
    return getChainLogo(this.chain)
  }
  /** 市场开放购买的数量 */
  count = 0
  /** 市场已销售的数量 */
  soldCount = 0
  /** 用户允许购买的最大数量 */
  limit = 0
  /** 用户剩余的未打开的数量 */
  ownCount = 0
  /** 用户购买的数量（=未打开+已打开） */
  buyCount = 0
  /** 活动是否已结束 */
  isEnd = false
  /** 盲盒对于当前用户是否可购买 */
  isPurchasable = false
  /** 盲盒NFT合约地址 */
  nftAddr = ''
  /** 盲盒合约地址 */
  boxAddr = ''
  /** 获取盲盒实例 */
  getContract() {}
  /** 盲盒初始化 */
  init() {}
  /** 购买盲盒 */
  buy() {}
  /** 打开盲盒 */
  open() {}
}

class FighterBox extends Box {
  image = 'https://static.forthbox.io/image/drops/ham-fantasy/market-drops-nftbox.png'
  name = 'Space War - Fighter Mystery Box'
  creator = {
    name: 'ForthBox',
    avatar: require('@/assets/common/token-fbx.png'),
  }
  count = 2000
  soldCount = 2000
  limit = 10
  ownCount = 0
  buyCount = 0
  price = 2000
  token = 'FBX'
  chain = 'BNB'
  startTime = '08:00:00 UTC, 2022-1-21'
  isCert = false
  category = 'STG'
  provider = 'official'
  isEnd = true
  prizes = [
    {
      image: 'https://static.forthbox.io/image/aircraft/SSR.png',
      name: 'SSR-Level Fighter NFT',
      epic: 'SSR',
      rate: '25%',
    },
    {
      image: 'https://static.forthbox.io/image/aircraft/SR.png',
      name: 'SR-Level Fighter NFT',
      epic: 'SR',
      rate: '25%',
    },
    {
      image: 'https://static.forthbox.io/image/aircraft/R.png',
      name: 'R-Level Fighter NFT',
      epic: 'R',
      rate: '25%',
    },
    {
      image: 'https://static.forthbox.io/image/aircraft/N.png',
      name: 'N-Level Fighter NFT',
      epic: 'N',
      rate: '25%',
    },
  ]
  description = [
    {
      title: 'The following prizes are included in the mystery box.',
      text: [
        '1) 100 SSR-Level Fighter NFT.',
        '2) 300 SR-Level Fighter NFT.',
        '3) 600 R-Level Fighter NFT.',
        '4) 1000 N-Level Fighter NFT.',
      ],
    },
    {
      title: 'Go-live time:',
      text: 'January 21 8:00 am UTC January 21 4:00 pm SGT',
    },
    {
      title: 'Note:',
      text: [
        '1.The total number of Fighter NFT in carnival is 2,000.',
        '2.Spend 2,000 FBX to open a mystery box once, up to 10 times for one BSC address.',
      ],
    },
  ]
  boxAddr = BOX_FIGHTER
}

class TowerBox extends Box {
  image = 'https://static.forthbox.io/image/drops/ham-fantasy/main-3x.png'
  name = 'Ham Fantasy - Tower Mystery Box'
  creator = {
    name: 'ForthBox',
    avatar: require('@/assets/common/token-fbx.png'),
  }
  count = 1000
  soldCount = 1000
  limit = 10
  ownCount = 0
  price = 2000
  token = 'FBX'
  chain = 'BNB'
  startTime = '09:00:00 UTC, 2022-4-25'
  isCert = false
  category = 'TDG'
  provider = 'official'
  isEnd = true
  prizes = [
    {
      image: 'https://static.forthbox.io/image/nft/ham-fantasy/Missile.png',
      name: 'Missile Tower NFT',
      epic: 'Missile',
      rate: '10%',
    },
    {
      image: 'https://static.forthbox.io/image/nft/ham-fantasy/Railgun.png',
      name: 'Railgun Tower NFT',
      epic: 'Railgun',
      rate: '10%',
    },
    {
      image: 'https://static.forthbox.io/image/nft/ham-fantasy/Laser.png',
      name: 'Laser Tower NFT',
      epic: 'Laser',
      rate: '10%',
    },
    {
      image: 'https://static.forthbox.io/image/nft/ham-fantasy/Fire.png',
      name: 'Fire Tower NFT',
      epic: 'Fire',
      rate: '20%',
    },
    {
      image: 'https://static.forthbox.io/image/nft/ham-fantasy/Frozen.png',
      name: 'Frozen Tower NFT',
      epic: 'Frozen',
      rate: '20%',
    },
    {
      image: 'https://static.forthbox.io/image/nft/ham-fantasy/Machine-gun.png',
      name: 'Machine-gun Tower NFT',
      epic: 'Machine-gun',
      rate: '30%',
    },
  ]
  description = [
    {
      title: 'The following prizes are included in the mystery box.',
      text: [
        '1) 100 Missile Tower NFT',
        '2) 100 Railgun Tower NFT',
        '3) 100 Laser Tower NFT',
        '4) 200 Fire Tower NFT',
        '5) 200 Frozen Tower NFT',
        '6) 300 Machine-gun Tower NFT',
      ],
    },
    {
      title: 'Launch time:',
      text: '5:00 PM SGT (9:00 AM UTC), April 25, 2022',
    },
    {
      title: 'Note:',
      text: [
        '1.The quantity of Tower NFT in carnival is 1,000 in total.',
        '2.Spend 2,000 FBX to buy a mystery box, up to 10 times for each BNB Smart Chain (BSC) address.',
      ],
    },
  ]
  nftAddr = NFT_TOWER
  boxAddr = BOX_TOWER
  getContract() {
    return new FBXTowerMysteryBoxNFT(this.boxAddr)
  }
  async init() {
    const contract = this.getContract()
    const property = await contract.getParameters()

    // this.count = property.totalNFT || 0
    // this.soldCount = this.count - (property.totalNFT - property.totalSupply) || 0
    this.buyCount = property.addressBuyNum || 0

    this.isEnd = this.soldCount == this.count
    this.isPurchasable = !(this.isEnd || property.addressLastBuyNum == 0)

    this.ownCount = await contract.balanceof()
  }
  buy() {
    // 已售完，不可点击，此处功能不实现
  }
  async open() {
    if (this.ownCount <= 0) return

    try {
      const contract = this.getContract()
      const tokenId = await contract.tokenOfOwnerByIndex(0)
      await contract.randGift(tokenId)

      const towerContract = new FBXTurretNFT(this.nftAddr)
      const amount = await towerContract.balanceof()
      const towerTokenId = await towerContract.tokenOfOwnerByIndex(amount - 1)
      const towerTokenURI = await towerContract.tokenURI(towerTokenId)

      const result = {
        text: `You've got ${towerTokenURI.degreeName} Tower NFT. ID #${towerTokenId}`,
        image: towerTokenURI.image,
        status: 'success',
      }
      return result
    } catch (err) {
      console.warn(err)
      _modal.toast(err?.message || 'Failed!')
    }
  }
}

class MetaBullBox extends Box {
  promo = require('@/assets/page-market2/page-carnivals/metabull/promo.png')
  image = require('@/assets/page-market2/page-carnivals/metabull/box.png')
  name = 'MetaBull - MetaBull Mystery Box'
  creator = {
    name: 'ForthBox',
    avatar: require('@/assets/common/token-fbx.png'),
  }
  count = 500
  soldCount = 0
  limit = 10
  ownCount = 0
  buyCount = 0
  price = 77
  token = 'USDC'
  chain = 'BNB'
  startTime = 'TBA'
  isCert = false
  category = 'RTT'
  provider = 'official'
  isEnd = false
  isNew = true
  prizes = [
    {
      image: require('@/assets/page-market2/page-carnivals/metabull/prize-planet.png'),
      name: 'Planet series',
      epic: 'Planet',
      rate: '30%',
    },
    {
      image: require('@/assets/page-market2/page-carnivals/metabull/prize-stellar.png'),
      name: 'Stellar series',
      epic: 'Stellar',
      rate: '30%',
    },
    {
      image: require('@/assets/page-market2/page-carnivals/metabull/prize-comet.png'),
      name: 'Comet series',
      epic: 'Comet',
      rate: '20%',
    },
    {
      image: require('@/assets/page-market2/page-carnivals/metabull/prize-galaxy.png'),
      name: 'Galaxy series',
      epic: 'Galaxy',
      rate: '20%',
    },
  ]
  description = [
    {
      title:
        'The following prizes are included in the Mystery Box, all come with a set of 4 MetaBull NFTs:',
      text: [
        '(1) 150 Planet series',
        '(2) 150 Stellar series',
        '(3) 100 Comet series',
        '(4) 100 Galaxy series',
      ],
    },
    {
      title: 'MetaBull Mystery Box Launch time:',
      text: 'TBA',
    },
    {
      title: 'Note:',
      text: [
        '1. The total supply of MetaBull NFT in the Carnival is 500.',
        '2. Spend 77 USDC to buy a Mystery Box, up to 10 purchases for each BNB Smart Chain (BSC) address.',
      ],
    },
  ]
  nftAddr = NFT_METABULL
  boxAddr = BOX_METABULL
  getContract() {
    return new FBXTowerMysteryBoxNFT(this.boxAddr)
  }
  async init() {
    const contract = this.getContract()
    const property = await contract.getParameters()

    // this.count = property.totalNFT || 0
    this.soldCount = this.count - property.totalNFT || 0
    this.buyCount = property.addressBuyNum || 0

    this.isEnd = this.soldCount == this.count
    this.isPurchasable = !(this.isEnd || property.addressLastBuyNum == 0)

    this.ownCount = await contract.balanceof()
  }
  async buy() {
    try {
      await this.checkTokenEnough()
      await this.checkTokenApproved()

      const contract = this.getContract()
      const result = await contract.buyNFT()

      const txhash = result && result.transactionHash
      if (txhash) {
        report(txhash, 0)
      }

      const amount = await contract.balanceof()
      const tokenId = await contract.tokenOfOwnerByIndex(amount - 1)

      return {
        text: `You've got Metabull Mystery NFT. ID #${tokenId}`,
        image: this.image,
        status: 'success',
      }
    } catch (err) {
      console.warn(err)
      _modal.toast(err?.message || 'Failed!')
    }
  }
  async open() {
    if (this.ownCount <= 0) return

    try {
      const contract = this.getContract()
      const tokenId = await contract.tokenOfOwnerByIndex(0)
      const result = await contract.randGift(tokenId)

      const txhash = result && result.transactionHash
      if (txhash) {
        report(txhash, 0)
      }

      const name = await contract.getAddrLastGiftBullName()
      const prize = this.prizes.find((item) => item.name == name)

      return {
        text: `You've got ${name} Bull NFT.`,
        image: prize?.image || '',
        status: 'success',
      }
    } catch (err) {
      console.warn(err)
      _modal.toast(err?.message || 'Failed!')
    }
  }
}

export const activities = [
  new MetaBullBox(),
  new TowerBox(),
  new TowerBox({
    startTime: '08:00:00 UTC, 2022-3-25',
    description: [
      {
        title: 'The following prizes are included in the mystery box.',
        text: [
          '1) 100 Missile Tower NFT',
          '2) 100 Railgun Tower NFT',
          '3) 100 Laser Tower NFT',
          '4) 200 Fire Tower NFT',
          '5) 200 Frozen Tower NFT',
          '6) 300 Machine-gun Tower NFT',
        ],
      },
      {
        title: 'Launch time:',
        text: '4:00 PM SGT (8:00 AM UTC), March 25, 2022',
      },
      {
        title: 'Note:',
        text: [
          '1.The quantity of Tower NFT in carnival is 1,000 in total.',
          '2.Spend 2,000 FBX to buy a mystery box, up to 10 times for each BNB Smart Chain (BSC) address.',
        ],
      },
    ],
  }),
  new FighterBox(),
].map((item, index) => {
  item.id = index + 666
  return item
})
