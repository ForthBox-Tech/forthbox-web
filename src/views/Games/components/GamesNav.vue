<template>
  <div :class="['comp-games-nav', isImmersive ? 'transparent' : '']" v-bind="$attrs">
    <main class="main-wrap2">
      <nav class="nav">
        <a class="link link-home" href="/">
          <img class="logo" src="@/assets/common/logo.png" />
        </a>
        <router-link
          :class="['link', ['/games', '/games/collections'].includes($route.path) ? 'active' : '']"
          to="/games"
        >
          Games
        </router-link>
        <router-link
          :class="['link', ['/games/about'].includes($route.path) ? 'active' : '']"
          to="/games/about"
        >
          About
        </router-link>
      </nav>
      <div class="btns">
        <!-- <template v-if="!$root.token">
          <a class="btn btn-sign-in" @click="onSignIn"> Sign in </a>
          <a class="btn btn-sign-up" @click="onSignUp"> Sign up</a>
        </template>
        <template v-else> -->
        <a class="btn btn-prize" @click.stop="onPrize">
          <span class="bubble">99</span>
          <i class="trigger"></i>
        </a>
        <a class="btn btn-profile">
          <span class="inner" v-if="$root.token" @click.stop="onProfile">
            <!-- <span class="name">{{ $root.vUserWallet }}</span> -->
            <img class="avatar" :src="$root.user.avatar" />
          </span>
          <i class="trigger" v-else @click.stop="onProfile"></i>
          <UserModal ref="UserModal" class="user-modal"></UserModal>
        </a>
        <!-- </template> -->
      </div>
    </main>
  </div>
  <div v-if="!isImmersive" class="comp-games-nav-placeholder"></div>
  <Login
    ref="Login"
    @account="onAccountLogin"
    @wallet="onWalletLogin"
    @third="onThirdLogin"
  ></Login>
  <LoginByThird ref="LoginByThird"></LoginByThird>
  <ConnectDialog ref="ConnectDialog"></ConnectDialog>
  <WalletSignDialog ref="WalletSignDialog"></WalletSignDialog>
  <BoxDialog ref="BoxDialog" @success="onDrawSuccess"></BoxDialog>
  <PrizeDialog ref="PrizeDialog" @record="onRecord"></PrizeDialog>
  <DrawRecordDialog ref="DrawRecordDialog"></DrawRecordDialog>
</template>

<script>
import UserModal from '@/modules/UserModal.vue'
import ConnectDialog from '@/modules/ConnectDialog.vue'
import WalletSignDialog from '@/modules/WalletSignDialog.vue'
import Login from './Login.vue'
import LoginByThird from './LoginByThird.vue'
import BoxDialog from './BoxDialog.vue'
import PrizeDialog from './PrizeDialog.vue'
import DrawRecordDialog from './DrawRecordDialog.vue'
import emitter from '@/common/js/emitter'
import { toLogin } from '@/helpers/ucenter.helper'

export default {
  name: 'GamesNav',
  components: {
    UserModal,
    ConnectDialog,
    WalletSignDialog,
    Login,
    LoginByThird,
    BoxDialog,
    PrizeDialog,
    DrawRecordDialog,
  },
  data() {
    return {}
  },
  computed: {
    isImmersive() {
      return ['/games'].indexOf(this.$route.path) > -1
    },
  },
  methods: {
    onSignIn() {
      this._toggle('Login')
    },
    onSignUp() {
      // 注册
    },
    onPrize() {
      this._toggle('BoxDialog')
    },
    onProfile() {
      const ref = this.$root.token ? 'UserModal' : 'Login'
      this._toggle(ref)
    },
    _toggle(ref) {
      const names = [
        'UserModal',
        'Login',
        'LoginByThird',
        'ConnectDialog',
        'BoxDialog',
        'PrizeDialog',
        'DrawRecordDialog',
      ]
      names.forEach((name) => {
        const $ref = this.$refs[name]
        if ($ref) {
          if (ref === name) {
            typeof $ref.toggle == 'function' ? $ref.toggle() : $ref.show()
          } else {
            $ref.hide()
          }
        }
      })
    },

    onAccountLogin() {
      toLogin()
    },
    onWalletLogin() {
      this._toggle('ConnectDialog')
    },
    onThirdLogin() {
      this._toggle('LoginByThird')
    },

    onDrawSuccess() {
      this._toggle('PrizeDialog')
    },
    onRecord() {
      this._toggle('DrawRecordDialog')
    },

    async _onWalletChange() {
      if (this.$root.token) return

      const isExist = await this._isExistUser()
      if (isExist) {
        await this.$root.sign()
        await this.$root.getUserInfo()
        emitter.emit('auth-change')
      } else {
        this._toggle('WalletSignDialog')
      }
    },
    async _isExistUser() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/users/is_exist`
      const params = {
        type: 'userAddr',
        value: this.$root.userWallet,
      }

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        console.warn(res.msg)
        return
      }

      return !!res.data?.isExisted
    },
  },
  mounted() {},
  created() {
    emitter.on('wallet-connect', this.onProfile)
    emitter.on('wallet-change', this._onWalletChange)
  },
  unmounted() {
    emitter.off('wallet-connect', this.onProfile)
    emitter.off('wallet-change', this._onWalletChange)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-games-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  color: $color-primary;
  background-color: $color-white;
  box-shadow: 0 0 0.8rem 0 rgba(91, 92, 97, 0.1);
  -webkit-tap-highlight-color: transparent;
  &.transparent {
    color: $color-white;
    background-color: transparent;
    box-shadow: none;
  }
  .main-wrap2 {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--nav2-height);
    margin-top: 0;
    margin-bottom: 0;
    color: inherit;
  }
  .nav {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    @media (max-width: 768.89px) {
      font-size: 0.65rem;
    }
    .link {
      display: block;
      margin-right: 1.5rem;
      font-weight: 500;
      color: inherit;
      cursor: pointer;
      @media (max-width: 768.89px) {
        margin-right: 0.5rem;
      }
      &.link-home {
        margin-right: 2.5rem;
        @media (max-width: 768.89px) {
          margin-right: 0.5rem;
        }
      }
      &:hover,
      &.active {
        color: $color-blue;
      }
    }
    .logo {
      display: block;
      width: 6.9rem;
      @media (max-width: 768.89px) {
        width: 5.4rem;
      }
    }
  }

  .btns {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    .btn {
      position: relative;
      display: block;
      margin-left: 1.5rem;
      cursor: pointer;
      @media (max-width: 768.89px) {
        margin-left: 0.5rem;
      }
      .trigger {
        display: block;
        height: 1.5rem;
        width: 1.5rem;
        background: center center / 100% no-repeat;
        @media (max-width: 768.89px) {
          height: 1.2rem;
          width: 1.2rem;
        }
      }
    }
    .btn-sign-in,
    .btn-sign-up {
      font-size: 0.75rem;
      font-weight: 500;
      &:hover {
        opacity: 0.9;
      }
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
      }
    }
    .btn-sign-up {
      padding: 0 0.6rem;
      line-height: 1.7rem;
      color: $color-white;
      background-color: $color-blue;
      border-radius: 0.3rem;
      @media (max-width: 768.89px) {
        padding: 0 0.3rem;
        line-height: 1.5rem;
      }
    }
    .btn-prize {
      .trigger {
        margin: 0.2rem 0 -0.15rem 0;
        height: 1.8rem;
        width: 1.7rem;
        background-image: url('~@/assets/page-games/comp-games-nav/icon-prize.png');
        @media (max-width: 768.89px) {
          height: 1.4rem;
          width: 1.3rem;
        }
      }
      .bubble {
        position: absolute;
        top: -10%;
        right: -30%;
        display: inline-block;
        box-sizing: border-box;
        padding: 0 0.2rem;
        min-width: 0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.6rem;
        color: $color-white;
        background-color: $color-red;
        border-radius: 1rem;
        @media (max-width: 768.89px) {
          min-width: 0.65rem;
          height: 0.65rem;
          line-height: 0.65rem;
          font-size: 0.5rem;
        }
      }
    }
    .btn-profile {
      .inner {
        display: block;
        padding: 0.15rem 0.3rem 0.15rem 0.1rem;
        line-height: 1;
        // border: 0.05rem solid $color-blue;
        border-radius: 2rem;
        white-space: nowrap;
        @media (max-width: 768.89px) {
          padding: 0.1rem 0.15rem 0.1rem 0.1rem;
        }
      }
      .name {
        margin: 0 0.5rem;
        font-size: 0.8rem;
        color: $color-blue;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          margin: 0 0.3rem;
          font-size: 0.6rem;
        }
      }
      .avatar {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 1.5rem;
        overflow: hidden;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .trigger {
        background-image: url('~@/assets/comp-nav/icon-profile.png');
        &:hover {
          background-image: url('~@/assets/comp-nav/icon-profile-active.png');
        }
      }
    }
    .btn-menu {
      padding: 0.2rem;
      font-size: 0;
      width: 0.9rem;
      @media (max-width: 768.89px) {
        margin-left: 0.35rem;
      }
      .line {
        margin: 0.22rem 0;
        display: block;
        width: inherit;
        height: 0.1rem;
        border-radius: 0.05rem;
        background-color: $color-black;
        transition: transform 0.5s, width 0.4s, opacity 0.4s;
        &.line-1 {
          transform-origin: top left;
        }
        &.line-3 {
          transform-origin: bottom left;
        }
      }
      &.close {
        .line {
          width: 0.97rem;
        }
        .line-1 {
          transform: rotate(45deg);
        }
        .line-2 {
          width: 0;
          opacity: 0;
        }
        .line-3 {
          transform: rotate(-45deg);
        }
      }
    }
  }

  .user-modal,
  .wallet-modal {
    top: 130%;
    right: -1rem;
    @media (max-width: 768.89px) {
      position: fixed;
      top: var(--nav2-height);
      left: 0;
      right: 0;
      bottom: 0;
      background-color: darken($color-white, 1);
    }
  }
}
.comp-games-nav-placeholder {
  height: var(--nav2-height);
}
</style>

