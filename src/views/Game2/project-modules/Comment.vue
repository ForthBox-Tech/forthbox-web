<template>
  <div class="game-comment" v-bind="$attrs">
    <ContentSection
      class="pool"
      :icon="require('@/assets/page-game2/page-collections/icon-intro.png')"
      :title="$t('Game2.PrizePoolForComments')"
    >
      <template #aside>
        <a class="guide" @click="onGuide"> {{ $t('Games.Guide') }} </a>
      </template>
      <div class="board">
        <div class="item">
          <div class="label">{{ $t('Games.TotalAmountOfCommentPool') }}</div>
          <div class="value">
            <img class="icon" src="@/assets/common/token-fbx.png" />
            <span class="text">{{ pool.totalRewardYet }}</span>
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('Games.ToatalHashrateOfComment') }}</div>
          <div class="value">
            <img class="icon" src="@/assets/page-game2/page-project/icon-hashrate.png" />
            <span class="text">{{ pool.totalSupply }}</span>
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('Games.MyHashrate') }}</div>
          <div class="value">
            <img class="icon" src="@/assets/page-game2/page-project/icon-hashrate.png" />
            <span class="text">{{ pool.balances }}</span>
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('Games.MyRevenue') }}</div>
          <div class="value">
            <img class="icon" src="@/assets/common/token-fbx.png" />
            <span class="text">{{ pool.earned }}</span>
          </div>
        </div>
        <div class="btn-wrap">
          <Button class="btn-claim" loader :disabled="!(pool.earned > 0)" :handler="onClaim">
            {{ $t('Games.Withdraw') }}
          </Button>
        </div>
      </div>
    </ContentSection>
    <ContentSection
      class="comments"
      :icon="require('@/assets/page-game2/page-collections/icon-intro.png')"
      :title="$t('Game2.Comments')"
    >
      <Textarea :placeholder="$t('Games.PleaseEnterTheContents')" v-model="content"></Textarea>
      <div class="choose">
        <span>{{ $t('Games.PleaseChooseYourHam') }}</span>
        <img class="icon" src="@/assets/page-game2/page-project/choose-ham.png" />
        <Select
          class="select"
          :list="hamList"
          v-model="ham"
          :placeholder="$t('Game2.NoValidHam')"
        ></Select>
      </div>
      <div class="operate">
        <div class="">
          <div class="tips">{{ $t('Games.ScoreAndCommentTheGameToGetFbxRewards') }}</div>
          <div class="score-wrap">
            <div class="score">
              <Stars :score="score" @change="onScore"></Stars>
            </div>
            <div>
              <a :class="['btn-like', isPraise ? 'active' : '']" @click="onLike">
                {{ $t('Games.Like') }}
              </a>
              <a :class="['btn-dislike', !isPraise ? 'active' : '']" @click="onDislike">
                {{ $t('Games.Dislike') }}
              </a>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <Button class="btn-send" loader :handler="onSend">{{ $t('Games.Send') }}</Button>
        </div>
      </div>
      <ul class="comment-list">
        <li class="comment-item" v-for="item in comments" :key="item">
          <div class="header">
            <div class="user">{{ item.vUserAddr }}</div>
            <div class="time">{{ item.vTime }}</div>
          </div>
          <div class="main">
            <div class="text">
              {{ item.Content }}
            </div>
            <div class="score">
              <Stars class="stars" :score="item.Score"></Stars>
            </div>
            <div class="like">
              <a class="btn-like active" v-if="item.IsPraise">
                {{ $t('Games.Like') }}
              </a>
              <a class="btn-dislike active" v-else>
                {{ $t('Games.Dislike') }}
              </a>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination-wrap" v-if="total > pageSize">
        <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
      </div>
    </ContentSection>
  </div>
  <GuideDialog ref="guideDialog"></GuideDialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Select from '@/components/Select.vue'
import Pagination from '@/components/Pagination.vue'
import Stars from '@/modules/Stars.vue'
import ContentSection from '../components/ContentSection.vue'
import Textarea from '@/components/Textarea.vue'
import GuideDialog from './GuideDialog.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { transformAddress, formatDate, debounce } from '@/common/js/utils'
import ERC20CommentDefi from '@/web3/ERC20CommentDefi'
import { initNftList } from '@/models/ham.model'

export default {
  name: 'Comment',
  components: {
    Button,
    Select,
    Pagination,
    Stars,
    ContentSection,
    Textarea,
    GuideDialog,
  },
  props: {
    project: Object,
  },
  data() {
    return {
      pool: {
        totalRewardYet: 1000000,
        totalSupply: 0,
        balances: 0,
        earned: 0,
      },

      content: '',

      hamList: [],
      ham: null,

      score: 5,
      isPraise: true,

      total: 0,
      pageSize: 12,
      pageNo: 1,

      comments: [],
    }
  },
  computed: {
    query() {
      return this.$route.query || {}
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  watch: {
    project() {
      this._initContract()
    },
  },
  methods: {
    onGuide() {
      this.$refs.guideDialog.show()
    },

    async onClaim() {
      await this._commentContract.getReward()
      await this._getPool()
    },

    onScore(score) {
      this.score = score
    },
    onLike() {
      this.isPraise = true
    },
    onDislike() {
      this.isPraise = false
    },
    async onSend() {
      const content = (this.content || '').trim()
      if (!content) {
        this.$modal.toast('Comment can not be empty')
        return
      }
      const ham = this.ham || {}
      if (!ham) {
        this.$modal.toast('Please select a ham nft')
        return
      }

      try {
        await this._commentContract.writeComment(content, this.score, this.isPraise, this.ham.token)
      } catch (err) {
        this.$modal.toast(err.message)
        return
      }

      this.content = ''
      this.score = 5
      this.isPraise = true

