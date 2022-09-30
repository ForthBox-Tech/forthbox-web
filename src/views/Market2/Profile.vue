<template>
  <div class="market-profile">
    <ProfileSection></ProfileSection>
    <section class="main main-wrap2">
      <FilterFrame
        :filters="filters"
        v-model="filter"
        :getDegreeFilter="getDegreeFilter"
        :getNameFilter="getNameFilter"
      ></FilterFrame>
      <TabsFrame :tabs="tabs" @tab-change="onTabChange">
        <template #Collections><Collections :filter="filter"></Collections></template>
        <template #OnSale><OnSale :filter="filter"></OnSale></template>
        <template #History><History :filter="filter"></History></template>
      </TabsFrame>
    </section>
  </div>
</template>

<script>
import ProfileSection from '@/modules/ProfileSection.vue'
import FilterFrame from './components/FilterFrame.vue'
import TabsFrame from '@/layouts/TabsFrame.vue'
import Collections from './profile-modules/Collections.vue'
import OnSale from './profile-modules/OnSale.vue'
import History from './profile-modules/History.vue'
import {
  FILTER_PRICE,
  FILTER_CONTRACT,
  FILTER_STATUS,
  FILTER_LAST,
  FILTER_NFT_LEVEL,
  FILTER_SWAP_TYPE,
  FILTER_NFT_NAME,
} from './common/filter'

const FILTERS = {
  Collections: [FILTER_CONTRACT, FILTER_NFT_NAME, FILTER_NFT_LEVEL],
  OnSale: [FILTER_PRICE, FILTER_CONTRACT, FILTER_STATUS, FILTER_NFT_NAME, FILTER_NFT_LEVEL],
  History: [
    FILTER_PRICE,
    FILTER_CONTRACT,
    FILTER_LAST,
    FILTER_SWAP_TYPE,
    FILTER_NFT_NAME,
    FILTER_NFT_LEVEL,
  ],
}

export default {
  components: {
    ProfileSection,
    FilterFrame,
    TabsFrame,
    Collections,
    OnSale,
    History,
  },
  data() {
    return {
      filters: [],
      filter: {},

      getDegreeFilter: () => {},
      getNameFilter: () => {},
    }
  },
  computed: {
    tabs() {
      // 使用computed，确保支持多语言切换变化
      return [
        { text: this.$t('Market.Collections'), name: 'Collections' },
        { text: this.$t('Market.OnSale'), name: 'OnSale' },
        { text: this.$t('Market.History'), name: 'History' },
      ]
    },
  },
  methods: {
    onTabChange(tab) {
      this.filters = FILTERS[tab.name]
      if (tab.name === 'Collections') {
        this.getDegreeFilter = this._getCollectionsDegreeFilter
        this.getNameFilter = this._getCollectionsNameFilter
      } else if (tab.name === 'OnSale') {
        this.getDegreeFilter = this._getOnSaleDegreeFilter
        this.getNameFilter = this._getOnSaleNameFilter
      } else if (tab.name === 'History') {
        this.getDegreeFilter = this._getHistoryDegreeFilter
        this.getNameFilter = this._getHistoryNameFilter
      }
    },
    async _getCollectionsDegreeFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/owner_collection_degree/list/get`
      const params = {}

      return await this.$axios.get(url, { params })
    },
    async _getCollectionsNameFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/owner_collection_nft_names/list/get`
      const params = {}

      return await this.$axios.get(url, { params })
    },
    async _getOnSaleDegreeFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/owner_onsale_degree/list/get`
      const params = {}

      return await this.$axios.get(url, { params })
    },
    async _getOnSaleNameFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/owner_onsale_nft_names/list/get`
      const params = {}

      return await this.$axios.get(url, { params })
    },
    async _getHistoryDegreeFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/owner_history_degree/list/get`
      const params = {}

      return await this.$axios.get(url, { params })
    },
    async _getHistoryNameFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/owner_history_nft_names/list/get`
      const params = {}

      return await this.$axios.get(url, { params })
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.market-profile {
  .main {
    display: flex;
    @media (max-width: 768.89px) {
      display: block;
    }
  }
}
</style>
