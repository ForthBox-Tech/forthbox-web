<template>
  <GamesNav></GamesNav>
  <router-view class="page-games"></router-view>
</template>

<script>
import GamesNav from './components/GamesNav.vue'

export default {
  name: 'Games',
  components: {
    GamesNav,
  },
}
</script>

<style lang="scss">
@import './games.common.scss';

.page-games {
  padding-bottom: 3rem;
}
</style>
