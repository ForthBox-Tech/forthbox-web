<template>
  <Dialog class="dialog-wallet" :visible="visible">
    <main class="wallet-main">
      <header class="header">
        <h1 class="title">{{ $t('WalletDialog.Title') }}</h1>
        <a class="close" @click="onHide">
          <img src="@/assets/minting/dialog-close.png" />
        </a>
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
            <span>{{ wallet.text || wallet.name }}</span>
          </li>
        </ul>
      </section>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { WALLET } from '@/web3/wallet'

export default {
  name: 'WalletDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      supportedWallet: WALLET,

      visible: false,
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

    onConnect(wallet) {
      this.$root.connectWallet(wallet)
      this.hide()
    },
    onHide() {
      this.hide()
    },
  },
}
</script>

