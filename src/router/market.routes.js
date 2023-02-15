import Market from '@/views/Market'
import Nft from '@/views/Market/Nft'
import NftCollectionsDetail from '@/views/Market/NftCollectionsDetail'
import Drops from '@/views/Market/Drops'
import DropsDetail from '@/views/Market/DropsDetail'
import MarketPlace from '@/views/Market/MarketPlace'
import MarketPlaceDetail from '@/views/Market/MarketPlaceDetail'

const routes = [
  {
    path: '/market',
    name: 'Market',
    component: Market,
    meta: { title: 'Market' },
    redirect: (to) => `${to.path}/drops`,
    children: [
      {
        path: 'drops',
        name: 'Drops',
        component: Drops,
        meta: { title: 'Mystery Drops' },
      },
      {
        path: 'drops-detail',
        name: 'DropsDetail',
        component: DropsDetail,
        meta: { title: 'Drop Detail' },
      },
      {
        path: 'nft',
        name: 'Nft',
        component: Nft,
        meta: { title: 'NFT Market' },
      },
      {
        path: 'nft-collections-detail',
        name: 'NftCollectionsDetail',
        component: NftCollectionsDetail,
      },
      {
        path: 'market-place',
        name: 'MarketPlace',
        component: MarketPlace,
        meta: { title: 'Marketplace' },
      },
      {
        path: 'market-place-detail',
        name: 'MarketPlaceDetail',
        component: MarketPlaceDetail,
      },
    ],
  },
]

export default routes





