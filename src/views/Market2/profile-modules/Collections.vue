<template>
  <div class="profile-collections main-panel">
    <div class="search-wrap">
      <Input
        class="search-input"
        :icon="require('@/assets/comp-nav/icon-search.png')"
        :placeholder="$t('Market2.SearchByNameOrContractAddress')"
        v-model.trim="keyword"
        @change="onSearch"
      ></Input>
    </div>
    <RefreshBar ref="refreshBar" :total="total" @refresh="onRefresh"></RefreshBar>
    <div class="layout-grid-list nfts-wrap">
      <NftCard v-for="item in list" :key="item" :nft="item" @click="onItem(item)"></NftCard>
    </div>
    <div class="pagination-wrap" v-if="total > pageSize">
      <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import Pagination from '@/components/Pagination.vue'
import NftCard from '../components/NftCard.vue'
import RefreshBar from '../components/RefreshBar.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { debounce } from '@/common/js/utils'

export default {
  name: 'Collections',
  components: {
    Input,
    Pagination,
    NftCard,
    RefreshBar,
  },
  props: {
    filter: Object,
  },
  data() {
    return {
      keyword: '',

      total: 0,
      pageSize: 12,
      pageNo: 1,

