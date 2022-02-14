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

