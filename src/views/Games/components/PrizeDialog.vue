<template>
  <Dialog class="dialog-prize" :visible="visible">
    <main class="main">
      <a class="close" @click="onHide"></a>
      <p class="title">恭喜您获得</p>
      <p class="name">NFT盲盒 x1</p>
      <div class="prize">
        <img class="image" src="@/assets/page-games/dialog-box/box-0.png" />
      </div>
      <Button class="btn-confirm" @click="onConfirm">确认</Button>
      <a class="btn-record" @click="onRecord">领取记录</a>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'PrizeDialog',
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

    onConfirm() {
      this.hide()
    },
    onRecord() {
      this.$emit('record')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

