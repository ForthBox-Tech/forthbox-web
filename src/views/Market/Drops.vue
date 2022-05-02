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

