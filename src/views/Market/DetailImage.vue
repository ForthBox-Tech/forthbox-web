<template>
  <section class="market-detail-image">
    <img class="image" :src="image" />
    <div class="stamp" v-if="stamp">{{ stamp }}</div>
  </section>
</template>

<script>
export default {
  name: 'DetailImage',
  props: {
    image: {
      type: String,
      default: '',
    },
    stamp: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
@import './market.detail.scss';

.market-detail-image {
  @include layout-flex();
  position: relative;
  background: #262734 url('~@/assets/minting/main-bg.png') center center no-repeat;
  background-size: auto 80%;
  border: 0.1rem solid #545e91;
  text-align: center;
  overflow: hidden;
  @media (max-width: 768.89px) {
    width: 85vw;
    height: 85vw;
    margin: 1.2rem auto;
    border-radius: 0.6rem;
    border-width: 0.05rem;
  }
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
  .image {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  .stamp {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 2.5rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
    background-color: rgba(0, 0, 0, 0.3);
    @media (max-width: 768.89px) {
      font-size: 2rem;
    }
  }
}
</style>

