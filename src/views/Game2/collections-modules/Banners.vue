<template>
  <section class="game-banners">
    <Slider
      class="banner-slider"
      ref="bannerSlider"
      :autoplay="true"
      :distance="6000"
      @slide-start="onBannerSlide"
    >
      <SliderItem v-for="banner in banners" :key="banner">
        <video
          v-if="banner.type === 'video'"
          :ref="banner.name"
          class="inner"
          :src="banner.img"
          loop
          autoplay
        ></video>
        <img v-else class="inner" :src="banner.img" />
      </SliderItem>
    </Slider>
    <div class="dots">
      <div
        v-for="(banner, index) in banners"
        :key="banner"
        :class="['dot', bannerIndex == index ? 'active' : '']"
        @click="onBannerChange(index)"
      ></div>
    </div>
  </section>
</template>

<script>
import Slider from '@/components/Slider.vue'
import SliderItem from '@/components/SliderItem.vue'

const banners = [
  {
    url: '',
    img: require('@/assets/page-game2/page-collections/banner-pump.mp4'),
    name: 'pump',
    type: 'video',
  },
  {
    url: '',
    img: require('@/assets/page-game2/page-collections/banner-1.mp4'),
    name: 'usdc',
    type: 'video',
  },
]

export default {
  components: {
    Slider,
    SliderItem,
  },
  data() {
    return {
      banners,
      bannerIndex: 0,
    }
  },
  methods: {
    onBannerSlide({ index = 0 }) {
      this.bannerIndex = index

      const banner = this.banners[index]
      if (!banner) return

      if (banner.type === 'video') {
        this.$refs[banner.name].play()
      }
    },
    onBannerChange(index) {
      this.$refs.bannerSlider.jump(index)
    },
  },
  mounted() {
    this.onBannerSlide({ index: 0 })
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.game-banners {
  position: relative;
  height: 24.1rem;
  background-color: #13141d;
  overflow: hidden;
  @media (max-width: 768.89px) {
    height: 8.0333rem;
  }
  .banner-slider {
    width: 100%;
    height: 100%;
  }
  .inner {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
  }

  .dots {
    position: absolute;
    z-index: 5;
    bottom: 0.7rem;
    left: 50%;
    transform: translateX(-50%);
    line-height: 1;
    white-space: nowrap;
    @media (max-width: 768.89px) {
      bottom: 0.35rem;
    }
    .dot {
      display: inline-block;
      margin: 0 0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      background-color: #fff;
      transition: width 0.1s;
      cursor: pointer;
      @media (max-width: 768.89px) {
        margin: 0 0.15rem;
        width: 0.25rem;
        height: 0.25rem;
      }
      &.active {
        width: 1.5rem;
        background-image: linear-gradient(90deg, #00aaff 0%, #df01ff 100%);
        @media (max-width: 768.89px) {
          width: 0.75rem;
        }
      }
    }
  }
}
</style>
