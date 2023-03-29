<template>
  <div class="user-modal" v-if="visible" ref="UserModal">
    <div class="user" v-if="$root.vUserWallet">
      <div class="info">
        <div class="name" v-if="$root.user.name">
          <span class="text">{{ $root.user.name }}</span>
          <a class="btn-edit" @click="onJump('/settings')"></a>
        </div>
        <div class="wallet">
          <span class="text">{{ $root.vUserWallet }}</span>
          <Tooltip trigger="manual" ref="tooltip" :text="$t('Footer.Copied')">
            <a ref="copyTrigger" class="btn-copy" :data-clipboard-text="$root.userWallet"></a>
          </Tooltip>
        </div>
      </div>
      <img class="avatar" :src="$root.user.avatar" />
    </div>
    <div class="row" @click="onJump('/market2/profile')">
      <img class="icon" src="@/assets/comp-user-modal/icon-nfts.png" />
      <span class="text">{{ $t('Market.MyNFTs') }}</span>
    </div>
    <div class="row" @click="onJump('/settings/game')">
      <img class="icon" src="@/assets/comp-user-modal/icon-games.png" />
      <span class="text">{{ $t('Nav.MyGames') }}</span>
    </div>
    <div class="row" @click="onJump('/defi')">
      <img class="icon" src="@/assets/comp-user-modal/icon-defi.png" />
      <span class="text">{{ $t('SideTab.DeFi') }}</span>
    </div>
    <div class="row" @click="onMarketV1">
      <img class="icon" src="@/assets/comp-user-modal/icon-market.png" />
      <span class="text">{{ $t('Market2.Marketplace') }} v1</span>
    </div>
    <div class="row" @click="onJump('/settings')">
      <img class="icon" src="@/assets/comp-user-modal/icon-settings.png" />
      <span class="text">{{ $t('Settings.Settings') }}</span>
    </div>
    <!-- <div class="row" @click="onJump('/invite')">
      <img class="icon" src="@/assets/comp-user-modal/icon-invite.png" />
      <span class="text">邀请好友</span>
    </div> -->
    <div class="row" @click.stop="onLanguage">
      <img class="icon" src="@/assets/comp-user-modal/icon-language.png" />
      <span class="text">{{ $t('Nav.Language') }}</span>
      <span class="aside">{{ language }}</span>
      <LanguageModal ref="LanguageModal" class="language-modal"></LanguageModal>
    </div>
    <div class="row" @click="onLogout">
      <img class="icon" src="@/assets/comp-user-modal/icon-logout.png" />
      <span class="text">{{ $t('Nav.Logout') }}</span>
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/Tooltip.vue'
import LanguageModal from './LanguageModal.vue'
import { isInElem } from '@/common/js/utils'
import Clipboard from 'clipboard'

const LANGUAGE_TEXT = {
  en: 'EN',
  'zh-TW': 'ZH',
  ko: 'KR',
}

export default {
  name: 'UserModal',
  components: {
    Tooltip,
    LanguageModal,
  },
  props: {},
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    language() {
      const locale = this.$root.$i18n.locale || ''
      return LANGUAGE_TEXT[locale] || 'EN'
    },
  },
  methods: {
    show() {
      if (this.visible) return
      this.visible = true

