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

    return info
  }
}

class TowerBox extends Box {
  image = 'https://static.forthbox.io/image/drops/ham-fantasy/main-3x.png'
  imageStyle = 'width: 80%'
  name = 'Tower Mystery Box'
  sIcon = require('@/assets/page-market/drops-price-icon.png')
  desc = '2,000 FBX'
  date = '03-25-2022'
  price = 2000
  isEnd = false
  visible = true
  prizes = [
    'https://static.forthbox.io/image/nft/ham-fantasy/Machine-gun.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Frozen.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Fire.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Laser.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Railgun.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Missile.png',
  ]
  prizesStyle = 'width: 15%'
  description = [
    {
      title: 'The following prizes are included in the mystery box.',
      content: [
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
      content: ['4:00 PM SGT (8:00 AM UTC), March 25, 2022'],
    },
    {
      title: 'Note:',
      content: [
        '1.The quantity of Tower NFT in carnival is 1,000 in total.',
        '2.Spend 2,000 FBX to buy a mystery box, up to 10 times for each BNB Smart Chain (BSC) address.',
      ],
    },
  ]
  tokenResult = NFT_TOWER
  address = BOX_TOWER
  getContract() {
    return new FBXTowerMysteryBoxNFT(this.address)
  }
  async initSimpleDetail() {
    const contract = this.getContract()
    const property = await contract.getParameters()
    this.isEnd = !!(property && property.totalNFT == property.totalSupply)
  }
  async draw(contract) {
    const result = {
      showText: '',
      showImg: '',
    }

    await contract.buyNFT()
    let num = await contract.balanceof()
    let tokenId = await contract.tokenOfOwnerByIndex(num - 1)
    Object.assign(result, {
      showText: `You've got Tower Mystery NFT. ID #${tokenId}`,
      showImg: 'https://static.forthbox.io/image/drops/ham-fantasy/main-3x.png',
    })

    return result
  }
  async getOwnNum(contract) {
    return await contract.balanceof()
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
        addrLastNum: params.addressLastBuyNum,
        addrMaxNum: 10,
        allLastNum: params.totalNFT - params.totalSupply,
        ownNum: 0,
        unAvailable: false,
      })
      if (info.allLastNum == 0 || info.addrLastNum == 0) {
        info.unAvailable = true
      }
      info.ownNum = await contract.balanceof()
    }

    return info
  }
}

class XBox extends Box {
  image = 'https://static.forthbox.io/image/nft/xbox.png'
  imageStyle = 'width: 80%'
  name = 'X-Box'
  sIcon = require('@/assets/page-market/drops-icon-box.png')
  desc = ''
  date = '06-09-2022'
  note = 'You have a chance to win prizes like Model 3, MacBook Pro, and PlayStation 5.'
  price = ''
  isEnd = false
  visible = true
  simplePrizes = [
    require('@/assets/page-market/xbox-tsl.png'),
    require('@/assets/page-market/xbox-mac.png'),
    require('@/assets/page-market/xbox-game.png'),
    require('@/assets/page-market/xbox-tower.png'),
  ]
  prizes = [
    require('@/assets/page-market/xbox-tsl.png'),
    require('@/assets/page-market/xbox-mac.png'),
    require('@/assets/page-market/xbox-game.png'),
    'https://static.forthbox.io/image/nft/ham-fantasy/Machine-gun.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Frozen.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Fire.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Laser.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Railgun.png',
    'https://static.forthbox.io/image/nft/ham-fantasy/Missile.png',
  ]
  prizesStyle = 'width: 23%'
  description = [
    {
      title: 'The following prizes are included in the X-Box.',
      content: [
        '1) 5 Tesla Model 3',
        '2) 10 Apple MacBook Pro',
        '3) 20 Sony PlayStation 5',
        '4) 200 Machine Gun Tower NFTs of the Ham Fantasy Game',
        '5) 200 Frozen Tower NFTs of the Ham Fantasy Game',
        '6) 200 Fire Tower NFTs of the Ham Fantasy Game',
        '7) 150 Laser Tower NFTs of the Ham Fantasy Game',
        '8) 150 Railgun Tower NFTs of the Ham Fantasy Game',
        '9) 89 Missile Tower NFTs of the Ham Fantasy Game',
      ],
    },
    {
      title: 'Launch time:',
      content: ['24:00 SGT (16:00 PM UTC), June 8, 2022'],
    },
    {
      title: 'Note:',
      content: [
        '1. The quantity of X-Box NFTs is 1,024 in total.',
        '2. When a user opens an X-Box, the prize will be transferred to the winner’s wallet address as an NFT in real-time. The result of the lottery draw will be synchronized to the blockchain, on which users can search for on-chain data.',
        '3. If you are the winner of the Tesla Model 3, MacBook Pro, and Sony PlayStation 5, please do not hesitate to contact the ForthBox admin or support on telegram. We need to verify your raffle result. There is no deadline for redeeming your prizes.',
      ],
    },
  ]
  // address = '0xe0aDb23Efa6d45Fc1a3dd947d066C52B038FF240' // 主网测试
  address = '0x829d327BeBb654E7E7e224DB111cfeC1b7CAa432' // 主网正式
  getContract() {
    return new SellNFTManage(this.address)
  }
  // nftAddress = '0xC39a3522aDA30c8B1aBEe9C0D87787a8390f5CD3' // 主网测试
  nftAddress = '0x3eB6f20CC03175A8686C3DEAc4De36fEb490212c' // 主网正式
  getNftContract() {
    return new NFT(this.nftAddress)
  }
  async initSimpleDetail() {
    const contract = this.getNftContract()
    const count = await contract.balanceof()
    this.desc = `You own ${count}`
  }
  async getPrize(prize) {
    const result = {
      showText: '',
      showImg: '',
    }

    Object.assign(result, {
      showText: `You've got ${prize}`,
      showImg: XBOX_IMAGE[prize],
    })

    return result
  }
  async getOwnNum(contract) {
    return await contract.balanceof()
  }
  async getInfo() {
    const info = {
      addrLastNum: 0,
      addrMaxNum: 0,
      allLastNum: 0,
      ownNum: 0,
      unAvailable: false,
    }

    const contract = this.getNftContract()
    info.ownNum = await contract.balanceof()
    if (info.ownNum == 0) {
      info.unAvailable = true
    }

    return info
  }
}

export const DROPS = {
  xbox: new XBox(),
  towerboxround2: new TowerBox({
    date: '04-25-2022',
    description: [
      {
        title: 'The following prizes are included in the mystery box.',
        content: [
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
        content: ['5:00 PM SGT (9:00 AM UTC), April 25, 2022'],
      },
      {
        title: 'Note:',
        content: [
          '1.The quantity of Tower NFT in carnival is 1,000 in total.',
          '2.Spend 2,000 FBX to buy a mystery box, up to 10 times for each BNB Smart Chain (BSC) address.',
        ],
      },
    ],
  }),
  towerboxround1: new TowerBox(),
  nftbox: new NFTBox(),
}
