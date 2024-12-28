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

      total: stakeList.length,
      size: 12,
      current: 1,
    }
  },
  computed: {
    vList() {
      return this.list.map((item) => ({
        key: item.key,
        ended: item.lastNftNum <= 0,
        new: item.tag == 'new',
        images: [require('@/assets/page-defi/forthbox.png')],
        name: item.name,
        details: [
          { label: this.$t('DeFi.Earn'), value: item.earn },
          {
            label: this.$t('DeFi.LockUpTime'),
            value: this.$t('DeFi.Duration', { time: item.duration }),
          },
          { label: this.$t('DeFi.CoinRequired', { Coin: item.coin }), value: item.amount },
        ],
        btnText: item.lastNftNum <= 0 ? this.$t('DeFi.SoldOut') : this.$t('DeFi.Details'),
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
        path: '/defi/staking-detail',
        query: { id: item.key },
      })
    },

    async getList(page = 1) {
      const start = this.size * Math.max(page - 1, 0)
      const end = start + this.size

      this.list = stakeList.slice(start, end)
      this.list.forEach(async (item) => {
        const defiNftAddress = item.defi
        if (!defiNftAddress) return
        const defiContract = new ERC20NFTDeFi(defiNftAddress)
        const nftDefiInfo = await defiContract.getParameters()
        const lastNftNum = item.totalNFTNum - (nftDefiInfo.alreadyStakeNum || 0)
        item.lastNftNum = lastNftNum
      })
    },
    init() {
      this.getList(this.current)
    },
  },
}
</script>

