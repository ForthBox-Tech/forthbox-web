<template>
  <div>
    <Nav2></Nav2>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'

export default {
  name: 'Promo',
  components: {
    Nav2,
  },
}
</script>

<style lang="scss">
@import './promo.common.scss';
</style>

