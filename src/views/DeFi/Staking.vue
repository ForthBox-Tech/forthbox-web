<template>
  <div class="defi-content">
    <div class="layout-grid-list">
      <DeFiCard v-for="card in vList" :key="card" :card="card" @link="onDetail"></DeFiCard>
    </div>
    <div class="pagination-wrap" v-if="Math.ceil(total / size) > 1">
      <Pagination :total="total" :size="size" :current="current" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import initTriggerMixin from '@/mixins/init-trigger'
import Pagination from '@/components/Pagination.vue'
import DeFiCard from './modules/DeFiCard.vue'
import { STAKING } from '@/models/defi.model'
import ERC20NFTDeFi from '@/web3/ERC20NFTDeFi'

const stakeList = Object.keys(STAKING)
  .map((key) => {
    const item = STAKING[key]
    item.key = key
    return item
  })
  .filter((item) => item.visible)

export default {
  name: 'Staking',
  components: {
    Pagination,
    DeFiCard,
  },
  data() {
    return {
      list: [],

