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

