<template>
  <div class="settings-game">
    <ProfileSection></ProfileSection>
    <TabsFrame class="main main-wrap2" :tabs="tabs" @tab-change="onTabChange">
      <template #AccountSetting>
        <NavFrame
          :navs="list"
          @nav-change="onNavChange"
          :aside="aside"
          @aside-trigger="onAsideTrigger"
        >
          <template #[game.name]><GameAccounts :game="game"></GameAccounts></template>
          <template #GameApply><GameApply></GameApply></template>
        </NavFrame>
      </template>
      <template #ManageSetting>
        <NavFrame
          :navs="list"
          @nav-change="onNavChange"
          :aside="aside"
          @aside-trigger="onAsideTrigger"
        >
          <template #[game.name]><GameManage :game="game"></GameManage></template>
          <template #GameApply><GameApply></GameApply></template>
        </NavFrame>
      </template>
    </TabsFrame>
  </div>
</template>

<script>
import ProfileSection from '@/modules/ProfileSection.vue'
import TabsFrame from '@/layouts/TabsFrame.vue'
import NavFrame from './components/NavFrame.vue'
import GameAccounts from './game-modules/GameAccounts.vue'
import GameApply from './game-modules/GameApply.vue'
import GameManage from './game-modules/GameManage.vue'
import initTriggerMixin from '@/mixins/init-trigger'

export default {
  components: {
    ProfileSection,
    TabsFrame,
    NavFrame,
    GameAccounts,
    GameApply,
    GameManage,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 20,

      total: 0,
      list: [],

      aside: {
        // icon: require('@/assets/page-settings/page-account/nav-game-add.png'),
        // text: '添加游戏',
        // name: 'GameApply',
      },

      game: {},
    }
  },
  computed: {
    tabs() {
      return [
        { text: this.$t('MyGames.GameAccountSetting'), name: 'AccountSetting' },
        // { text: this.$t('MyGames.GameManagement'), name: 'ManageSetting' },
      ]
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    onTabChange(tab) {
      // console.log('---onTagChange', tab)
    },
    onNavChange(nav) {
      this.game = nav || {}
    },
    onAsideTrigger() {
      //
    },

    async _getGameList() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/collections/get_list`
      const params = {
        category: '',
        type: '',
        isGame: 1,
        isFromGameAccount: 1,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        this.total = 0
        this.list = []
        console.warn(res.msg)
        return
      }

      const data = res.data || {}
      this.total = data.Total || 0
      this.list = (data.List || []).map((item) => ({
        ...item,
        icon: item.LogoUrl || '',
        text: item.Name || '',
        name: item.Name || '',
      }))
    },
    async init() {
      await this._getGameList()

      const selected = this.$route.query.focus || ''
      const index = (this.list || []).findIndex((item) => item.Symbol == selected)
      this.game = this.list[index >= 0 ? index : 0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-game {
}
</style>
