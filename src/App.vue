<template>
  <router-view />
</template>

<script>
import emitter from '@/common/js/emitter'
import { transformAddress } from '@/common/js/utils'
import * as wallet from '@/web3/wallet'

const AVATAR_DEFAULT = require('@/assets/common/user-default.png')

export default {
  data() {
    return {
      userWallet: '',
      token: '',
      user: {
        uid: '',
        name: '',
        email: '',
        avatar: AVATAR_DEFAULT,
        banner: '',
        introduce: '',
        website: '',
        twitter: '',
        discord: '',
        telegram: '',
        instagram: '',
        facebook: '',
      },
    }
  },
  computed: {
    vUserWallet() {
      return transformAddress(this.userWallet)
    },
  },
  methods: {
    connectWallet(walletName = cWebModel.mWallet) {
      const supportedWallet = wallet.WALLET.map((_wallet) => _wallet.name) || ['']
      if (!walletName) {
        walletName = localStorage.getItem('WALLET_CONNECT_MODE') || supportedWallet[0]
      }

      let connect = Promise.resolve()
      if (supportedWallet.includes(walletName)) {
        localStorage.setItem('WALLET_CONNECT_MODE', walletName)
        connect = wallet.connect(walletName, this._onConnect)
      }

      return connect.catch((err) => {
        console.error(err)
        this.clearUserInfo()
      })
    },
    disconnectWallet() {
      wallet.disconnectWallet()
      this.clearUserInfo()
      emitter.emit('connect-wallet')
    },
    _onConnect({ accounts = [], chainId = '' }) {
      const account = accounts && accounts[0]
      if (this.token && Number(this.userWallet) == Number(account)) {
        // 兼容旧页面事件
        emitter.emit('connect-wallet', { accounts, chainId })
        return
      }

      this.clearUserInfo()
      this.userWallet = account
      // 兼容旧页面事件
      emitter.emit('connect-wallet', { accounts, chainId })
      emitter.emit('wallet-change', { accounts, chainId })
    },

