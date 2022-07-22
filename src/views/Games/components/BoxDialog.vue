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

