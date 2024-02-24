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

      this.$modal.toast('success')
      await this.init()
    },

    onJump(pageNo) {
      this.pageNo = pageNo
      this._getComments()
    },

    _getHamList() {
      window.cNFTFun.connectToContract()
      window.cFBX_NFTFun.connectToContract()

      return Promise.all([
        window.cNFTFun.tokenOfOwner(),
        window.cFBX_NFTFun.getOwnerStakeTokenIDs(),
      ])
        .then(([hamTokens = [], stakedHamTokens = []]) => {
          const tokens = [...hamTokens, ...stakedHamTokens]
          if (!tokens.length) throw new Error('has not ham')

          return Promise.all([
            initNftList(hamTokens, false),
            initNftList(stakedHamTokens, true),
            this._commentContract.bCommentHamIds(tokens),
          ])
        })
        .then(([hams, stakedHams, commentedHams]) => {
          console.log('_getHamList', hams, stakedHams, commentedHams)
          this.hamList = [...hams, ...stakedHams]
            .map((ham, index) => {
              const token = ham.token
              const level = ham.level.lv

              return {
                text: `Level ${level} #${token}`,
                token,
                level,
                selected: commentedHams[index],
              }
            })
            .filter((ham) => !ham.selected)

          this.ham = this.hamList[0]
        })
        .catch((err) => {
          console.error(err)
          this.hamList = []
          this.ham = null
        })
    },
    async _getPool() {
      let info = {}
      try {
        info = await this._commentContract.getParameters()
      } catch (err) {
        console.error(err)
      }
      this.pool = {
        totalSupply: Math.floor((info.totalSupply || 0) * 1000) / 1000,
        balances: Math.floor((info.balances || 0) * 1000) / 1000,
        earned: Math.floor((info.earned || 0) * 1000) / 1000,
        totalRewardYet: 1000000,
      }
    },
    async _initContract() {
      const commentContractAddr = this.project.CommentContractAddr
      if (commentContractAddr) {
        this._commentContract = new ERC20CommentDefi(commentContractAddr)
        console.log('_initContract', this._commentContract)
        await this._getHamList()
        await this._getPool()
      }
    },

    async _getComments() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/comment/list/get`
      const params = {
        symbol: this.query.code,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        this.total = 0
        this.comments = []
        console.warn(res.msg)
        return
      }

      const data = res.data || {}

      const pageInfo = data.page || {}
      this.total = pageInfo.Total || 0

      this.comments = (data.list || []).map((item) => {
        item.vUserAddr = transformAddress(item.UserAddr)
        item.vTime = formatDate('YYYY-MM-DD hh:mm:ss', new Date(item.CommentTime * 1000))
        return item
      })
    },
    async init() {
      this.content = ''
      this.score = 5
      this.isPraise = true

      this.total = 0
      this.pageNo = 1
      await this._getComments()

      this._initContract()
    },
  },
  created() {
    this._initContract = debounce(this._initContract, 500)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.game-comment {
  padding: 1.5rem 0;
  @media (max-width: 768.89px) {
    padding: 1rem 0;
  }
  .pool {
    padding-right: 0;
    border: 0 none;
    @media (max-width: 768.89px) {
      padding: 0;
    }
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
    .board {
      display: flex;
      align-items: center;
      margin-left: -2.5rem;
      padding: 0.8rem 1rem;
      background-color: $color-white;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.6rem 0.05rem rgba(91, 92, 97, 0.16);
      @media (max-width: 768.89px) {
        flex-wrap: wrap;
        margin-left: 0;
        padding: 0.4rem 0.5rem;
      }
    }
    .item {
      flex: 1;
      box-sizing: border-box;
      padding: 0.6rem 1rem 1rem;
      @media (max-width: 768.89px) {
        flex: none;
        width: 50%;
        padding: 0.5rem;
        text-align: center;
      }
    }
    .label {
      margin-bottom: 0.3rem;
      line-height: 1.5;
      font-size: 1rem;
      color: $color-secondary;
      @media (max-width: 768.89px) {
        font-size: 0.7rem;
      }
    }
    .value {
      font-size: 0;
      .icon {
        margin-right: 1rem;
        height: 2rem;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          margin-right: 0.5rem;
          height: 1rem;
        }
      }
      .text {
        font-size: 1.3rem;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          font-size: 1rem;
        }
      }
    }
    .btn-wrap {
      padding: 0 1rem 0 0;
      @media (max-width: 768.89px) {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
      }
    }
    .btn-claim {
      @include btn-fill-color();
      width: 5.5rem;
      @media (max-width: 768.89px) {
        box-sizing: border-box;
        width: 100%;
      }
    }
  }
  .comments {
    border: 0 none;
    background-color: #f9f9f9;
    @media (max-width: 768.89px) {
      font-size: 0.7rem;
    }
    .choose {
      padding: 0.5rem 0;
      .icon {
        margin: 0 1rem 0 1rem;
        height: 1.35rem;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          margin: 0 0.7rem 0 0.7rem;
          height: 1rem;
          vertical-align: -0.2rem;
        }
      }
      .select {
        display: inline-block;
        width: 11rem;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          margin-top: 0.5rem;
          display: block;
          width: 100%;
        }
      }
    }
    .operate {
      margin: 2rem 0 0;
      display: flex;
      align-items: center;
      @media (max-width: 768.89px) {
        margin: 1rem 0 0;
        display: block;
      }
      .tips {
        font-size: 0.8rem;
        margin-bottom: 0.6rem;
        @media (max-width: 768.89px) {
          font-size: 0.7rem;
        }
      }
      .score-wrap {
        display: flex;
        align-items: center;
        font-size: 0;
      }
      .score {
        flex: 1;
      }
      .btn-wrap {
        flex: 1;
        text-align: right;
        @media (max-width: 768.89px) {
          margin-top: 1rem;
        }
      }
      .btn-send {
        @include btn-fill-color();
        width: 4rem;
        @media (max-width: 768.89px) {
          box-sizing: border-box;
          width: 100%;
        }
      }
    }
    .comment-list {
      margin: 3rem 0 0;
      padding: 3rem 0 0.5rem;
      border-top: 0.05rem solid $color-border;
      @media (max-width: 768.89px) {
        margin: 1rem 0 0;
        padding: 1rem 0 0.3rem;
      }
    }
    .comment-item {
      margin-bottom: 1rem;
      padding: 1.5rem;
      background-color: $color-white;
      border-radius: 0.5rem;
      @media (max-width: 768.89px) {
        margin-bottom: 0.8rem;
        padding: 0.7rem 0.8rem;
      }
      .header {
        display: flex;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        @media (max-width: 768.89px) {
          margin-bottom: 0;
          font-size: 0.7rem;
        }
        .user {
          flex: 1;
        }
        .time {
          color: $color-secondary;
        }
      }
      .main {
        display: flex;
        align-items: center;
        @media (max-width: 768.89px) {
          flex-wrap: wrap;
        }
        .text {
          flex: 1;
          font-size: 0.7rem;
          color: $color-gray;
          @media (max-width: 768.89px) {
            flex: auto;
            width: 100%;
            margin: 0.8rem 0;
          }
        }
        .score {
          margin: 0 2.5rem 0 2.5rem;
          @media (max-width: 768.89px) {
            margin: 0;
            width: 50%;
          }
          .stars {
            display: block;
          }
        }
        .like {
          font-size: 0.8rem;
          color: $color-secondary;
          @media (max-width: 768.89px) {
            font-size: 0.6rem;
            width: 50%;
            text-align: right;
          }
        }
      }
      .btn-like,
      .btn-dislike {
        cursor: default;
        &::before {
          opacity: inherit;
        }
      }
    }
    .btn-like,
    .btn-dislike {
      margin-left: 1.2rem;
      color: $color-secondary;
      font-size: 0.85rem;
      @media (max-width: 768.89px) {
        font-size: 0.7rem;
        width: 50%;
        text-align: right;
      }
      cursor: pointer;
      &::before {
        content: '';
        margin-right: 0.5rem;
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        background: center center / contain no-repeat;
        vertical-align: middle;
        opacity: 0.6;
        @media (max-width: 768.89px) {
          margin-right: 0.3rem;
          width: 0.65rem;
          height: 0.65rem;
        }
      }
      &.active {
        &::before {
          opacity: 1;
        }
      }
    }
    .btn-like {
      &::before {
        background-image: url('~@/assets/page-game2/page-project/btn-like-0.png');
        vertical-align: -0.1rem;
      }
      &.active {
        &::before {
          background-image: url('~@/assets/page-game2/page-project/btn-like.png');
        }
      }
    }
    .btn-dislike {
      &::before {
        background-image: url('~@/assets/page-game2/page-project/btn-dislike-0.png');
      }
      &.active {
        &::before {
          background-image: url('~@/assets/page-game2/page-project/btn-dislike.png');
        }
      }
    }
  }
}
</style>

