import { TOKEN_FBX, NFT_HAM, NFT_TOWER } from '@/web3/contract.constant'

export const CONTRACTS = [
  {
    name: 'ForthBox Token(FBX)',
    address: TOKEN_FBX,
  },
  {
    name: 'ForthBox Ham NFT',
    address: NFT_HAM,
  },
  {
    name: 'ForthBox Ham DeFi',
    address: '0x55F2856706872F69E8CfC00C2abDf2d4adf6aE50',
  },
  {
    name: 'Fighter NFT',
    address: '0xe8A57066746d8a218c8bA9D4039Bf2Ab225A372a',
  },
  {
    name: 'GMCN NFT',
    address: '0x29aFd382d295643B8860d43220919c65cCDe2cdf',
  },
  {
    name: 'Normal Fighter NFT DeFi (3000FBX)',
    address: '0xDA420B819c9157B95C1BE47916Fe395464329614',
  },
  {
    name: 'Rare Fighter NFT DeFi (5000FBX)',
    address: '0x57b75c537a951aCaA4204555204C02230C1B65a1',
  },
  {
    name: 'SR Fighter NFT DeFi (8000FBX)',
    address: '0x67ee1Db4F2879B8d7C92F3f5551667d29c130b7B',
  },
  {
    name: 'SSR Fighter NFT DeFi (10000FBX)',
    address: '0x4933A020A697f94387f25230AaBdb7FA40082599',
  },
  {
    name: 'LP(FBX-USDT) DeFi',
    address: '0x75523248d4119204af918075fbb03c6F0fa6054b',
  },
  {
    name: 'SpaceWar CommentManage',
    address: '0x470591DEdd6BEB69F253DD0361f673fb009EbF30',
  },
  {
    name: 'SpaceWar BuyCoinManage',
    address: '0xd6B09756721ef6b1B556d2c296ECef668d00922b',
  },
  {
    name: 'Tower NFT',
    address: NFT_TOWER,
  },
].map((item) => {
  item.url = `https://bscscan.com/address/${item.address}`
  return item
})

export const SOCIALS = {
  Medium: 'https://medium.com/@forthboxofficial',
  Twitter: 'https://twitter.com/forthbox',
  YouTube: 'https://www.youtube.com/channel/UCJoiD0VN65Y3Trb6S7ivk5g',
  Telegram: 'https://t.me/ForthBox_Official',
  Facebook: 'https://www.facebook.com/forthbox/?ref=pages',
  Instagram: 'https://www.instagram.com/forthboxofficial/',
  Discord: 'https://discord.gg/eWUT9jA2Ut',
}

export const FOOTER_LINK_GROUP_LIMIT = 8

