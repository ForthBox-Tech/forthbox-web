<template>
  <div class="settings-account">
    <ProfileSection></ProfileSection>
    <TabsFrame
      class="main main-wrap2"
      :tabs="[{ text: $t('Settings.AccountSetting'), name: 'UserSetting' }]"
      @tab-change="onTabChange"
    >
      <template #UserSetting>
        <NavFrame :navs="userNavs">
          <template #UserInfo><UserInfo></UserInfo></template>
          <template #Password><Password></Password></template>
        </NavFrame>
      </template>
    </TabsFrame>
  </div>
</template>

<script>
import ProfileSection from '@/modules/ProfileSection.vue'
import TabsFrame from '@/layouts/TabsFrame.vue'
import NavFrame from './components/NavFrame.vue'
import UserInfo from './account-modules/UserInfo.vue'
import Password from './account-modules/Password.vue'
import initTriggerMixin from '@/mixins/init-trigger'

export default {
  components: {
    ProfileSection,
    TabsFrame,
    NavFrame,
    UserInfo,
    Password,
  },
  data() {
    return {}
  },
  computed: {
    userNavs() {
      // 必须通过计算属性来获取，不然多语言切换无法支持
      return [
        {
          icon: require('@/assets/page-settings/page-account/nav-userinfo.png'),
          text: this.$t('Settings.PersonalInformation'),
          name: 'UserInfo',
        },
        // {
        //   icon: require('@/assets/page-settings/page-account/nav-password.png'),
        //   text: '修改密码',
        //   name: 'Password',
        // },
      ]
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    onTabChange(tab) {
      if (tab.name === 'GameSetting') {
        console.log('------GameSetting')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-account {
}
</style>
