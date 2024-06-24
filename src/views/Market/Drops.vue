<template>
  <div class="market-drops-page">
    <section class="banners">
      <Slider
        class="banner-slider"
        ref="bannerSlider"
        :autoplay="false"
        :distance="8000"
        @slide-start="onBannerSlide"
      >
        <SliderItem class="banner-item">
          <img class="banner" src="@/assets/page-market/drops-banner-2.jpg" />
        </SliderItem>
      </Slider>
    </section>
    <section class="detail-list">
      <router-link
        class="detail-block"
        v-for="drop in dropList"
        :key="drop.key"
        :class="drop.isEnd ? 'ended' : 'new'"
        :to="{ path: '/market/drops-detail', query: { id: drop.key } }"
      >
        <div class="logo-wrap">
          <img :src="drop.image" :style="drop.imageStyle" />
          <div class="bottom-img">
            <img
              v-for="img in drop.simplePrizes || drop.prizes"
              :key="img"
              :src="img"
              :style="drop.prizesStyle"
            />
          </div>
        </div>
        <div class="name">{{ drop.name }}</div>
        <div class="drops-price-wrap">
          <img class="icon" :src="drop.sIcon" />
          {{ drop.desc }}
        </div>
        <div class="date">From {{ drop.date }}</div>
      </router-link>
    </section>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import SliderItem from '@/components/SliderItem.vue'
import { DROPS } from '@/models/market.drops.model'
import emitter from '@/common/js/emitter'
import { isSupportedChain } from '@/web3/wallet'

export default {
  name: 'Drops',
  components: {
    Slider,
    SliderItem,
  },
  data() {
    return {
      bannerSliderIndex: 0,
      order: false,
      dropList: Object.keys(DROPS)
        .map((key) => {
          const drop = DROPS[key]
          drop.key = key
          return drop
        })
        .filter((item) => item.visible),
    }
  },
  methods: {
    onBannerSlide({ index }) {
      this.bannerSliderIndex = index
    },
    onBannerChange(index) {
      this.$bannerSlider.jump(index)
    },
    //初始化
    async init({ accounts, chainId } = {}) {
      if (!accounts || !accounts.length) {
        return
      }
      if (!isSupportedChain(chainId)) {
        alert('Please change your chain provider to the Binance Smart Chain (or testnet)')
        return
      }
      //判断嘉年华活动是否结束
      this.dropList.forEach(async (drop) => await drop.initSimpleDetail())
    },
  },
  mounted() {
    this.$bannerSlider = this.$refs.bannerSlider
    emitter.on('connect-wallet', this.init)
    this.$root.connectWallet()
  },
  unmounted() {
    emitter.off('connect-wallet', this.init)
  },
}
</script>

<style lang="scss">
.market-drops-page {
  .banners {
    position: relative;
    margin-bottom: 1.5rem;
    .banner-slider {
      width: 100%;
      height: 16.91rem;
    }
    .banner-item {
      border-radius: 1rem;
    }
    .banner {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
    }
    .dots {
      position: absolute;
      z-index: 5;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      .dot {
        display: inline-block;
        margin: 0 0.25rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.5rem;
        background-color: #fff;
        transition: width 0.1s;
        &.active {
          width: 3rem;
          background: linear-gradient(90deg, #0078ff, #ae00ff);
        }
      }
    }
    @media (max-width: 768.89px) {
      margin-bottom: 0.8rem;
      .banner-slider {
        width: 100%;
        height: 5.9rem;
      }
      .banner {
        width: 100%;
      }
      .dots {
        bottom: 1rem;
        .dot {
          margin: 0 0.125rem;
          width: 0.25rem;
          height: 0.25rem;
          border-radius: 0.25rem;
          &.active {
            width: 1.5rem;
          }
        }
      }
    }
  }
  .drops-price-wrap {
    padding-bottom: 0.8rem;
    font-size: 0.8rem;
    color: #fff;
    border-bottom: 0.05rem solid #65657b;
    @media (max-width: 768.89px) {
      padding-bottom: 0.45rem;
      font-size: 0.6rem;
    }
    .icon {
      content: '';
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.55rem;
      vertical-align: middle;
      @media (max-width: 768.89px) {
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.25rem;
      }
    }
  }
  .logo-wrap {
    .bottom-img {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      img {
        position: initial !important;
        display: block;
        width: 23%;
        margin: 0 1%;
      }
    }
  }
}
</style>

