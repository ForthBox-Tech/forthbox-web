<template>
  <div class="defi-content">
    <div class="layout-grid-list">
      <DeFiCard v-for="card in vList" :key="card" :card="card" @link="onDetail"></DeFiCard>
    </div>
  </div>
</template>

<script>
import { LPFARM } from '@/models/defi.model'
import DeFiCard from './modules/DeFiCard.vue'

const farmList = Object.keys(LPFARM).map((key) => {
  const item = LPFARM[key]
  item.key = key
  return item
})

export default {
  name: 'LPFarm',
  components: {
    DeFiCard,
  },
  data() {
    return {
      list: farmList,
    }
  },
  computed: {
    vList() {
      return this.list.map((item) => ({
        key: item.key,
        ended: item.isEnd,
        new: false,
        name: this.$t(item.name),
        images: item.images,
        details: [
          { label: this.$t('DeFi.Earn'), value: item.earn },
          {
            label: this.$t('DeFi.TimeRemaining'),
            value: this.$t('DeFi.Duration', { time: item.time }),
          },
          { label: this.$t('DeFi.LockUpTime'), value: this.$t(item.lockUpTime) },
          { label: this.$t('DeFi.RewardPool'), value: item.amount },
        ],
        btnText: this.$t('DeFi.Details'),
      }))
    },
  },
  methods: {
    onDetail(item) {
      this.$router.push({
        path: '/defi/lp-farm-detail',
        query: { id: item.key },
      })
    },
  },
  mounted() {},
}
</script>

