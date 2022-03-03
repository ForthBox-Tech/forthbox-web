import FbxCarnival from '@/web3/FbxCarnival'
import FBXTowerMysteryBoxNFT from '@/web3/FBXTowerMysteryBoxNFT'
import SellNFTManage from '@/web3/SellNFTManage'
import NFT from '@/web3/NFT'
import { BOX_FIGHTER, BOX_TOWER, NFT_TOWER } from '@/web3/contract.constant'

export const XBOX_IMAGE = {
  Tesla: require('@/assets/page-market/xbox-tsl.png'),
  Macbook: require('@/assets/page-market/xbox-mac.png'),
  PS5: require('@/assets/page-market/xbox-game.png'),
  MachineGun: 'https://static.forthbox.io/image/nft/ham-fantasy/Machine-gun.png',
  Frozen: 'https://static.forthbox.io/image/nft/ham-fantasy/Frozen.png',
  Fire: 'https://static.forthbox.io/image/nft/ham-fantasy/Fire.png',
  Laser: 'https://static.forthbox.io/image/nft/ham-fantasy/Laser.png',
  RailGun: 'https://static.forthbox.io/image/nft/ham-fantasy/Railgun.png',
  Missile: 'https://static.forthbox.io/image/nft/ham-fantasy/Missile.png',
}

class Box {
  constructor(options) {
    // 延迟执行，确保设置传入的内容
    setTimeout(() => {
      Object.assign(this, options)
    })
  }
}

class NFTBox extends Box {
  image = 'https://static.forthbox.io/image/drops/ham-fantasy/market-drops-nftbox.png'
  imageStyle = ''
  name = 'Fighter NFT Mystery Box'
  sIcon = require('@/assets/page-market/drops-price-icon.png')
  desc = '2,000 FBX'
  date = '01-21-2022'
  price = 2000
  isEnd = false
  visible = true
  prizes = [
    'https://static.forthbox.io/image/aircraft/N.png',
    'https://static.forthbox.io/image/aircraft/R.png',
    'https://static.forthbox.io/image/aircraft/SR.png',
    'https://static.forthbox.io/image/aircraft/SSR.png',
  ]
  prizesStyle = ''
  description = [
    {
      title: 'The following prizes are included in the mystery box.',
      content: [
        '1) 100 SSR-Level Fighter NFT.',
        '2) 300 SR-Level Fighter NFT.',
        '3) 600 R-Level Fighter NFT.',
        '4) 1000 N-Level Fighter NFT.',
      ],
    },
    {
      title: 'Go-live time:',
      content: ['January 21 8:00 am UTC', 'January 21 4:00 pm SGT'],
    },
    {
      title: 'Note:',
      content: [
        '1.The total number of Fighter NFT in carnival is 2,000.',
        '2.Spend 2,000 FBX to open a mystery box once, up to 10 times for one BSC address.',
      ],
    },
  ]
  address = BOX_FIGHTER
  getContract() {
    return new FbxCarnival(this.address)
  }
  async initSimpleDetail() {
    const contract = this.getContract()
    const property = await contract.getParameters()
    this.isEnd = !!(property && property.maxGiftNum == property.giftNum)
  }
  async draw(contract) {
    const result = {
      showText: '',
      showImg: '',
    }

    await contract.calGift()
    const info = await contract.giftInfoLast()
    if (info) {
      const fighterNameMap = ['Fighter <N>', 'Fighter <R>', 'Fighter <SR>', 'Fighter <SSR>']
      const fighterImageMap = [
        'https://static.forthbox.io/image/aircraft/N.png',
        'https://static.forthbox.io/image/aircraft/R.png',
        'https://static.forthbox.io/image/aircraft/SR.png',
        'https://static.forthbox.io/image/aircraft/SSR.png',
      ]
      Object.assign(result, {
        showText: `${fighterNameMap[info.degree - 1]} #${info.tokenId}`,
        showImg: fighterImageMap[info.degree - 1],
      })
    }

    return result
  }
  async getOwnNum(contract) {
    return 0
  }
  async getInfo(contract) {
    const info = {
      addrLastNum: 0,
      addrMaxNum: 0,
      allLastNum: 0,
      ownNum: 0,
      unAvailable: false,
    }

    let params = await contract.getParameters()
    if (params) {
      Object.assign(info, {
        addrLastNum: params.addressLastGiftNum,
        addrMaxNum: 10,
        allLastNum: params.maxGiftNum - params.giftNum,
        ownNum: 0,
        unAvailable: false,
      })
      if (info.allLastNum == 0 || info.addrLastNum == 0) {
        info.unAvailable = true
      }
    }

