<template>
  <div class="market-marketplace">
    <main class="main-wrap2">
      <ul class="graphs">
        <li class="item">
          <img class="anchor" src="@/assets/page-market2/page-marketplace/icon-money.png" />
          <div class="info">
            <div class="name">{{ $t('Market2.TotalTradingVolume') }}</div>
            <div class="value fbx">{{ formatDigits(summary.TotalTxAmount) }}</div>
          </div>
        </li>
        <li class="item">
          <img class="anchor" src="@/assets/page-market2/page-marketplace/icon-count.png" />
          <div class="info">
            <div class="name">{{ $t('Market2.TotalTransactions') }}</div>
            <div class="value">{{ formatDigits(summary.TotalTxNum) }}</div>
          </div>
        </li>
        <li class="item">
          <img class="anchor" src="@/assets/page-market2/page-marketplace/icon-money.png" />
          <div class="info">
            <div class="name">{{ $t('Market2.24hrsTradingVolume') }}</div>
            <div class="value fbx">{{ formatDigits(summary.Recent24hTxAmount) }}</div>
          </div>
        </li>
        <li class="item">
          <img class="anchor" src="@/assets/page-market2/page-marketplace/icon-count.png" />
          <div class="info">
            <div class="name">{{ $t('Market2.24hrsTransactions') }}</div>
            <div class="value">{{ formatDigits(summary.Recent24hTxNum) }}</div>
          </div>
        </li>
      </ul>
      <div class="condition">
        <GameTypeSelector
          class="game-type-selector"
          v-model="gameType"
          @change="onChangeFilter"
        ></GameTypeSelector>
        <ProviderSelector
          class="provider-selector"
          v-model="provider"
          @change="onChangeFilter"
        ></ProviderSelector>
      </div>
      <div class="layout-grid-list">
        <ProjectCard
          class="project-card"
          v-for="item in list"
          :key="item.name"
          :project="item"
          @click="onProject(item)"
        ></ProjectCard>
      </div>
      <div class="pagination-wrap" v-if="total > pageSize">
        <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
      </div>
    </main>
  </div>
</template>

<script>
import GameTypeSelector from './components/GameTypeSelector.vue'
import ProviderSelector from './components/ProviderSelector.vue'
import ProjectCard from '@/modules/ProjectCard.vue'
import Pagination from '@/components/Pagination.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { formatDigits } from '@/common/js/utils'

export default {
  name: 'MarketPlace',
  components: {
    GameTypeSelector,
    ProviderSelector,
    ProjectCard,
    Pagination,
  },
  data() {
    return {
      summary: {},

      gameType: '',
      provider: '',

      total: 0,
      pageSize: 12,
      pageNo: 1,

      list: [],
    }
  },
  mixins: [initTriggerMixin()],
  methods: {
    formatDigits,

    onChangeFilter() {
      this.pageNo = 1
      this._getList()
    },
    onJump(pageNo) {
      this.pageNo = pageNo
      this._getList()
    },

    onProject(project) {
      this.$router.push({
        path: '/market2/marketplace/project',
        query: {
          id: project.ID,
        },
      })
    },

    async _getSummary() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/market_place/swap_order/summary_data/query`
      const params = {}

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        this.summary = {}
        return
      }

      this.summary = res.data || {}
    },
    async _getList() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/collections/get_list`
      const params = {
        category: this.gameType || '',
        type: this.provider || '',
        // isGame: '',
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        this.total = 0
        this.list = []
        console.warn(res.msg)
        return
      }

      const data = res.data || {}
      this.total = data.Total || 0
      this.list = data.List || []
    },
    async init() {
      this.gameType = ''
      this.provider = ''

      this.total = 0
      this.pageNo = 1
      await this._getList()

      await this._getSummary()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.market-marketplace {
  .graphs {
    --template-column-gutters: 4;
    margin: 2.7rem 0 0;
    display: grid;
    grid-template-columns: repeat(var(--template-column-gutters), 1fr);
    gap: 1vw;
    @media (max-width: 768.89px) {
      margin: 1.2rem 0 1rem;
      --template-column-gutters: 2;
    }

    .item {
      @include btn-fill-color();
      position: relative;
      color: $color-white;
      padding: 0.4rem 0.5rem;
    }
    .anchor {
      position: absolute;
      top: 0.45rem;
      left: 0.5rem;
      width: 1.4rem;
      height: 1.4rem;
      cursor: pointer;
      @media (max-width: 768.89px) {
        width: 1rem;
        height: 1rem;
      }
    }
    .info {
      margin: 0.25rem 0.5vw 0.1rem 0;
      text-align: right;
      @media (max-width: 768.89px) {
        margin: 0 0 0 0.1rem;
      }
      .name {
        margin-left: 2rem;
        line-height: 1.8;
        font-size: 0.75rem;
        color: #d2d2d2;
        @media (max-width: 1200px) {
          font-size: 0.65rem;
        }
        @media (max-width: 768.89px) {
          margin-left: 1rem;
          font-size: 0.6rem;
        }
      }
      .value {
        line-height: 1.2;
        padding: 0.2rem 0;
        font-size: 1.6rem;
        font-weight: 500;
        @media (max-width: 1200px) {
          font-size: 1.4rem;
        }
        @media (max-width: 768.89px) {
          font-size: 1rem;
        }
        &.fbx::before {
          content: '';
          margin-right: 0.5rem;
          display: inline-block;
          width: 0.9rem;
          height: 0.9rem;
          background: url('~@/assets/page-market2/page-marketplace/icon-fbx.png') center center /
            contain no-repeat;
          vertical-align: 0;
          @media (max-width: 768.89px) {
            margin-right: 0.3rem;
            width: 0.7rem;
            height: 0.7rem;
          }
        }
      }
    }
  }
  .condition {
    margin: 2.5rem 0 0;
    display: flex;
    @media (max-width: 768.89px) {
      margin: 0.5rem 0 1rem;
      display: block;
    }
    .game-type-selector {
      flex: 1;
      @media (max-width: 768.89px) {
        margin-bottom: 0.2rem;
      }
    }
  }
  .layout-grid-list {
    margin: 0.7rem 0 2rem;
    border-top: 0.05rem solid $color-border;
    padding-top: 1.5rem;
    @media (max-width: 768.89px) {
      padding-top: 1rem;
    }
  }
}
</style>

