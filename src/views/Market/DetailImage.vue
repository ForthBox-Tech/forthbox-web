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

