import Settings from '@/views/Settings'
import Account from '@/views/Settings/Account'
import Game from '@/views/Settings/Game'
import Notice from '@/views/Settings/Notice'

const routes = [
  {
    path: '/settings',
    component: Settings,
    meta: { title: 'Settings' },
    redirect: (to) => `${to.path.replace(/\/$/, '')}/account`,
    children: [
      {
        path: 'account',
        name: 'SettingsAccount',
        component: Account,
        meta: { title: 'Account Settings' },
      },
      {
        path: 'game',
        name: 'SettingsGame',
        component: Game,
        meta: { title: 'Game Settings' },
      },
      {
        path: 'notice',
        name: 'SettingsNotice',
        component: Notice,
        meta: { title: 'Notice Center' },
      },
    ],
  },
]

export default routes




