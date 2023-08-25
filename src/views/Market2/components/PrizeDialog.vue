<template>
  <Dialog class="dialog-market-prize" :visible="visible">
    <main class="main">
      <div class="image-wrap">
        <img class="image" :src="prize.image" />
      </div>
      <div class="tips">
        <p class="text">Congratulations!</p>
        <p class="text">
          <small>{{ prize.text }}</small>
        </p>
      </div>
      <Button class="btn-prize" @click="onHide">Get it</Button>
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
  props: {},
  data() {
    return {
      visible: false,
      prize: {},
    }
  },
  methods: {
    hide() {
      this.visible = false
    },
    show(prize) {
      this.visible = true
      this.prize = prize
    },

    onHide() {
      this.hide()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-market-prize {
  .main {
    box-sizing: border-box;
    padding: 1.65em 1.6em;
    width: 16rem;
    text-align: center;
    font-size: 0.9rem;
    border-radius: 1em;
    background-color: $color-white;

    @media (max-width: 768.89px) {
      width: 13rem;
      font-size: 0.7rem;
    }
  }
  .image-wrap {
    position: relative;
    margin: 0 auto;
    padding-top: 100%;
    box-sizing: border-box;
    border: 0.05rem solid lighten($color-border, 6);
    border-radius: 0.8em;
    background: $color-placeholder url('~@/assets/common/token-fbx-gray.png') center center / 40%
      no-repeat;
    .image {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 90%;
      max-height: 90%;
    }
  }
  .tips {
    margin: 1em 0;
    line-height: 1.4;
    .text:not(:last-child) {
      margin-bottom: 0.3em;
    }
  }
  .btn-prize {
    @include btn-fill-color();
    width: 10.35rem;
    @media (max-width: 768.89px) {
      width: 7rem;
    }
  }
}
</style>

