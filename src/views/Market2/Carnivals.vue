<template>
  <div class="market-carnivals">
    <section class="banners">
      <!-- <img class="inner" src="@/assets/page-market2/page-carnivals/banner.png" /> -->
      <video
        ref="bannerVideo"
        class="inner"
        src="@/assets/page-game2/page-collections/banner-1.mp4"
        loop
        autoplay
      ></video>
    </section>
    <!-- <section class="notice">
      <main class="main main-wrap2">
        <p :class="['text', false ? 'new' : '']">{{ notice }}</p>
        <router-link class="more" to="/settings/notice">See more</router-link>
      </main>
    </section> -->
    <section class="project main-wrap2">
      <DetailImage class="cover" :image="project.promo"></DetailImage>
      <div class="info">
        <h1 class="name">
          <span :class="['text', project.isCert ? 'cert' : '']">{{ project.name }}</span>
        </h1>
        <div class="author">
          <img class="avatar" :src="project.creator && project.creator.avatar" />
          <div class="flex">
            <div class="label">Creator</div>
            <div class="username">{{ project.creator && project.creator.name }}</div>
          </div>
        </div>
        <div class="detail">
          <div class="price">
            <div class="label">Price</div>
            <div class="value">
              <img class="icon" :src="project.tokenLogo" />
              <span class="text">{{ project.price }}</span>
              <span class="unit">{{ project.token }}</span>
            </div>
          </div>
          <div class="desc">
            <div class="label">NFT description</div>
            <div class="text">
              <template v-for="item in project.description" :key="item">
                <p>{{ item.title }}</p>
                <template v-if="typeof item.text === 'string'">
                  <p>{{ item.text }}</p>
                </template>
                <template v-else>
                  <ul>
                    <li v-for="text in item.text" :key="text">{{ text }}</li>
                  </ul>
                </template>
              </template>
            </div>
          </div>
        </div>
        <div class="btns">
          <Button class="btn-buy" @click="onBuy">
            {{ $t('Market.BuyNow') }}
            <img class="icon" src="@/assets/page-market2/page-carnivals/project-buy.png" />
          </Button>
        </div>
      </div>
    </section>
    <section class="tops main-wrap2">
      <!-- <h1 class="title">Carnivals</h1> -->
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
        <CarnivalsCard
          v-for="item in list"
          :key="item"
          :carnivals="item"
          @click="onItem(item)"
        ></CarnivalsCard>
      </div>
      <div class="pagination-wrap" v-if="total > pageSize">
        <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
      </div>
    </section>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import DetailImage from './components/DetailImage.vue'
import GameTypeSelector from './components/GameTypeSelector.vue'
import ProviderSelector from './components/ProviderSelector.vue'
import CarnivalsCard from './components/CarnivalsCard.vue'
import Pagination from '@/components/Pagination.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { activities } from '@/models/market2.carnivals.model'

export default {
  name: 'Carnivals',
  components: {
    Button,
    DetailImage,
    GameTypeSelector,
    ProviderSelector,
    CarnivalsCard,
    Pagination,
  },
  data() {
    return {
      notice: 'Marktplace For Monser Character Cllections Non FUNGIBLE Token NFTs',

      project: {},

      gameType: '',
      provider: '',

      total: 0,
      pageSize: 12,
      pageNo: 1,

      list: [],
    }
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    onBuy() {
      this.$router.push({
        path: '/market2/carnivals/detail',
        query: {
          id: this.project.id,
        },
      })
    },

    onChangeFilter() {
      this.pageNo = 1
      this._getList()
    },
    onJump(pageNo) {
      this.pageNo = pageNo
      this._getList()
    },

    onItem(item) {
      this.$router.push({
        path: '/market2/carnivals/detail',
        query: {
          id: item.id,
        },
      })
    },

    async _getProject() {
      this.project = activities[0]
    },
    async _getList() {
      this.list = activities.filter((item) => {
        const inGameType = !this.gameType || this.gameType == item.category
        const inProvider = !this.provider || this.provider == item.provider
        return inGameType && inProvider
      })
    },
    async init() {
      await this._getProject()

      this.gameType = ''
      this.provider = ''

      this.total = 0
      this.pageNo = 1
      await this._getList()

      // 判断嘉年华是否已经结束等
      this.list.forEach(async (item) => await item.init())
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.bannerVideo.play()
    }, 0)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.market-carnivals {
  .banners {
    position: relative;
    height: 24.1rem;
    background-color: #13141d;
    overflow: hidden;
    @media (max-width: 768.89px) {
      height: 8.0333rem;
    }
    .inner {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
    }
  }
  .notice {
    line-height: 1.5rem;
    font-size: 0.6rem;
    background-color: #e9ecee;
    .main {
      display: flex;
    }
    .text {
      flex: 1;
      width: 0;
      @include ellipsis(1);
      &::before {
        content: '';
        margin-right: 0.8rem;
        display: inline-block;
        width: 0.75rem;
        height: 0.7rem;
        background: url('~@/assets/page-market2/page-carnivals/notice-normal.png') 0 0 / 100%
          no-repeat;
        vertical-align: -0.15rem;
      }
      &.new {
        &::before {
          background-image: url('~@/assets/page-market2/page-carnivals/notice-new.png');
        }
      }
    }
    .more {
      padding-left: 1rem;
      display: block;
      font-weight: 500;
      color: $color-secondary;
      cursor: pointer;
      &::after {
        content: '';
        margin-left: 0.3rem;
        display: inline-block;
        height: 0.25rem;
        width: 0.25rem;
        border-top: 0.05rem solid $color-gray;
        border-right: 0.05rem solid $color-gray;
        transform: rotate(45deg);
      }
      &:hover {
        color: $color-blue;
        &::after {
          border-color: $color-blue;
        }
      }
    }
  }
  .project {
    display: flex;
    align-items: center;
    @media (max-width: 768.89px) {
      display: block;
    }
    .cover {
      border: 0 none;
      border-radius: 1rem;
    }
    .info {
      flex: 1;
      width: 0;
      margin-left: 5%;
      @media (max-width: 768.89px) {
        width: auto;
        margin: 0.5rem 0 0;
      }
      .name {
        font-size: 0;
        .text {
          @include text-with-cert(0.5rem, 1rem, 1rem);
          font-size: 2.5rem;
          line-height: 1.4;
          @media (max-width: 768.89px) {
            font-size: 1.5rem;
            line-height: 1.8;
          }
        }
      }
      .author {
        margin-top: 0.5%;
        display: flex;
        align-items: center;
        line-height: 1.4;
        .avatar {
          margin-right: 0.6rem;
          display: flex;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 2.4rem;
          @media (max-width: 768.89px) {
            width: 1.8rem;
            height: 1.8rem;
          }
        }
        .flex {
          flex: 1;
          width: 0;
        }
        .label {
          color: $color-gray;
          font-size: 0.8rem;
          @media (max-width: 768.89px) {
            font-size: 0.65rem;
          }
        }
        .username {
          font-size: 0.9rem;
          @include ellipsis(1);
          @media (max-width: 768.89px) {
            font-size: 0.75rem;
          }
        }
      }
      .detail {
        margin-top: 4%;
        padding: 0.7rem 1.4rem 1rem;
        background: $color-white;
        box-shadow: 0 0 1.2rem 0 rgba(91, 92, 97, 0.13);
        border-radius: 0.5rem;
        @media (max-width: 768.89px) {
          margin-top: 5%;
          padding: 0.4rem 0.8rem 0.8rem;
        }
        .price {
          .label {
            font-weight: 500;
            font-size: 0.9rem;
            line-height: 2;
            @media (max-width: 768.89px) {
              font-size: 0.8rem;
            }
          }
          .value {
            font-weight: 500;
            font-size: 2rem;
            @media (max-width: 768.89px) {
              font-size: 1.8rem;
            }
            .icon {
              margin-right: 0.5rem;
              height: 1rem;
              vertical-align: 0.2rem;
              @media (max-width: 768.89px) {
                height: 0.9rem;
                vertical-align: 0.1rem;
              }
            }
            .unit {
              margin-left: 0.6rem;
              font-size: 0.4em;
            }
          }
        }
        .desc {
          margin-top: 1%;
          @media (max-width: 768.89px) {
            margin-top: 2%;
          }
          .label {
            font-weight: 500;
            font-size: 0.9rem;
            line-height: 2;
            @media (max-width: 768.89px) {
              font-size: 0.8rem;
            }
          }
          .text {
            line-height: 1.4;
            font-size: 0.7rem;
            color: $color-secondary;
            @media (max-width: 768.89px) {
              font-size: 0.6rem;
            }
          }
        }
      }
      .btns {
        margin-top: 2rem;
        @media (max-width: 768.89px) {
          margin-top: 6%;
        }
        .btn-buy {
          position: relative;
          display: block;
          line-height: 3.5rem;
          font-size: 1.2rem;
          @include btn-fill-color();
          @media (max-width: 768.89px) {
            line-height: 2.5rem;
            font-size: 0.8rem;
          }
          .icon {
            position: absolute;
            top: 50%;
            right: 1.5rem;
            transform: translateY(-50%);
            width: 1.3rem;
            @media (max-width: 768.89px) {
              right: 0.8rem;
              width: 0.8rem;
            }
          }
        }
      }
    }
  }
  .tops {
    @media (max-width: 768.89px) {
      margin-top: 2rem;
    }
    // .title {
    //   font-size: 1.5rem;
    //   line-height: 2;
    // }

    .condition {
      margin: 1rem 0 0.8rem;
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
      margin: 0 0 2rem;
      border-top: 0.05rem solid rgba($color-border, 0.7);
      padding-top: 1.5rem;
      @media (max-width: 768.89px) {
        padding-top: 1rem;
      }
    }
  }
}
</style>

