<template>
  <div class="nft-history-page">
    <table class="history-table m-v-hide">
      <thead>
        <th>{{ $t('Market.Time') }}</th>
        <th>{{ $t('Market.Item') }}</th>
        <th>ID</th>
        <th>{{ $t('Market.Count') }}</th>
        <th>{{ $t('Market.Directions') }}</th>
        <th>{{ $t('Market.Amount') }}</th>
        <th class="share">{{ $t('Market.ViewOnBscscan') }}</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" :class="item.Action">
          <td>{{ item.TxAt }}</td>
          <td>{{ NftType(item.ContractType) }}</td>
          <td>{{ item.TokenId }}</td>
          <td>{{ item.Count }}</td>
          <td class="directions">{{ item.Action }}</td>
          <td class="amount">
            <img src="@/assets/page-market/drops-price-icon.png" /><span>{{
              Math.floor(item.Amount * 1000) / 1000
            }}</span>
          </td>
          <td class="share">
            <a target="_blank" :href="bscscanUrl + item.TxHash"
              ><img src="@/assets/page-market/nft-share.png"
            /></a>
          </td>
        </tr>
      </tbody>
    </table>
    <ul class="history-list pc-v-hide">
      <li class="history-block" v-for="(item, index) in list" :key="index">
        <div class="content-left">
          <div>
            <div>{{ $t('Market.Item') }}</div>
            <div class="text text-forthbox">
              <div class="layout-flex-auto">{{ NftType(item.ContractType) }}</div>
              <div class="icon">X{{ item.Count }}</div>
            </div>
          </div>
          <div>
            <div>{{ $t('Market.Time') }}</div>
            <div class="text text-forthbox">{{ item.TxAt }}</div>
          </div>
          <div>
            <div>ID {{ item.TokenId }}</div>
          </div>
        </div>
        <div class="content-right">
          <div class="price-wrap" :class="item.Action">
            <div>{{ item.Action }}</div>
            <div class="num">
              <img src="@/assets/page-market/drops-price-icon.png" /><span>{{
                Math.floor(item.Amount * 1000) / 1000
              }}</span>
            </div>
          </div>
          <div>{{ $t('Market.ViewOnBscscan') }}</div>
          <div class="share">
            <a target="_blank" :href="bscscanUrl + item.TxHash"
              ><img src="@/assets/page-market/nft-share.png"
            /></a>
          </div>
        </div>
      </li>
    </ul>
    <div class="pagination-wrap" v-if="Math.ceil(total / size) > 1">
      <Pagination :total="total" :size="size" :current="current" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import emitter from '@/common/js/emitter'
import { getNftByType } from '@/models/market.model'
import { isSupportedChain } from '@/web3/wallet'

export default {
  name: 'NftHistory',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      size: 20,
      current: 1,
      bscscanUrl: 'https://bscscan.com/tx/',
    }
  },
  methods: {
    NftType(type) {
      const nft = getNftByType(type)
      return nft.name
    },
    onJump(index) {
      this.current = index
      this.getHistory()
    },
    //获取交易记录
    getHistory() {
      const url = (process.env.VUE_APP_API_V2_URL || '') + '/artwork/get_history'
      const params = {
        ownerAddr: cWebModel.mAccount,
        pageNo: this.current,
        pageSize: this.size,
      }
      return this.$axios
        .get(url, { params })
        .then((res) => {
          if (res.code != 200) return
          const data = res.data || {}

          // 分页
          const pageInfo = data.page || {}
          this.total = pageInfo.Total || this.total
          this.size = pageInfo.Limit || this.size
          this.current = pageInfo.CurrentPage || this.current

          // 列表
          this.list = data.list || []
        })
        .catch((err) => {
          console.error(err)
        })
    },
    init({ accounts, chainId } = {}) {
      if (!accounts || !accounts.length) {
        return
      }
      if (!isSupportedChain(chainId)) {
        alert('Please change your chain provider to the Binance Smart Chain (or testnet)')
        return
      }
      this.getHistory()
    },
  },
  mounted() {
    emitter.on('connect-wallet', this.init)
    this.$root.connectWallet()
  },
  unmounted() {
    emitter.off('connect-wallet', this.init)
  },
}
