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

    async sign() {
      if (this._signing) return
      this._signing = true
      this.setToken()
      let token = ''
      try {
        const res = await wallet.sign(this.userWallet)
        if (res.code == 200) {
          token = res.data?.token || ''
        }
      } catch (err) {
        console.error(err)
      }
      this._signing = false
      this.setToken(token)
      return token
    },

    logout() {
      wallet.disconnectWallet()
      this.clearUserInfo()
      emitter.emit('auth-change')
    },
    clearUserInfo() {
      this.userWallet = ''
      this.setToken()
      this.user = {}
    },

    setToken(token, time) {
      const axiosDefaultsHeaders = this.$axios.defaults.headers

      token = token || ''
      this.token = token
      if (token) {
        const data = JSON.stringify({
          token,
          address: this.userWallet || '',
          time: time || Date.now(),
        })
        axiosDefaultsHeaders.common['FToken'] = token
        sessionStorage.setItem('FToken', data)
      } else {
        delete axiosDefaultsHeaders.common['FToken']
        sessionStorage.removeItem('FToken')
      }
    },
    async _checkToken() {
      try {
        const data = JSON.parse(sessionStorage.getItem('FToken') || null)
        const hour = 3600000
        if (data && Date.now() - data.time < 12 * hour) {
          // 设置钱包信息（先于setToken执行，确保钱包信息已经填充）
          this.userWallet = data.address
          // 设置token
          this.setToken(data.token, data.time)
          // 拉取用户信息
          this.token && (await this.getUserInfo())
          // 自动连接钱包（初始化window.web3对象，设置全局钱包账户cWebModel.mAccount等信息）
          this.userWallet && (await this.connectWallet())
          return data.token
        }
      } catch (err) {
        console.warn(err)
      }
    },

    getUserInfo() {
      return this.$axios
        .get(`${process.env.VUE_APP_API_FBOX2}/web/users/get_login_info`)
        .then((res) => {
          if (res.code == 200) {
            const data = res.data || {}
            this.userWallet = data.UserAddr || ''
            this.user = {
              uid: data.UserId || '',
              name: data.UserName || '',
              email: data.Email || '',
              avatar: data.Avatar || AVATAR_DEFAULT,
              banner: data.BannerUrl || '',
              introduce: data.Introduce || '',
              website: data.WebsiteUrl || '',
              twitter: data.TwitterUrl || '',
              discord: data.DiscordUrl || '',
              telegram: data.TelegramUrl || '',
              instagram: data.InstagramUrl || '',
              facebook: data.FacebookUrl || '',
            }
            return
          }
          throw new Error(res.msg)
        })
        .catch((err) => {
          this.user = {}
          console.error(err)
        })
    },

    async _checkLogin() {
      const oUrl = new URL(window.location.href)
      const searchParams = oUrl.searchParams
      const code = searchParams.get('code') || ''
      const forceWallet = searchParams.get('forceWallet') || ''
      if (!code) return

      // 清除链接中的 code 和 forceWallet 参数
      searchParams.delete('code')
      searchParams.delete('forceWallet')
      window.history.replaceState(null, '', oUrl.href)

      if (forceWallet == 1) {
        setTimeout(() => {
          emitter.emit('wallet-connect')
        })
        return
      }

      // 用中心登录后的 code 换取页面 token
      // const url = `${process.env.VUE_APP_API_FBOX2}/web/users/code_to_token`
      // const params = new URLSearchParams()
      // params.append('authCode', code)

      // const res = await this.$axios.post(url, params)
      // if (!res || res.code != 200) {
      //   alert(res.msg)
      //   return
      // }
      // this.setToken(res.data.token)

      // 拉取用户身份信息
      // await this.getUserInfo()
    },
  },
  created() {
    wallet.bind(this._onConnect)

    this._checkToken()
      .then((token) => !token && this._checkLogin())
      .then(() => emitter.emit('auth-change'))

    emitter.on('user-update', this.getUserInfo)
  },
  unmounted() {
    emitter.off('user-update', this.getUserInfo)
  },
}
</script>

<style lang="scss">
@import '@/common/css/base.scss';

#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
