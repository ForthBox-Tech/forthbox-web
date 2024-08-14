<template>
  <div class="market-marketplace-project page-wrap2">
    <ProjectSection :projectId="$route.query.id"></ProjectSection>
    <section class="main main-wrap2">
      <FilterFrame
        :filters="filters"
        v-model="filter"
        :getDegreeFilter="getDegreeFilter"
        :getNameFilter="getNameFilter"
      ></FilterFrame>
      <TabsFrame :tabs="tabs" @tab-change="onTabChange">
        <template #Items><Items :filter="filter"></Items></template>
        <template #Activity><Activity :filter="filter"></Activity></template>
      </TabsFrame>
    </section>
  </div>
</template>

<script>
import ProjectSection from '@/modules/ProjectSection.vue'
import FilterFrame from './components/FilterFrame.vue'
import TabsFrame from '@/layouts/TabsFrame.vue'
import Items from './marketplace-modules/Items.vue'
import Activity from './marketplace-modules/Activity.vue'
import { FILTER_PRICE, FILTER_CONTRACT, FILTER_NFT_LEVEL, FILTER_NFT_NAME } from './common/filter'

const FILTERS = {
  Items: [FILTER_PRICE, FILTER_CONTRACT, FILTER_NFT_NAME, FILTER_NFT_LEVEL],
  Activity: [FILTER_PRICE, FILTER_CONTRACT],
}

export default {
  components: {
    ProjectSection,
    FilterFrame,
    TabsFrame,
    Items,
    Activity,
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
        { text: this.$t('Market2.Items'), name: 'Items' },
        { text: this.$t('Market2.Activity'), name: 'Activity' },
      ]
    },
  },
  methods: {
    onTabChange(tab) {
      this.filters = FILTERS[tab.name]
      this.getDegreeFilter = this._getDegreeFilter
      this.getNameFilter = this._getNameFilter
    },
    async _getDegreeFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/collection_degree/list/get`
      const params = {
        collectionId: this.$route.query.id || '',
      }

      return await this.$axios.get(url, { params })
    },
    async _getNameFilter() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/collection_nft_names/list/get`
      const params = {
        collectionId: this.$route.query.id || '',
      }

      return await this.$axios.get(url, { params })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.market-marketplace-project {
  .main {
    display: flex;
    @media (max-width: 768.89px) {
      display: block;
    }
  }
}
</style>
