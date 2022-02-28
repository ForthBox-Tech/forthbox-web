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
import { NFT } from '@/models/defi.model'
import LockERC1155ExchangeNFT from '@/web3/LockERC1155ExchangeNFT'

const nftList = Object.keys(NFT)
  .map((key) => {
    const item = NFT[key]
    item.key = key
    return item
  })
  .filter((item) => item.visible)

export default {
  name: 'NFT',
  components: {
    Pagination,
    DeFiCard,
  },
  data() {
    return {
      list: [],

      total: nftList.length,
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
        name: item.name,
        images: [item.icon],
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
        path: '/defi/nft-detail',
        query: { id: item.key },
      })
    },

    async getList(page = 1) {
      const start = this.size * Math.max(page - 1, 0)
      const end = start + this.size

      this.list = nftList.slice(start, end)
      this.list.forEach(async (item) => {
        const defiNftAddress = item.defi
        if (!defiNftAddress) return
        const defiContract = new LockERC1155ExchangeNFT(defiNftAddress)
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

