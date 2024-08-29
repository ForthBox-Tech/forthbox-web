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

      last.tab = this.selectedTab
      last.subTab = this.selectedSubTab
    },
    changeNavItem(subTab) {
      this.selectedSubTab = subTab.key
      last.subTab = this.selectedSubTab
    },
  },
}
</script>

<style lang="scss">
.market-artworks-page {
  .nav-wrap {
    margin: -1rem 0 1.5rem;
    display: flex;
    .current {
      color: #efb35c;
    }
    .nav-left {
      flex: 1;
      font-size: 1.2rem;
      span {
        margin-right: 1.2rem;
        cursor: pointer;
        &.current {
          border-bottom: 0.1rem solid #efb35c;
        }
      }
    }
    .nav-right {
      font-size: 0.9rem;
      span {
        margin-left: 0.5rem;
        padding-right: 0.5rem;
        cursor: pointer;
        &:not(:last-child) {
          border-right: 0.05rem solid #5a5c66;
        }
      }
    }
    @media (max-width: 768.89px) {
      margin: 0 0 0.7rem;
      .nav-left {
        font-size: 0.7rem;
        span {
          &.current {
            border-bottom: 0.05rem solid #efb35c;
          }
        }
      }
      .nav-right {
        font-size: 0.6rem;
      }
    }
  }
}
</style>
