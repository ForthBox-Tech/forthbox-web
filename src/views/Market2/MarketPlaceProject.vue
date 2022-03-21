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

