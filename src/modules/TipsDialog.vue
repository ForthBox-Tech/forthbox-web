<template>
  <Dialog class="dialog-tips" :visible="visible" @hide="onHide">
    <main class="tips-main">
      <header class="tips-header">
        <h1 class="tips-title">
          <slot name="title">Tips</slot>
        </h1>
        <a class="tips-close" @click="onHide"></a>
      </header>
      <section class="tips-content">
        <slot name="content"></slot>
      </section>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'TipsDialog',
  components: {
    Dialog,
  },
  props: ['visible'],
  methods: {
    onHide() {
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss">
.dialog-tips {
  font-weight: normal;
  color: #fff;
  .tips-main {
    width: 30rem;
    background-color: #353644;
    border: 1px solid #444478;
    border-radius: 1.2rem;
    @media (max-width: 768.89px) {
      width: 15rem;
      border-radius: 0.6rem;
    }
  }
  .tips-header {
    position: relative;
    padding: 0 1.5rem;
    @media (max-width: 768.89px) {
      padding: 0 1rem;
    }
    .tips-title {
      padding-top: 0.5rem;
      line-height: 2.9rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.42);
      text-align: left;
      font-size: 0.9rem;
      @media (max-width: 768.89px) {
        padding-top: 0.3rem;
        line-height: 2rem;
        font-size: 0.75rem;
      }
    }
    .tips-close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: inline-block;
      padding: 0.8rem;
      width: 1rem;
      height: 1rem;
      background: url('~@/assets/common/close.png') center center no-repeat;
      background-size: 1rem;
      cursor: pointer;
      @media (max-width: 768.89px) {
        top: 0;
        right: 0;
        padding: 0.6rem;
        background-size: 0.8rem;
      }
    }
  }
  .tips-content {
    padding: 1rem 1.5rem 1.8rem;
    line-height: 2;
    text-align: left;
    font-size: 0.8rem;
    @media (max-width: 768.89px) {
      padding: 0.6rem 1.2rem 1.5rem;
      font-size: 0.6rem;
    }
  }
}
</style>

