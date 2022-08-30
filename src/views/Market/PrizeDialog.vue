<template>
  <Dialog class="dialog-market-prize" :visible="visible">
    <main class="main">
      <div class="image-wrap">
        <img class="image" :src="image" :style="imgStyle" />
      </div>
      <div class="tips">
        <div>Congratulations!</div>
        <div>{{ text }}</div>
      </div>
      <Button class="btn-prize" @click="onHide">Get it</Button>
    </main>
  </Dialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'PrizeDialog',
  components: {
    Button,
    Dialog,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    imgStyle: {
      type: String,
      default: '',
    },
  },
  methods: {
    onHide() {
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss">
@import './market.dialog.scss';

.dialog-market-prize {
  .main {
    @include dialog-main();
    box-sizing: border-box;
    padding: 2rem;
    width: 21.45rem;
    text-align: center;
    font-size: 0.9rem;

    @media (max-width: 768.89px) {
      padding: 1rem;
      width: 12rem;
      font-size: 0.65rem;
    }
  }
  .image-wrap {
    position: relative;
    margin: 0 auto;
    padding-top: 100%;
    background-color: #262734;
    box-sizing: border-box;
    border: 0.2rem solid #3d3255;
    border-radius: 0.8rem;
    background: #262734 url('~@/assets/minting/main-bg.png') center center no-repeat;
    background-size: 80%;
    .image {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 90%;
      max-height: 90%;
    }
    @media (max-width: 768.89px) {
      border-width: 0.1rem;
      border-radius: 0.4rem;
    }
  }
  .tips {
    margin: 1.2rem 0;
    line-height: 2;
    @media (max-width: 768.89px) {
      margin: 0.65rem 0;
      line-height: 1.5;
    }
  }
  .btn-prize {
    width: 10.35rem;
    background-color: #efb35c;
    @media (max-width: 768.89px) {
      width: 7rem;
    }
  }
}
</style>

