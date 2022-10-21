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
</script>

<style lang="scss">
.nft-history-page {
  .history-table {
    width: 100%;
    margin-top: 1.9rem;
    border-collapse: collapse;
    font-size: 0.7rem;
    thead {
      height: 2rem;
      background-color: #48484e;
      th {
        padding: 0.5rem;
      }
      .share {
        text-align: center;
      }
    }
    tr {
      height: 2rem;
      border-bottom: 0.05rem solid #48484e;
      td {
        padding: 0.5rem;
      }
      .amount {
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 0.3rem;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .share {
        text-align: center;
        cursor: pointer;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
      &.buy {
        .amount,
        .directions {
          color: #41ee5a;
        }
      }
      &.sell {
        .amount,
        .directions {
          color: #ec5152;
        }
      }
    }
  }
  .history-list {
    margin-top: 1.2rem;
    .history-block {
      display: flex;
      margin-bottom: 0.5rem;
      padding: 0.9rem 1.1rem;
      font-size: 0.5rem;
      color: #8e909f;
      border-radius: 0.4rem;
      background-color: #343645;
      .content-left {
        .text {
          margin: 0.7rem 0;
          font-size: 0.6rem;
          color: #fff;
        }
        .text-forthbox {
          display: flex;
          align-items: center;
          .icon {
            padding: 0 0.35rem;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.4rem;
            color: #262734;
            border-radius: 0.3rem;
            background-color: #efb35c;
          }
        }
      }
      .content-right {
        flex: 1;
        text-align: right;
        .price-wrap {
          display: flex;
          justify-content: right;
          margin: 1.4rem 0 0.6rem;
          font-size: 0.6rem;
          &.buy {
            color: #41ee5a;
          }
          &.sell {
            color: #ec5152;
          }
          .num {
            font-size: 0.75rem;
            img {
              width: 0.5rem;
              height: 0.5rem;
              margin: 0 0.3rem 0 1.5rem;
              vertical-align: middle;
            }
          }
        }
        .share {
          margin-top: 0.6rem;
          img {
            width: 0.75rem;
            height: 0.75rem;
          }
        }
      }
    }
  }
}
</style>

