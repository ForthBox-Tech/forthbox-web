import DeFi from '@/views/DeFi'
import LPFarm from '@/views/DeFi/LPFarm'
import LPFarmDetail from '@/views/DeFi/LPFarmDetail'
import NFT from '@/views/DeFi/NFT'
import NFTDetail from '@/views/DeFi/NFTDetail'
import Staking from '@/views/DeFi/Staking'
import StakingDetail from '@/views/DeFi/StakingDetail'
import FBXStaking from '@/views/DeFi/FBXStaking'
import FBXStakingDetail from '@/views/DeFi/FBXStakingDetail'

const routes = [
  {
    path: '/defi',
    name: 'DeFi',
    component: DeFi,
    meta: { title: 'DeFi' },
    redirect: (to) => `${to.path}/staking`,
    children: [
      {
        path: 'lp-farm',
        name: 'LPFarm',
        component: LPFarm,
        meta: { title: 'LP Farm' },
      },
      {
        path: 'lp-farm-detail',
        name: 'LPFarmDetail',
        component: LPFarmDetail,
      },
      {
        path: 'nft',
        name: 'NFT',
        component: NFT,
        meta: { title: 'NFT Staking' },
      },
      {
        path: 'nft-detail',
        name: 'NFTDetail',
        component: NFTDetail,
      },
      {
        path: 'staking',
        name: 'Staking',
        component: Staking,
        meta: { title: 'Staking' },
      },
      {
        path: 'staking-detail',
        name: 'StakingDetail',
        component: StakingDetail,
      },
      {
        path: 'fbx-staking',
        name: 'FBXStaking',
        component: FBXStaking,
        meta: { title: 'FBX Staking' },
      },
      {
        path: 'fbx-staking-detail',
        name: 'FBXStakingDetail',
        component: FBXStakingDetail,
      },
    ],
  },
]

export default routes





