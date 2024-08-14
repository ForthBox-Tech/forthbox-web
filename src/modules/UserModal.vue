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

      this.$nextTick(() => {
        this._clipboard = new Clipboard(this.$refs.copyTrigger)
        this._clipboard.on('success', () => {
          this.$refs.tooltip.toast()
        })
      })
    },
    hide() {
      if (!this.visible) return
      this.visible = false

      this._clipboard && this._clipboard.destroy()
    },
    toggle() {
      this.visible ? this.hide() : this.show()
    },

    onJump(path) {
      this.$router.push(path)
      this.hide()
    },
    onMarketV1() {
      window.open('/#/market')
      this.hide()
    },
    onLanguage() {
      this.$refs.LanguageModal.show()
    },
    onLogout() {
      this.$root.logout()
      this.hide()
    },
  },
  created() {
    this._hide = (evt) => {
      if (!isInElem(evt, this.$refs.UserModal)) {
        this.hide()
      }
    }
    document.addEventListener('click', this._hide)
  },
  unmounted() {
    document.removeEventListener('click', this._hide)

    this._clipboard && this._clipboard.destroy()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.user-modal {
  position: absolute;
  z-index: 100;
  box-sizing: border-box;
  width: 14rem;
  color: $color-primary;
  background-color: $color-white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.6rem 0.05rem rgba(91, 92, 97, 0.16);
  @media (max-width: 768.89px) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
  .user {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    line-height: 1.4;
    .avatar {
      margin-left: 0.5rem;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 2.5rem;
      overflow: hidden;
    }
    .info {
      flex: 1;
      width: 0;
    }
    .text {
      @include ellipsis(1);
      display: inline-block;
      max-width: 80%;
      vertical-align: middle;
    }
    .name {
      font-size: 0;
      .text {
        font-size: 0.7rem;
        color: $color-secondary;
      }
    }
    .wallet {
      font-size: 0;
      .text {
        font-size: 0.85rem;
      }
    }
    .btn-edit,
    .btn-copy {
      position: relative;
      margin-left: 0.5rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: center center / 0.6rem no-repeat;
      vertical-align: middle;
    }
    .btn-edit {
      background-image: url('~@/assets/comp-user-modal/icon-edit.png');
      &:hover {
        background-image: url('~@/assets/comp-user-modal/icon-edit-a.png');
      }
    }
    .btn-copy {
      background-image: url('~@/assets/comp-user-modal/icon-copy.png');
      &:hover {
        background-image: url('~@/assets/comp-user-modal/icon-copy-a.png');
      }
    }
  }
  .row {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    line-height: 2.7rem;
    font-size: 0.8rem;
    border-top: 0.05rem solid rgba($color-border, 0.75);
    @media (max-width: 768.89px) {
      &:last-child {
        border-bottom: 0.05rem solid rgba($color-border, 0.75);
      }
    }
    .icon {
      display: block;
      margin-right: 1rem;
      width: 0.8rem;
      height: 0.8rem;
    }
    .text {
      display: block;
      flex: 1;
      width: 0;
    }
    .aside {
      margin: 0 0.5rem;
    }
    &::after {
      content: '';
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      border-top: 0.1rem solid $color-secondary;
      border-right: 0.1rem solid $color-secondary;
      transform: rotate(45deg);
    }
    &:hover {
      background-color: #f9f9f9;
    }
  }
  .language-modal {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

