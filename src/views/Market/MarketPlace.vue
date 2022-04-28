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

