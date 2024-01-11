<template>
  <Dialog class="dialog-login" :visible="visible" @hide="onHide">
    <main class="main">
      <h1 class="title">登录</h1>
      <ul class="list">
        <li class="item" @click="onAccount">
          <img class="icon" src="@/assets/page-games/comp-login/icon-user.png" />
          <span class="text">账号登录</span>
        </li>
        <li class="item" @click="onWallet">
          <img class="icon" src="@/assets/page-games/comp-login/icon-wallet.png" />
          <span class="text">钱包登录</span>
        </li>
        <li class="item" @click="onThird">
          <img class="icon" src="@/assets/page-games/comp-login/icon-third.png" />
          <span class="text">第三方登录</span>
        </li>
      </ul>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Login',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },

    onHide() {
      this.hide()
    },

    onAccount() {
      this.$emit('account')
    },
    onWallet() {
      this.$emit('wallet')
    },
    onThird() {
      this.$emit('third')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-login {
  $color-blue: #394688;

  .main {
    position: relative;
    padding: 0 2.5em 2em;
    width: 20em;
    font-size: 1rem;
    color: $color-white;
    background-color: rgba($color-blue, 0.7);
    border: 0.05rem solid rgba($color-white, 0.5);
    border-radius: 0.8em;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba($color-blue, 1);
      filter: blur(80px);
    }
    @media (max-width: 768.89px) {
      padding: 0 1.8em 0.8em;
      width: 16em;
      font-size: 0.8rem;
    }
  }
  .title {
    margin-top: 0.3em;
    line-height: 2.7;
    font-size: 1.3em;
  }
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: 1.2em 0;
    padding: 0 1em;
    line-height: 2.6;
    font-size: 1.1em;
    text-align: left;
    background-color: $color-blue;
    border-radius: 0.5em;
    cursor: pointer;
    .icon {
      height: 1.2em;
    }
    .text {
      flex: 1;
      margin: 0 1.2em;
    }
    &::after {
      content: '';
      display: inline-block;
      width: 1.2em;
      height: 0.9em;
      background: url('~@/assets/common/icon-arrow.png') center center / contain no-repeat;
      filter: brightness(1.5);
    }
    &:hover {
      background-color: lighten($color-blue, 18);
    }
  }
}
</style>

