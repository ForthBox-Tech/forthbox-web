<template>
  <Dialog class="dialog-login-third" :visible="visible" @hide="onHide">
    <main class="main">
      <h1 class="title">第三方登录</h1>
      <div class="third">
        <a class="link">
          <img class="icon" src="@/assets/page-games/comp-login/third-google.png" />
        </a>
        <span class="line"></span>
        <a class="link">
          <img class="icon" src="@/assets/page-games/comp-login/third-twitter.png" />
        </a>
        <span class="line"></span>
        <a class="link">
          <img class="icon" src="@/assets/page-games/comp-login/third-facebook.png" />
        </a>
        <span class="line"></span>
        <a class="link">
          <img class="icon" src="@/assets/page-games/comp-login/third-instagram.png" />
        </a>
        <span class="line"></span>
        <a class="link">
          <img class="icon" src="@/assets/page-games/comp-login/third-5.png" />
        </a>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'LoginByThird',
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
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-login-third {
  $color-blue: #394688;

