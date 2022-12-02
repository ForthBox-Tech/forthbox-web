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
import { STAKING } from '@/models/single-defi.model'
import ERC20LockDefi from '@/web3/ERC20LockDefi'

const stakeList = Object.keys(STAKING)
  .map((key) => {
    const item = STAKING[key]
    item.key = key
    return item
  })
  .filter((item) => item.visible)

export default {
  name: 'FBXStaking',
  components: {
    Pagination,
    DeFiCard,
  },
  data() {
    return {
      list: [],

      total: stakeList.length,
      size: 12,
      current: 1,
    }
  },
  computed: {
    vList() {
      return this.list.map((item) => ({
        key: item.key,
        ended: item.lastNum < 10000.0 || item.isEnd,
        new: item.tag == 'new',
        name: item.name,
        images: [require('@/assets/page-defi/forthbox.png')],
        details: [
          { label: this.$t('DeFi.Earn'), value: item.earn },
          { label: 'APR', value: item.fullBackPro + '%' },
          {
            label: this.$t('DeFi.Lock-up period'),
            value: this.$t('DeFi.Duration', { time: item.duration }),
          },
          { label: this.$t('DeFi.CoinRequired', { Coin: item.coin }), value: item.amountStr },
        ],
        btnText: item.lastNum < 10000.0 ? this.$t('DeFi.SoldOut') : this.$t('DeFi.Details'),
      }))
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    onJump(index) {
      this.current = index
      this.getList(index)
    },

    onDetail(item) {
      this.$router.push({
        path: '/defi/fbx-staking-detail',
        query: { id: item.key },
      })
    },

    async getList(page = 1) {
      const start = this.size * Math.max(page - 1, 0)
      const end = start + this.size

      this.list = stakeList.slice(start, end)
      this.list.forEach(async (item) => {
        const defiContract = new ERC20LockDefi(item.defi)
        const defiInfo = await defiContract.getParameters()
        const lastNum = item.totalNum - (defiInfo.alreadyStakeNum || 0)
        item.lastNum = parseFloat(lastNum).toFixed(2)
        item.startTime = defiInfo.startTime
        item.fullBackPro = defiInfo.fullBackPro
      })
    },
    init() {
      this.getList(this.current)
    },
  },
}
</script>

