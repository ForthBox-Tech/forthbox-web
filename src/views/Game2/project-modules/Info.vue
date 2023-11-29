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

export default {
  name: 'Info',
  components: {
    ContentSection,
  },
  props: {
    projectId: String,
    project: Object,
  },
  data() {
    return {
      rankings: [],
      now: formatDate('YYYY-MM-DD hh:mm:ss', new Date()),
    }
  },
  computed: {
    query() {
      return this.$route.query || {}
    },
  },
  mixins: [initTriggerMixin()],
  methods: {
    async _getRankings() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/rank_list/list/get`
      const params = {
        symbol: this.query.code,
        pageNo: 1,
        pageSize: 20,
      }

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        console.warn(res.msg)
        return
      }

      const data = res.data || {}
      this.rankings = (data.list || []).map((item) => {
        item.vUserAddr = item.UserId
        item.vPoint = formatDigits(item.Score)
        return item
      })
    },
    async init() {
      await this._getRankings()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.game-info {
  padding: 1.5rem 0;
  .introduction {
    .guide {
      position: absolute;
      right: 0;
      bottom: 0;
      line-height: 3.3rem;
      color: $color-black;
      cursor: pointer;
      @media (max-width: 768.89px) {
        line-height: 2.7rem;
        font-size: 0.8rem;
      }
      &:hover {
        color: $color-purple;
      }
      &::before {
        content: '';
        display: inline-block;
        margin-right: 0.5em;
        width: 0.8em;
        height: 1em;
        background: url('~@/assets/page-game2/page-project/icon-guide.png') center center / contain
          no-repeat;
        vertical-align: -0.15em;
      }
    }
    .text {
      line-height: 1.5;
      color: $color-gray;
      font-size: 0.7rem;
      white-space: pre-line;
    }
  }
  .rankings-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5%;
    @media (max-width: 768.89px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
  // .rankings-list {
  // }
  .order-item {
    display: flex;
    align-items: center;
    height: 2.5rem;
    line-height: 1;
    font-size: 0.8rem;
    background-color: #f5f5f5;
    &:nth-child(2n) {
      background-color: #f9f9f9;
    }
    @media (max-width: 768.89px) {
      height: 2.2rem;
      font-size: 0.65rem;
    }
    .order-num {
      width: 5rem;
      text-align: center;
      @media (max-width: 768.89px) {
        width: 2.5rem;
      }
      .order-img {
        display: block;
        margin: 0 auto;
        height: 1rem;
        @media (max-width: 768.89px) {
          height: 0.7rem;
        }
        &.order-1,
        &.order-2,
        &.order-3 {
          height: 1.5rem;
          @media (max-width: 768.89px) {
            height: 1.1rem;
          }
        }
      }
    }
    .point {
      flex: 1;
      text-align: right;
      padding: 0 5% 0 5%;
    }
    .tips {
      color: $color-secondary;
      margin-right: 0.5rem;
      @media (max-width: 768.89px) {
        margin-right: 0.25rem;
      }
    }
  }
  .empty {
    margin: 2.5rem 0;
    text-align: center;
    font-size: 0.9rem;
    color: $color-gray;
    @media (max-width: 768.89px) {
      font-size: 0.8rem;
    }
  }
  .time {
    margin-bottom: -1.5rem;
    line-height: 2.5rem;
    text-align: right;
    font-size: 0.7rem;
    @media (max-width: 768.89px) {
      margin-bottom: -1rem;
      font-size: 0.6rem;
    }
    .label {
      margin-right: 0.5rem;
      color: $color-gray;
    }
  }
}
</style>

