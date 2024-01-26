<template>
  <div class="market-place-page">
    <div class="filter-wrap">
      <div class="row-filter">
        <div class="filter-btn" @click="filterVisible = !filterVisible">
          {{ $t('Market.Filters') }}
        </div>
        <div class="sort-btn" @click="sortVisible = !sortVisible">
          <span>{{ $t('Market.Sort') }}</span>
          <span class="sort-icon" :class="{ reverse: sortVisible }"></span>
        </div>
      </div>
      <ul class="row-filter-list" v-if="sortVisible">
        <li
          :class="{ active: item.type == sortType }"
          v-for="item in sortList"
          :key="item.type"
          @click="onSort(item.type)"
        >
          {{ $t(item.name) }}
        </li>
      </ul>
      <ul class="row-filter-list" v-if="filterVisible">
        <li
          :class="{ active: item.type == filterType }"
          v-for="item in filterList"
          :key="item.type"
          @click="onFilter(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="row-filter-list" v-if="degreeVisible && Object.keys(degreeList).length">
        <li
          :class="{ active: key == degreeType }"
          v-for="(type, key) in degreeList"
          :key="key"
          @click="onDegreeType(key)"
        >
          {{ type }}
        </li>
      </ul>
    </div>
    <div class="detail-list">
      <router-link
        class="detail-block"
        v-for="item in list"
        :key="item.tokenId + item.type"
        :to="{
          path: '/market/market-place-detail',
          query: { id: item.tokenId, type: item.type },
        }"
      >
        <div class="logo-wrap">
          <img :src="item.image" />
        </div>
        <div class="name-wrap">
          <div class="place-name">{{ item.showName }}</div>
          <div class="grade">X{{ item.amount }}</div>
        </div>
        <div class="price-list">
          <div class="price-inline">
            <div class="price-name">{{ $t('Market.Unitprice') }}</div>
            <div class="price">{{ item.price }}</div>
          </div>
          <div class="price-inline">
            <div class="price-name">{{ $t('Market.TotalPrice') }}</div>
            <div class="price">{{ item.totalPrice }}</div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="pagination-wrap" v-if="Math.ceil(total / size) > 1">
      <Pagination :total="total" :size="size" :current="current" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import { NFTS, formatMarketNft } from '@/models/market.model'
import { SnapshotHelper } from '@/helpers/snapshot.helper'

const SORTS = {
  1: 'Market.TimeDown',
  2: 'Market.TotalPriceUp',
  3: 'Market.TotalPriceDown',
  4: 'Market.UnitPriceUp',
  5: 'Market.UnitPriceDown',
}
const sortList = Object.keys(SORTS).map((key) => ({
  type: key,
  name: SORTS[key],
}))

export default {
  name: 'MarketPlace',
  components: { Pagination },
  data() {
    const data = {
      sortVisible: false,
      sortList,
      sortType: '',

      filterVisible: false,
      filterList: NFTS,
      filterType: '',

      degreeVisible: false,
      degreeList: {},
      degreeType: '',

      list: [],

      total: 0,
      size: 12,
      current: 1,
    }

    SnapshotHelper.create('Market.MarketPlace', data, this)

    return data
  },
  methods: {
    onJump(index) {
      this.current = index
      this.getList({
        pageNo: index,
        filterType: this.filterType,
        orderType: this.sortType,
        degreeType: this.degreeType,
      })
    },

    onSort(type) {
      this.sortType = type && type == this.sortType ? '' : type
      this.getList({
        filterType: this.filterType,
        orderType: this.sortType,
        degreeType: this.degreeType,
      })
    },

    onFilter(item) {
      const type = item.type
      this.filterType = type && type == this.filterType ? '' : type

      this.degreeVisible = !!this.filterType
      this.degreeList = item.degreeTypes || {}
      this.degreeType = ''

      this.getList({ filterType: this.filterType, orderType: this.sortType })
    },

    onDegreeType(type) {
      this.degreeType = type && type == this.degreeType ? '' : type
      this.getList({
        filterType: this.filterType,
        orderType: this.sortType,
        degreeType: this.degreeType,
      })
    },

    //获取market列表
    getList({
      pageNo = 1,
      orderType = this.sortType,
      filterType = this.filterType || '',
      degreeType = '',
    } = {}) {
      const url = (process.env.VUE_APP_API_V2_URL || '') + '/market/get_list'
      const params = {
        filterType,
        orderType, // 排序方式：1-时间倒序、2-总价顺序、3-总价倒序、4-单价顺序、5-单价倒序
        degreeType,
        pageSize: this.size || 15,
        pageNo: pageNo || 1,
      }
      return this.$axios
        .get(url, { params })
        .then((res) => {
          if (res.code != 200) return
          const data = res.data || {}

          // 分页
          const pageInfo = data.page || {}
          this.total = pageInfo.Total || 0
          this.size = pageInfo.Limit || 15
          this.current = pageInfo.CurrentPage || 1

          // 列表
          this.list = (data.list || []).map((item) => formatMarketNft(item)).filter((item) => item)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
  mounted() {
    if (!this._history_back) {
      this.getList()
    }
    this.$root.connectWallet()
  },
  unmounted() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/market/market-place-detail') {
        if (SnapshotHelper.restore()) {
          vm._history_back = true
        }
      }
    })
  },
  beforeRouteLeave(to, from) {
    if (to.path === '/market/market-place-detail') {
      SnapshotHelper.save()
    }
  },
}
</script>

<style lang="scss">
// .market-place-page {
// }
</style>

