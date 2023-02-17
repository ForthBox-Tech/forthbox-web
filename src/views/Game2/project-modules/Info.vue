<template>
  <div class="game-info">
    <ContentSection
      class="introduction"
      :icon="require('@/assets/page-game2/page-collections/icon-intro.png')"
      :title="$t('Game2.Introduction')"
    >
      <template #aside>
        <a
          class="guide"
          v-if="project.WalkthroughUrl"
          :href="project.WalkthroughUrl"
          target="_blank"
        >
          {{ $t('Game2.More') }}
        </a>
      </template>
      <p class="text">
        {{ project.Introduce }}
      </p>
    </ContentSection>
    <ContentSection
      class="rankings"
      :icon="require('@/assets/page-game2/page-collections/icon-ranking.png')"
      :title="$t('Game2.Ranking')"
    >
      <div class="rankings-wrap" v-if="rankings && rankings.length">
        <ul class="rankings-list">
          <li class="order-item" v-for="(item, index) in rankings.slice(0, 10)" :key="item">
            <div class="order-num">
              <img
                :class="['order-img', `order-${index + 1}`]"
                :src="require(`@/assets/page-game2/page-collections/order-${index + 1}.png`)"
              />
            </div>
            <div class="address">{{ item.vUserAddr }}</div>
            <div class="point">
              <span class="tips">{{ $t('Game2.Point') }}:</span>
              <span>{{ item.vPoint }}</span>
            </div>
          </li>
        </ul>
        <ul class="rankings-list">
          <li class="order-item" v-for="(item, index) in rankings.slice(10, 20)" :key="item">
            <div class="order-num">
              <img
                :class="['order-img', `order-${index + 11}`]"
                :src="require(`@/assets/page-game2/page-collections/order-${index + 11}.png`)"
              />
            </div>
            <div class="address">{{ item.vUserAddr }}</div>
            <div class="point">
              <span class="tips">{{ $t('Game2.Point') }}:</span>
              <span>{{ item.vPoint }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="empty" v-else>
        <p>{{ $t('Game2.RankingDataUnavailable') }}</p>
      </div>
      <div class="time">
        <span class="label">{{ $t('Games.TimeOfRankingsStatistics') }}</span>
        <span class="value">{{ now }}</span>
      </div>
    </ContentSection>
  </div>
</template>

<script>
import ContentSection from '../components/ContentSection.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { formatDigits, formatDate } from '@/common/js/utils'

