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

  .main {
    position: relative;
    padding: 0 1.2em 2em;
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
      padding: 0 1em 1.2em;
      width: 16em;
      font-size: 0.8rem;
    }
  }
  .title {
    margin-top: 0.4em;
    line-height: 2.7;
    font-size: 1.3em;
  }
  .link {
    display: inline-block;
    margin: 0.3em 0.8em;
    padding: 0.7em;
    border-radius: 0.5em;
    vertical-align: middle;
    cursor: pointer;
    .icon {
      display: block;
      height: 2em;
    }
    &:hover {
      background-color: $color-blue;
    }
  }
  .line {
    display: inline-block;
    height: 1.3em;
    width: 0.05rem;
    background-color: rgba($color-border, 0.5);
    vertical-align: middle;
    @media (max-width: 768.89px) {
      &:nth-child(6) {
        display: none;
      }
    }
  }
}
</style>

