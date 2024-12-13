<template>
  <div class="settings-game-manage settings-content">
    <nav class="navs">
      <a
        v-for="item in navs"
        :key="item"
        :class="['btn-nav', current == item ? 'active' : '']"
        @click="onNav(item)"
      >
        {{ item.text }}
      </a>
    </nav>

    <component :is="current.name"></component>
  </div>
</template>

<script>
import ManageBaseInfo from './ManageBaseInfo.vue'
import ManageNftMarket from './ManageNftMarket.vue'
import ManageGameCenter from './ManageGameCenter.vue'

export default {
  components: {
    ManageBaseInfo,
    ManageNftMarket,
    ManageGameCenter,
  },
  props: {
    game: Object,
  },
  data() {
    return {
      navs: [
        { text: this.$t('MyGames.GeneralInformation'), name: 'ManageBaseInfo' },
        { text: this.$t('MyGames.NFTMarketInformation'), name: 'ManageNftMarket' },
        { text: this.$t('MyGames.GameCenterInformation'), name: 'ManageGameCenter' },
      ],
      current: null,
    }
  },
  watch: {
    game(newVal) {
      this.init(newVal)
    },
  },
  methods: {
    onNav(nav) {
      this.current = nav
    },

    init() {
      this.current = this.navs[0]
    },
  },
  created() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-game-manage {
  .navs {
    margin: 0 0 1rem 0;
  }
  .btn-nav {
    display: inline-block;
    margin-right: 1.5rem;
    padding: 0 1rem;
    line-height: 2.6rem;
    font-size: 0.9rem;
    background-color: #f2f5f7;
    cursor: pointer;
    &:hover,
    &.active {
      color: $color-white;
      background-color: $color-blue;
    }
  }
}
</style>
