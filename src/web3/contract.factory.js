import ERC20 from './ERC20'
import FBXTurretNFT from './FBXTurretNFT'
import { TOKEN_FBX, TOKEN_USDC, NFT_TOWER } from './contract.constant'

export function getFbxContract() {
  return new ERC20(TOKEN_FBX)
}

export function getUsdcContract() {
  return new ERC20(TOKEN_USDC)
}

export function getTowerContract() {
  return new FBXTurretNFT(NFT_TOWER)
}
