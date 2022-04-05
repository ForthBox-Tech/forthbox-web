<template>
  <div class="nft-collections-page">
    <div
      class="detail-list"
      v-if="nftTokenList.length > 0"
      :class="{ 'sale-page': scene === 'onSale' }"
    >
      <div
        class="detail-block"
        v-for="(info, index) in nftTokenList"
        :key="index"
        @click="onDetail(info.tokenId, info.type)"
      >
        <div class="logo-wrap">
          <img :src="info.image" />
        </div>
        <div class="name-wrap">
          <div class="place-name">{{ info.showName }}</div>
          <div class="grade">X{{ info.amount }}</div>
        </div>
      </div>
    </div>
    <div class="pagination-wrap" v-if="Math.ceil(total / size) > 1">
      <Pagination :total="total" :size="size" :current="current" @jump="onJump"></Pagination>
    </div>
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script>
import emitter from '@/common/js/emitter'
import Pagination from '@/components/Pagination.vue'
import Loading from '@/components/Loading.vue'
import { NFTS } from '@/models/market.model'
import { isSupportedChain } from '@/web3/wallet'

export default {
  name: 'NftCollections',
  components: {
    Pagination,
    Loading,
  },
  props: {
    scene: {
      type: String,
      default: 'collections', // collections | onSale
    },
  },
  data() {
    return {
      loading: false,

      // _list: [],
      nftTokenList: [],
      total: 0,
      size: 12,
      current: 1,
    }
  },
  methods: {
    async onJump(index) {
      this.loading = true

      this.current = index
      await this.getList(index)

      this.loading = false
    },
    onDetail(tokenId, type) {
      let path = '/market/nft-collections-detail'
      this.$router.push({
        path,
        query: {
          id: tokenId,
          type,
          scene: this.scene,
        },
      })
    },

    // 获取指定页的列表
    async getList(page = 1) {
      this.nftTokenList = []

      const start = (page - 1) * this.size
      const end = start + this.size
      const pageList = this._list.slice(start, end)

      for (let i = 0; i < pageList.length; i++) {
        const tokenItem = pageList[i]
        this.nftTokenList[i] = await tokenItem.getTokenUri()
      }
    },
    // 初始化列表数据
    async initList() {
      this._list = []
      for (let i = 0; i < NFTS.length; i++) {
        const nftItem = NFTS[i]
        const list = await nftItem.getTokens(nftItem, this.scene)
        this._list = this._list.concat(list)
      }
      this.total = this._list.length
    },
    async init({ accounts, chainId } = {}) {
      if (!accounts || !accounts.length) {
        return
      }
      if (!isSupportedChain(chainId)) {
        alert('Please change your chain provider to the Binance Smart Chain (or testnet)')
        return
      }

      await this.initList()
      await this.onJump(1)
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
</script>

<style lang="scss">
// .nft-collections-page {
// }
</style>

