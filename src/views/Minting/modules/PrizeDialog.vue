<template>
  <Dialog class="dialog-prize" :visible="visible">
    <main class="prize-main">
      <a class="close" @click="onClose"></a>
      <div class="img-wrap">
        <img class="img" :src="prize.image" />
      </div>
      <div class="text-wrap">
        <p v-for="text in prize.texts" :key="text">{{ text }}</p>
      </div>
      <div class="btn-wrap">
        <Button class="btn-receive" @click="onClose">Get</Button>
      </div>
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
  props: {
    visible: Boolean,
    prize: Object,
  },
  methods: {
    onClose() {
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss">
.dialog-prize {
  .prize-main {
    position: relative;
    background-color: #353644;
    border: 1px solid #444478;
    border-radius: 1.2rem;
    padding: 1.3rem;
  }
  .close {
    position: absolute;
    top: -1.5rem;
    right: -1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    background: url('~@/assets/common/close.png') center center no-repeat;
    background-size: 1rem;
    cursor: pointer;
    @media (max-width: 768.89px) {
      top: -1.2rem;
      right: -1.2rem;
      background-size: 0.9rem;
    }
  }
  .img-wrap {
    margin: 0 auto;
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    text-align: center;
    font-size: 0;
    background: #262734 url('~@/assets/minting/prize-bg.png') center center no-repeat;
    background-size: 80%;
    border-radius: 0.8rem;
    box-shadow: 0 0 0.5rem 0.25rem #462c66;
    .img {
      max-width: 100%;
      max-height: 100%;
    }
    @media (max-width: 768.89px) {
      width: 11rem;
      height: 11rem;
    }
  }
  .text-wrap {
    margin: 1.2rem 0 0.8rem;
    line-height: 1.6;
    font-size: 0.9rem;
    color: #fff;
    @media (max-width: 768.89px) {
      font-size: 0.8rem;
    }
  }
  .btn-wrap {
    margin: 1.2rem 0 0.4rem;
    .btn-receive {
      display: inline-block;
      padding: 0 1.5rem;
      line-height: 2rem;
      min-width: 3rem;
      text-align: center;
      font-size: 0.75rem;
      color: #353644;
      background-color: #efb35c;
      border-radius: 2rem;
      cursor: pointer;
    }
  }
}
</style>

