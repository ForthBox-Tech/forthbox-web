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

