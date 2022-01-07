const CHAIN_ICON = {
  ETH: require('@/assets/common/chain-eth.png'),
  BNB: require('@/assets/common/chain-bnb.png'),
}

const TOKEN_ICON = {
  FBX: require('@/assets/common/token-fbx.png'),
  USDC: require('@/assets/common/token-usdc.png'),
}

export function getChainLogo(chain) {
  return CHAIN_ICON[(chain || '').toUpperCase()] || ''
}

export function getTokenLogo(token) {
  return TOKEN_ICON[(token || '').toUpperCase()] || ''
}
