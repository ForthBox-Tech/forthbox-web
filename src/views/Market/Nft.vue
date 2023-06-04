<template>
  <div class="market-artworks-page">
    <div class="nav-wrap">
      <div class="nav-left">
        <span
          v-for="tab in TABS"
          :key="tab.key"
          :class="{ current: selectedTab === tab.key }"
          @click="changeNav(tab)"
          >{{ $t(tab.name) }}</span
        >
      </div>
      <div class="nav-right">
        <span
          v-for="subTab in SUB_TABS"
          :key="subTab.key"
          :class="{ current: selectedSubTab === subTab.key }"
          @click="changeNavItem(subTab)"
          >{{ $t(subTab.name) }}</span
        >
      </div>
    </div>

    <Collections v-if="selectedSubTab === 'collections'" :scene="selectedSubTab"></Collections>
    <Collections v-if="selectedSubTab == 'onSale'" :scene="selectedSubTab"></Collections>
    <History v-if="selectedSubTab === 'history'"></History>
  </div>
</template>

<script>
// import emitter from '@/common/js/emitter'
import Collections from './NftCollections.vue'
import History from './NftHistory.vue'

const TABS = [
  {
    key: 'nft',
    name: 'NFT',
    subTabs: [
      { key: 'collections', name: 'Market.Collections' },
      { key: 'onSale', name: 'Market.OnSale' },
      { key: 'history', name: 'Market.History' },
    ],
  },
]

const last = {}

export default {
  components: {
    Collections,
    History,
  },
  data() {
    const firstTab = TABS[0]
    const firstSubTab = firstTab.subTabs[0]
    last.tab = firstTab.key
    last.subTab = firstSubTab.key

    return {
      TABS: TABS,
      selectedTab: last.tab,
      selectedSubTab: last.subTab,
    }
  },
  computed: {
    SUB_TABS() {
      const tab = this.TABS.find((tab) => tab.key === this.selectedTab) || {}
      return tab.subTabs || []
    },
  },
  methods: {
    changeNav(tab) {
      this.selectedTab = tab.key
      const firstSubTab = tab.subTabs[0]
      this.selectedSubTab = firstSubTab.key

