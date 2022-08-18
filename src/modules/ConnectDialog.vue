<template>
  <Dialog class="connect-dialog" :visible="visible">
    <main class="connect-main">
      <header class="header">
        <h1 class="title">{{ $t('WalletDialog.Title') }}</h1>
        <a class="close" @click="onHide"></a>
      </header>
      <section class="content">
        <ul class="list">
          <li
            class="item"
            v-for="wallet in supportedWallet"
            :key="wallet.name"
            @click="onConnect(wallet.name)"
          >
            <img class="icon" :src="wallet.icon" />
            <span class="text">{{ wallet.text || wallet.name }}</span>
          </li>
        </ul>
        <p class="aside">
          Without a decentralized wallet? Please select
          <a class="link" @click="onLogin">Login with your account</a>
        </p>
      </section>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { WALLET } from '@/web3/wallet'
import { toLogin } from '@/helpers/ucenter.helper'

export default {
  name: 'ConnectDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,

      supportedWallet: WALLET,
    }
  },
  methods: {
    show() {
      if (this.visible) return
      this.visible = true
    },
    hide() {
      if (!this.visible) return
      this.visible = false
    },

    onHide() {
      this.hide()
    },
    async onConnect(wallet) {
      await this.$root.connectWallet(wallet)
      this.hide()
    },

    onLogin() {
      toLogin({ walletAuth: 1 })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

