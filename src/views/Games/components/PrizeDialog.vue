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

.dialog-prize {
  .main {
    padding: 5% 0;
    width: 18rem;
    line-height: 1.6;
    font-size: 1rem;
    color: $color-white;
    background: linear-gradient(92deg, #dc00ff 0%, #980fff 100%);
    border: 0.1em solid $color-white;
    border-radius: 1em;
    @media (max-width: 768.89px) {
      width: 15rem;
      font-size: 0.8rem;
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
      right: -1.5rem;
    }
  }
  .title {
    font-size: 1.3em;
  }
  .name {
    margin-top: 0.8em;
    font-size: 0.8em;
  }
  .prize {
    .image {
      display: block;
      margin: 0 auto;
      width: 75%;
    }
  }
  .btn-confirm {
    @include btn-fill-color();
    display: block;
    margin: -1.2em auto 0.6em;
    width: 69%;
    font-size: 0.9em;
    border-radius: 2em;
    @media (max-width: 768.89px) {
      line-height: 3;
      border-radius: 2em;
    }
  }
  .btn-record {
    display: inline-block;
    line-height: 1.3;
    font-size: 0.8em;
    border-bottom: 0.05rem solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>

