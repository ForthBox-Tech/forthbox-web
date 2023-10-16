import Market2 from '@/views/Market2'
import Carnivals from '@/views/Market2/Carnivals'
import CarnivalsDetail from '@/views/Market2/CarnivalsDetail'
import MarketPlace from '@/views/Market2/MarketPlace'
import MarketPlaceProject from '@/views/Market2/MarketPlaceProject'
import MarketPlaceDetail from '@/views/Market2/MarketPlaceDetail'
import Profile from '@/views/Market2/Profile'
import ProfileDetail from '@/views/Market2/ProfileDetail'

const routes = [
  {
    path: '/market2',
    component: Market2,
    meta: { title: 'Marketplace V2' },
    redirect: (to) => `${to.path.replace(/\/$/, '')}/marketplace`,
    children: [
      {
        path: 'carnivals',
        component: Carnivals,
      },
      {
        path: 'carnivals/detail',
        component: CarnivalsDetail,
      },
      {
        path: 'marketplace',
        name: 'Market2Marketplace',
        component: MarketPlace,
        meta: { title: 'Marketplace' },
      },
      {
        path: 'marketplace/project',
        component: MarketPlaceProject,
      },
      {
        path: 'marketplace/detail',
        component: MarketPlaceDetail,
      },
      {
        path: 'profile',
        name: 'Market2Profile',
        component: Profile,
        meta: { title: 'Profile' },
      },
      {
        path: 'profile/detail',
        component: ProfileDetail,
      },
    ],
  },
]

export default routes



