<template>
  <Nav2></Nav2>
  <router-view class="page-settings"></router-view>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'

export default {
  name: 'Settings',
  components: {
    Nav2,
  },
}
</script>

<style lang="scss">
@import './settings.common.scss';

.page-settings {
  padding-bottom: 3rem;
}
</style>

