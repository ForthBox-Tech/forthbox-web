<template>
  <div class="marketplace-items main-panel">
    <div class="search-wrap">
      <Input
        class="search-input"
        :icon="require('@/assets/comp-nav/icon-search.png')"
        :placeholder="$t('Market2.SearchByNameOrContractAddress')"
        v-model.trim="keyword"
        @change="onSearch"
      ></Input>
      <Select class="search-select" :list="SORT" v-model="sort" @change="onSort"></Select>
    </div>
    <RefreshBar ref="refreshBar" :total="total" @refresh="onRefresh"></RefreshBar>
    <div class="layout-grid-list nfts-wrap">
      <NftCard
        v-for="item in list"
        :key="item"
        :cartEnable="!item.isOwner"
        :nft="item"
        @click="onItem(item)"
      ></NftCard>
    </div>
    <div class="pagination-wrap" v-if="total > pageSize">
      <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import Pagination from '@/components/Pagination.vue'
import NftCard from '../components/NftCard.vue'
import RefreshBar from '../components/RefreshBar.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { debounce } from '@/common/js/utils'
import emitter from '@/common/js/emitter'
import { SORT } from '../common/filter'

export default {
  components: {
    Input,
    Select,
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

      SORT,
      sort: SORT[0],

      total: 0,
      pageSize: 12,
      pageNo: 1,

      list: [],
    }
  },
  mixins: [initTriggerMixin()],
  watch: {
    filter() {
      this.pageNo = 1
      this._getList()
    },
  },
  methods: {
    onSearch() {
      this.pageNo = 1
      this._getList()
    },
    onSort() {
      this.pageNo = 1
      this._getList()
    },
    onRefresh() {
      this._getList()
    },

    onJump(pageNo) {
      this.pageNo = pageNo
      this._getList()
    },

    onItem(item) {
      this.$router.push({
        path: '/market2/marketplace/detail',
        query: {
          swapId: item.swapId,
        },
      })
    },

    /**
     * 拉取NFT列表
     * @param pageNo 页码：从1开始
     * @param contractQuery 合约名称或地址
     * @param orderByType 排序：0-时间降序，1-单价降序，2-单价升序，3-总价降序，4-总价升序
     * @param erc20Type 币种类型：FBX、USDC
     * @param contractType 合约类型：ERC1155、ERC721
     * @param minPrice 最小价格
     * @param maxPrice 最大价格
     * @param degreeName 等级
     */
    async _getList() {
      const filter = this.filter || {}
      const _params = {
        collectionId: this.$route.query.id,
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize,
        contractQuery: this.keyword || '',
        orderByType: (this.sort && this.sort.value) || '',
        ...filter,
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/market_place/swap_order/list/query`
      const params = new URLSearchParams()
      Object.keys(_params).forEach((key) => {
        params.append(key, _params[key])
      })

      const res = await this.$axios.post(url, params)
      if (res.code != 200) {
        this.total = 0
        this.list = []
        console.warn(res.msg)
        return
      }

      const data = res.data || {}
      this.total = data.Total || 0
      this.list = (data.List || []).map((item) => ({
        image: item.TokenCoverUrl,
        level: item.TokenDegreeName + (item.TokenLevel ? `-${item.TokenLevel}` : ''),
        invalid: item.ShowStatus == 'OFF',
        // status: '',
        name: item.TokenName,
        tokenId: item.TokenId,
        swapId: item.SwapId,
        amount: item.Amount,
        unitPrice: item.UnitPrice,
        totalPrice: item.TotalPrice,
        contractType: item.ContractType,
        contractAddr: item.ContractAddr,
        erc20Addr: item.Erc20Addr,
        isOwner: Number(item.OwnerAddr) == Number(this.$root.userWallet),
      }))

      this.$refs.refreshBar?.createTimer()
    },
    async init() {
      this.keyword = ''
      this.sort = SORT[0]

      this.total = 0
      this.pageNo = 1
      await this._getList()
    },
  },
  created() {
    this.onSearch = debounce(this.onSearch, 500)

    emitter.on('cart-flush', () => this._getList)
  },
  unmounted() {
    emitter.off('cart-flush', () => this._getList)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.marketplace-items {
  .nfts-wrap {
    --template-column-gutters-base: 0.8rem;
  }
}
</style>
