<template>
  <Dialog class="dialog-box" :visible="visible">
    <main class="main">
      <img class="bg-box box-0" src="@/assets/page-games/dialog-box/box-0.png" />
      <img class="bg-box box-1" src="@/assets/page-games/dialog-box/box-1.png" />
      <img class="bg-box box-2" src="@/assets/page-games/dialog-box/box-2.png" />
      <img class="bg-box box-3" src="@/assets/page-games/dialog-box/box-3.png" />
      <img class="bg-box box-4" src="@/assets/page-games/dialog-box/box-4.png" />
      <a class="close" @click="onHide"></a>
      <div class="inner">
        <p class="title">恭喜您获得一次盲盒抽奖</p>
        <p class="desc">有几率获得NFT、金币、FBX、NFT盲盒等等</p>
        <Button class="btn-draw" loader :handler="onDraw">抽取盲盒</Button>
        <div class="rules">
          <p class="rule-title">抽奖规则</p>
          <p class="rule">1.每破一次记录可获得抽奖1次，可参与ForthBox平台盲盒抽奖。</p>
          <p class="rule">2.每款游戏通关10局以上获得抽奖1次，可参与ForthBox平台盲盒抽奖。</p>
        </div>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'BoxDialog',
  components: {
    Dialog,
    Button,
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

    async onDraw() {
      await new Promise((resolve) => {
        setTimeout(() => {
          this.$emit('success')
          this.hide()
          resolve()
        }, 1000)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-box {
  .main {
    position: relative;
    width: 26rem;
    height: 20.5rem;
    line-height: 1.6;
    font-size: 1rem;
    color: $color-white;
    background: url('~@/assets/page-games/dialog-box/box-bg.png') center center / contain no-repeat;
    @media (max-width: 768.89px) {
      width: 18rem;
      height: 15.2rem;
      font-size: 0.75rem;
    }
  }
  .close {
    position: absolute;
    top: -1.5rem;
    right: -2rem;
    z-index: 10;
    display: block;
    width: 2rem;
    height: 2rem;
    background: url('~@/assets/page-games/common/close.png') center center / 1.2rem no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      right: -0.1rem;
    }
  }
  .bg-box {
    position: absolute;
    &.box-0 {
      width: 50%;
      left: 49%;
      top: -24%;
      transform: translateX(-50%);
    }
    &.box-1 {
      width: 19%;
      left: -3%;
      top: -3%;
    }
    &.box-2 {
      width: 16%;
      top: -11%;
      left: 17%;
    }
    &.box-3 {
      width: 18%;
      top: -23%;
      right: 19%;
    }
    &.box-4 {
      width: 20%;
      top: -3%;
      right: 0%;
    }
  }
  .inner {
    padding: 24.6% 6% 5% 4.1%;
    @media (max-width: 768.89px) {
      padding-top: 19.5%;
    }
    .title {
      font-size: 1.3em;
    }
    .desc {
      font-size: 0.8em;
    }
    .btn-draw {
      @include btn-fill-color();
      margin: 2.2em 0 1em;
      width: 69%;
      font-size: 0.9em;
      border-radius: 2em;
      @media (max-width: 768.89px) {
        margin: 1em 0 0.8em;
        width: 60%;
        line-height: 3;
        border-radius: 2em;
      }
    }
    .rules {
      padding: 0 1em;
      text-align: left;
    }
    .rule-title {
      font-size: 0.8em;
    }
    .rule {
      font-size: 0.7em;
    }
  }
}
</style>

