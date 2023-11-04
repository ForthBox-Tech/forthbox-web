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

<style lang="scss">
.dialog-wallet {
  .wallet-main {
    position: relative;
    padding: 1.3rem 2rem 1.2rem;
    width: 16rem;
    background-color: #19191f;
    background-size: 17rem;
    border: 0.05rem solid #554c66;
    border-radius: 1.5rem;
    color: #fff;
    font-size: 0.8rem;
  }
  .header {
    position: relative;
    margin-bottom: 0.5rem;
    .title {
      font-size: 1rem;
      font-weight: normal;
      text-align: left;
    }
    .close {
      position: absolute;
      top: 0;
      right: -0.5rem;
    }
  }
  .content {
    .list {
      padding: 1rem 0;
    }
    .item {
      margin-bottom: 0.5rem;
      padding: 0 1rem;
      line-height: 2.5rem;
      text-align: left;
      border: 0.05rem solid #888;
      border-radius: 0.5rem;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
      .icon {
        margin-right: 0.5rem;
        width: 1rem;
        height: 1rem;
        vertical-align: -0.2rem;
      }
    }
  }

  @media (max-width: 768.89px) {
    .wallet-main {
      padding: 1.2rem 1.8rem 0.8rem;
      width: 12rem;
    }
  }
}
</style>

