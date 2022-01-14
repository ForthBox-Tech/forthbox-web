<template>
  <Nav2></Nav2>
  <router-view class="page-game2"></router-view>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'

export default {
  name: 'Game2',
  components: {
    Nav2,
  },
}
</script>

<style lang="scss">
@import './game2.common.scss';

.page-game2 {
  padding-bottom: 3rem;
}
</style>
