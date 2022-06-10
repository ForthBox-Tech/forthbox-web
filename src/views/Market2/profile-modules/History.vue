<template>
  <div class="profile-history main-panel">
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
    <div class="table-wrap">
      <table class="table">
        <tr class="theader">
          <th>{{ $t('CompFilter.Amount') }}</th>
          <th>{{ $t('Market2.Item') }}</th>
          <th>{{ $t('CompFilter.Time') }}</th>
          <th>{{ $t('CompFilter.Project') }}</th>
          <th class="center">{{ $t('CompFilter.ContractType') }}</th>
          <th class="center">{{ $t('CompFilter.TransactionType') }}</th>
          <th class="center">{{ $t('CompFilter.Quantity') }}</th>
          <th class="center">{{ $t('CompFilter.TransactionID') }}</th>
        </tr>
        <tr class="row" v-for="item in list" :key="item">
          <td class="fbx">{{ item.TotalPrice }}</td>
          <td>
            <div class="ellipsis">{{ item.TokenName }}</div>
          </td>
          <td>{{ item.CreatedAt }}</td>
          <td class="ellipsis">{{ item.CollectionName }}</td>
          <td class="center">{{ item.ContractType }}</td>
          <td class="center">{{ item.SwapType }}</td>
          <td class="center">{{ item.Amount }}</td>
          <td class="center">
            <a
              class="link"
              v-if="item.TxHash"
              :href="`${BSCSCAN}/tx/${item.TxHash}`"
              target="_blank"
            ></a>
          </td>
        </tr>
      </table>
    </div>
    <div class="pagination-wrap" v-if="total > pageSize">
      <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import Pagination from '@/components/Pagination.vue'
import RefreshBar from '../components/RefreshBar.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { BSCSCAN } from '@/web3/contract.constant'
import { debounce } from '@/common/js/utils'

export default {
  name: 'History',
  components: {
    Input,
    Pagination,
    RefreshBar,
  },
  props: {
    filter: Object,
  },
  data() {
    return {
      BSCSCAN,

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
     * @param swapType 交易类型：PLAN_SELL、PLAN_BUY、SELL、BUY、CANCEL、FIX
     * @param minTimeDelta 最近交易时间（单位：秒）：86400（24h）、604800（7days）、259200（30days）
     */
    async _getList() {
      const filter = this.filter || {}
      const _params = {
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize,
        contractQuery: this.keyword || '',
        ...filter,
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/users/swap_activity/list/query`
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
      this.list = data.List || []

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
// @import '@/common/css/variable.scss';
</style>

