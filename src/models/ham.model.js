/** 等级对应的图片 */
export const LEVEL_IMAGE_MAP = [
  'https://static.forthbox.io/image/nft/ham/HamNft_1.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_2.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_3.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_4.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_5.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_6.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_7.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_8.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_9.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_10.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_11.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_12.png',
  'https://static.forthbox.io/image/nft/ham/HamNft_13.png',
]
/** 等级对应的经验值 */
const LEVEL = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15]

/**
 * 获取等级信息
 * @param {number}} exp 等级经验值
 * @returns
 */
export function getNftLevel(exp) {
  const level = {
    lv: 0,
    exp: 0,
    stage: 0,
  }
  let i = 0
  for (; i < LEVEL.length; i++) {
    const stage = LEVEL[i] || 100000000
    if (exp - stage <= 0) {
      level.lv = i + 1
      level.exp = exp
      level.stage = stage
      break
    }
    exp -= stage
  }
  if (i === LEVEL.length) {
    level.lv = i
    level.exp = LEVEL[i - 1]
    level.stage = LEVEL[i - 1]
  }
  return level
}

/**
 * 获取NFT数据，依据传入的值进行初始化，未传入值时用默认值替代
 * @param {string} token tokenId
 * @param {number} degree 等级值
 * @param {number} lastUpdateTime 最新喂养时间（单位：秒）
 * @param {boolean} isStaked 是否质押中
 * @param {number} power 算力
 * @param {number[]} property 属性：[智力, 战斗力, 财力, 敏捷, 颜值]
 * @returns
 */
export function getNft(
  token = '',
  degree = 0,
  lastUpdateTime = 0,
  isStaked = false,
  power = 0,
  property = []
) {
  const level = getNftLevel(degree || 0)
  return {
    token: token || '', // token
    level, // 等级
    isStaked: isStaked || false, // 是否已质押
    lastUpdateTime: lastUpdateTime * 1000 || 0, // 最新的喂养时间
    image: LEVEL_IMAGE_MAP[level.lv - 1] || '', // 图片
    property: {
      // 属性
      pow: power || 0, // 算力
      int: property[0] || 0, // 智力，0
      ce: property[1] || 0, // 战斗力，1
      gold: property[2] || 0, // 财力，2
      agi: property[3] || 0, // 敏捷，3
      chr: property[4] || 0, // 颜值，4
    },
  }
}

/**
 * 初始化NFT信息
 * @param {string} token tokenId
 * @param {boolean} isStaked 是否质押中
 * @returns
 */
export function initNft(token = '', isStaked = false) {
  if (!token) {
    console.warn('NFT.initNft token is empty')
    return Promise.resolve(getNft())
  }

  return window.cNFTFun
    .getPropertiesByTokenIds([token])
    .then(([nft]) => {
      // console.log(nft)
      return getNft(nft.id, nft.degree, nft.lastUpdateTime, isStaked, nft.hashrate, nft.property)
    })
    .catch((err) => {
      console.warn('NFT.initNft', err)
      return getNft()
    })
}

/**
 * 批量获取NFT信息
 * @param {string[]} tokens tokenId的列表
 * @param {boolean} isStaked 是否质押中
 */
export function initNftList(tokens = [], isStaked = false) {
  if (!tokens || !tokens.length) {
    console.warn('NFT.initNftList tokens is empty')
    return Promise.resolve([])
  }

  return window.cNFTFun
    .getPropertiesByTokenIds(tokens)
    .then((nfts) => {
      // console.log(nfts)
      return nfts.map((nft) =>
        getNft(nft.id, nft.degree, nft.lastUpdateTime, isStaked, nft.hashrate, nft.property)
      )
    })
    .catch((err) => {
      console.warn('NFT.initNftList', err)
      return []
    })
}
