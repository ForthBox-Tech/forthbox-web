<template>
  <Nav2></Nav2>
  <router-view class="page-market2"></router-view>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'

export default {
  name: 'Market2',
  components: {
    Nav2,
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
}
</script>

<style lang="scss">
@import './market.common.scss';

.page-market2 {
  padding-bottom: 3rem;
}
</style>
