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

.connect-dialog {
  .connect-main {
    box-sizing: border-box;
    width: 26rem;
    font-size: 1rem;
    text-align: left;
    background-color: $color-white;
    border-radius: 0.8em;
    @media (max-width: 768.89px) {
      width: 15rem;
      font-size: 0.8rem;
    }
    &::before,
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }
  .header {
    display: flex;
    align-items: center;
    line-height: 3.5em;
    .title {
      flex: 1;
      margin: 0 0 0 2.5em;
      font-size: inherit;
      font-weight: 500;
      color: $color-primary;
      text-align: center;
    }
    .close {
      display: block;
      margin-right: 0.5em;
      width: 2em;
      height: 2em;
      background: url('~@/assets/common/close.png') center center / 0.8em no-repeat;
      cursor: pointer;
      &:hover {
        filter: brightness(0.8);
      }
    }
  }
  .content {
    padding: 0 2em 2em;
    font-size: 0.8em;
    color: #6b6b6e;
    .list {
      margin: 0 0 0.8em;
      border: 0.05rem solid lighten($color-border, 3);
      border-radius: 0.5em;
      overflow: hidden;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 0 1.2em;
      line-height: 3.75em;
      text-align: left;
      font-weight: 500;
      border-bottom: 0.05rem solid lighten($color-border, 6);
      cursor: pointer;
      &:last-child {
        border-bottom: 0 none;
      }
      &:hover {
        background-color: darken($color-white, 2);
      }
      .icon {
        margin-right: 0.8em;
        width: 1.8em;
        height: 1.8em;
      }
      .text {
        flex: 1;
      }
      &::after {
        content: '';
        display: inline-block;
        width: 1.4em;
        height: 1em;
        background: url('~@/assets/common/icon-arrow.png') center center / contain no-repeat;
      }
    }
    .aside {
      padding: 0.2em 0;
      line-height: 1.4;
      font-size: 0.85em;
      .link {
        color: $color-blue;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

