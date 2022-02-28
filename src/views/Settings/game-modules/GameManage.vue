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

