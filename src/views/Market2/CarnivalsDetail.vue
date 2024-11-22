<template>
  <div class="market-carnivals-detail page-wrap2">
    <section class="main main-wrap2">
      <DetailImage class="cover" :image="activity.image"></DetailImage>
      <DetailBoard class="info" :name="activity.name" :tags="tags">
        <div class="box">
          <div class="price">
            <div class="label">{{ $t('CompFilter.Price') }}</div>
            <div class="value">
              <img class="icon" :src="activity.tokenLogo" />
              <span class="text">{{ activity.price }}</span>
              <span class="unit">{{ activity.token }}</span>
            </div>
          </div>
          <div class="btns-wrap">
            <Button
              class="btn-color btn-buy"
              :disabled="!activity.isPurchasable"
              loader
              :handler="onBuy"
            >
              <img class="icon" src="@/assets/page-market2/comp-detail/btn-buy.png" />
              <span>{{ $t('Carnival2.Buy') }}</span>
            </Button>
            <Button
              class="btn-stroke btn-open"
              :disabled="activity.ownCount <= 0"
              loader
              :handler="onOpen"
            >
              <img
                class="icon"
                :src="
                  activity.ownCount <= 0
                    ? require('@/assets/page-market2/comp-detail/btn-open-0.png')
                    : require('@/assets/page-market2/comp-detail/btn-open.png')
                "
              />
              <span>{{ $t('Carnival2.OpenBox') }}</span>
            </Button>
            <Button class="btn-stroke btn-market" :handler="onMarket">
              <span>{{ $t('Carnival2.GoToMarketplace') }}</span>
              <img class="icon" src="@/assets/page-market2/comp-detail/btn-more.png" />
            </Button>
          </div>
        </div>
      </DetailBoard>
    </section>
    <section class="prizes main-wrap2">
      <h1 class="wrap-title">Prizes</h1>
      <ul class="list">
        <li class="item" v-for="item in activity.prizes" :key="item">
          <div
            class="image"
            :style="{
              backgroundImage: `url(${item.image})`,
            }"
          ></div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <ul class="tags">
              <Tag class="tag" :label="$t('Carnival2.Rarity')" :value="item.epic"></Tag>
              <Tag class="tag" :label="$t('Carnival2.Probability')" :value="item.rate"></Tag>
            </ul>
          </div>
        </li>
      </ul>
    </section>
    <section class="description main-wrap2">
      <h1 class="wrap-title">Description</h1>
      <div class="content">
        <section class="section" v-for="item in activity.description" :key="item">
          <h2 class="title">{{ item.title }}</h2>
          <template v-if="typeof item.text === 'string'">
            <p class="text">{{ item.text }}</p>
          </template>
          <template v-else>
            <ul class="text">
              <li v-for="text in item.text" :key="text">{{ text }}</li>
            </ul>
          </template>
        </section>
      </div>
    </section>
  </div>

  <PrizeDialog ref="prizeDialog"></PrizeDialog>
</template>

<script>
import Button from '@/components/Button.vue'
import DetailImage from './components/DetailImage.vue'
import DetailBoard from './components/DetailBoard.vue'
import Tag from './components/Tag.vue'
import PrizeDialog from './components/PrizeDialog.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { activities } from '@/models/market2.carnivals.model'

export default {
  name: 'CarnivalsDetail',
  components: {
    Button,
    DetailImage,
    DetailBoard,
    Tag,
    PrizeDialog,
  },
  data() {
    return {
      activity: {},

      prize: {},
    }
  },
  computed: {
    tags() {
      let tags = []

      const activity = this.activity || {}
      if (activity.name) {
        tags = [
          { label: this.$t('Carnival2.Quantity'), value: activity.count },
          { label: this.$t('Carnival2.Sold'), value: activity.soldCount },
          { label: this.$t('Carnival2.Limited'), value: activity.limit },
          { label: this.$t('Carnival2.YouOwn'), value: activity.ownCount },
        ]
      }

      return tags
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    async onBuy() {
      const activity = this.activity || {}
      if (!activity || !activity.buy) return

      const result = await activity.buy()
      if (result && result.status === 'success') {
        this.$refs.prizeDialog.show(result)
        await activity.init()
      }
    },
    async onOpen() {
      const activity = this.activity || {}
      if (!activity || !activity.open) return

      const result = await activity.open()
      if (result && result.status === 'success') {
        this.$refs.prizeDialog.show(result)
        await activity.init()
      }
    },
    onMarket() {
      this.$router.push('/market2/marketplace')
    },

    async _getDetail() {
      const id = this.$route.query.id
      const activity = activities.find((item) => item.id == id)
      if (!activity) {
        this.activity = {}
        return
      }

      this.activity = activity

      try {
        await this.activity.init()
      } catch (err) {
        console.warn(err)
      }
    },
    async init() {
      await this._getDetail()
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.market-carnivals-detail {
  padding-bottom: 3rem;
  .main {
    display: flex;
    align-items: center;
    @media (max-width: 768.89px) {
      display: block;
    }
    .cover {
      min-width: 28rem;
      background-image: linear-gradient(#000, #1e005f);
      border: 0 none;
      @media (max-width: 768.89px) {
        min-width: auto;
      }
    }
    .info {
      .box {
        padding: 1.3rem 1.5rem 1rem;
        border: 0.05rem solid $color-border;
        border-radius: 0.4rem;
        background-color: #fbfdff;
        @media (max-width: 768.89px) {
          padding: 3% 4.5% 3%;
        }
      }
      .price {
        font-weight: 500;
        .label {
          line-height: 1.5;
          font-size: 1rem;
          color: $color-secondary;
        }
        .value {
          line-height: 1.4;
          font-size: 1.8rem;
          .icon {
            margin-right: 0.5rem;
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            background: url('~@/assets/common/token-fbx.png') 0 0 / 100% no-repeat;
            vertical-align: middle;
          }
          .text {
            vertical-align: middle;
          }
          .unit {
            margin-left: 0.6rem;
            font-size: 0.5em;
          }
        }
      }
      .btns-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 0.5rem;
        border-top: 0.05rem solid $color-border;
        padding: 1.8rem 0 0 0;
        @media (max-width: 768.89px) {
          margin-bottom: 0;
          padding: 5% 0 0 0;
        }
        .fbx-btn {
          margin-bottom: 1rem;
          box-sizing: border-box;
          width: 48%;
          line-height: 2.9rem;
          font-size: 1rem;
          @media (max-width: 768.89px) {
            margin-bottom: 0.5rem;
            width: 100%;
            line-height: 2.4rem;
            font-size: 0.8rem;
          }
          .icon {
            margin-right: 0.5rem;
            height: 0.9rem;
            @media (max-width: 768.89px) {
              height: 0.8rem;
            }
          }
        }
        .btn-buy {
          width: 100%;
          line-height: 3rem;
          @media (max-width: 768.89px) {
            line-height: 2.5rem;
          }
        }
        .btn-market {
          .icon {
            position: absolute;
            top: 50%;
            right: 0.9rem;
            height: 0.8rem;
            transform: translateY(-50%);
            @media (max-width: 768.89px) {
              right: 0.5rem;
              height: 0.6rem;
            }
          }
        }
      }
    }
  }
  .wrap-title {
    margin-bottom: 1.5rem;
    border-bottom: 0.05rem solid $color-border;
    padding-bottom: 1.5rem;
    line-height: 1.4;
    font-size: 1.5rem;
    @media (max-width: 768.89px) {
      margin-top: 1.2rem;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 1.2rem;
    }
  }
  .prizes {
    margin-bottom: 0;
    .list {
      --template-column-gutters: 4;
      display: grid;
      grid-template-columns: repeat(var(--template-column-gutters), 1fr);
      gap: 1vw;
      margin: 1.6rem 0 0;
      @media (max-width: 1536px) {
        --template-column-gutters: 3;
        margin-top: 0;
      }
      @media (max-width: 960px) {
        --template-column-gutters: 2;
        margin-top: 0;
      }
    }
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0.7rem 0.7rem;
      border: 0.05rem solid $color-border;
      border-radius: 0.4rem;
      @media (max-width: 768.89px) {
        padding: 3% 4% 4%;
      }
      .image {
        width: 40%;
        border-radius: 0.5rem;
        background: $color-placeholder center center / contain no-repeat;
        &::before {
          content: '';
          display: block;
          padding-top: 100%;
        }
        @media (max-width: 768.89px) {
          width: 100%;
          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
      .info {
        margin-left: 5%;
        flex: 1;
        width: 0;
        @media (max-width: 768.89px) {
          margin-left: 4%;
          width: auto;
        }
        .name {
          line-height: 1.5;
          font-size: 1rem;
          font-weight: 500;
          @include ellipsis(1);
          @media (max-width: 768.89px) {
            font-size: 0.8rem;
          }
        }
        .tags {
          margin: 0.5rem 0 0 0;
          @media (max-width: 768.89px) {
            margin: 0;
          }
        }
        .tag {
          display: flex;
          margin-bottom: 0.4rem;
          max-width: 10rem;
          width: 100%;
          line-height: 1.4rem;
          @media (max-width: 768.89px) {
            margin-bottom: 0.2rem;
            width: 100%;
            line-height: 1rem;
            font-size: 0.5rem;
          }
        }
      }
    }
  }
  .description {
    margin-top: 2.2rem;
    @media (max-width: 768.89px) {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
    .content {
      padding: 1rem;
      line-height: 1.5;
      font-size: 0.8rem;
      font-weight: 500;
      background-color: #fbfdff;
      border: 0.05rem solid $color-border;
      border-radius: 0.4rem;
      @media (max-width: 768.89px) {
        padding: 5%;
        font-size: 0.7rem;
      }
      .section {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 0.05rem solid $color-border;
        @media (max-width: 768.89px) {
          margin-bottom: 6%;
          padding-bottom: 6%;
        }
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: 0 none;
        }
      }
      .title {
        color: $color-secondary;
        font-size: inherit;
      }
      .text {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>

