<template>
  <div class="profile-collections main-panel">
    <div class="search-wrap">
      <Input
        class="search-input"
        :icon="require('@/assets/comp-nav/icon-search.png')"
        :placeholder="$t('Market2.SearchByNameOrContractAddress')"
        v-model.trim="keyword"
        @change="onSearch"
      ></Input>
    </div>
    <RefreshBar ref="refreshBar" :total="total" @refresh="onRefresh"></RefreshBar>
    <div class="layout-grid-list nfts-wrap">
      <NftCard v-for="item in list" :key="item" :nft="item" @click="onItem(item)"></NftCard>
    </div>
    <div class="pagination-wrap" v-if="total > pageSize">
      <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import Pagination from '@/components/Pagination.vue'
import NftCard from '../components/NftCard.vue'
import RefreshBar from '../components/RefreshBar.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { debounce } from '@/common/js/utils'

export default {
  name: 'Collections',
  components: {
    Input,
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
    onRefresh() {
      this._getList()
    },

    onJump(pageNo) {
      this.pageNo = pageNo
      this._getList()
    },

    onItem(item) {
      this.$router.push({
        path: '/market2/profile/detail',
        query: {
          scene: 'collections',
          contractType: item.contractType,
          contractAddr: item.contractAddr,
          tokenId: item.tokenId,
        },
      })
    },

    async _getList() {
      const filter = this.filter || {}
      const _params = {
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize,
        contractQuery: this.keyword || '',
        ...filter,
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/users/my_nfts`
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
        image: item.CoverUrl,
        level: item.DegreeName,
        invalid: item.ShowStatus == 'OFF',
        status: item.OnSale ? 'on sale' : '',
        name: item.Name,
        tokenId: item.TokenId,
        amount: item.Amount || '',
        unitPrice: '',
        totalPrice: '',
        contractType: item.ContractType,
        contractAddr: item.ContractAddr,
      }))

      this.$refs.refreshBar?.createTimer()
    },
    async init() {
      this.keyword = ''

      this.total = 0
      this.pageNo = 1
      await this._getList()
    },
  },
  created() {
    this.onSearch = debounce(this.onSearch, 500)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.profile-collections {
  .search-select {
    margin-left: 1rem;
    width: 11rem;
  }
}
</style>

