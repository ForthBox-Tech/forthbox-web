<template>
  <Nav2></Nav2>
  <router-view class="page-admin"></router-view>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'

export default {
  name: 'Admin',
  components: {
    Nav2,
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.page-admin {
  padding-bottom: 3rem;
}
</style>

