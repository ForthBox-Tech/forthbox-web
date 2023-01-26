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

