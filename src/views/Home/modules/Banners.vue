<template>
  <section class="home-banners">
    <div class="banner-left m-v-hide" @click="onBannerLeft"></div>
    <Slider
      class="banner-slider"
      ref="bannerSlider"
      :autoplay="true"
      :distance="8000"
      :list="banners"
      @slide-start="onBannerSlide"
    >
      <SliderItem v-for="banner in banners" :url="banner.url" :key="banner">
        <img class="banner m-v-hide" :src="banner.imgWeb" />
        <img class="banner pc-v-hide" :src="banner.imgMobile" />
      </SliderItem>
    </Slider>
    <div class="banner-right m-v-hide" @click="onBannerRight"></div>
    <div class="dots">
      <div
        v-for="(banner, index) in banners"
        :key="index"
        :class="['dot', bannerSliderIndex == index ? 'active' : '']"
        @click="onBannerChange(index)"
      ></div>
    </div>
  </section>
</template>

<script>
import Slider from '@/components/Slider.vue'
import SliderItem from '@/components/SliderItem.vue'

export default {
  name: 'Banners',
  components: {
    Slider,
    SliderItem,
  },
  data() {
    return {
      banners: [
        {
          imgWeb: require('@/assets/home/banner-1.png'),
          imgMobile: require('@/assets/home/banner-1-m.jpg'),
          url: '',
        },
        {
          imgWeb: require('@/assets/home/banner-4.jpg'),
          imgMobile: require('@/assets/home/banner-4-m.jpg'),
          url: '/game2/project?id=2&code=ham-fantasy',
        },
        {
          imgWeb: require('@/assets/home/banner-3.jpg'),
          imgMobile: require('@/assets/home/banner-3-m.png'),
          url: '',
        },
        {
          imgWeb: require('@/assets/home/banner-5.jpg'),
          imgMobile: require('@/assets/home/banner-5-m.jpg'),
          url: '',
        },
      ],
      bannerSliderIndex: 0,
    }
  },
  methods: {
    onBannerSlide({ index }) {
      this.bannerSliderIndex = index
    },
    onBannerChange(index) {
      this.$bannerSlider.jump(index)
    },
    onBannerLeft() {
      this.$bannerSlider.prev()
    },
    onBannerRight() {
      this.$bannerSlider.next()
    },

    async getBanners() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/home/banner/get_list`
      const res = await this.$axios.get(url)
      if (res.code != 200) {
        return
      }

      this.banners = (res.data || [])
        .map((item) => ({
          imgWeb: item.PcImageUrl || '',
          imgMobile: item.MobileImageUrl || '',
          url: item.Link || '',
        }))
        .filter((item) => item.imgWeb && item.imgMobile)
    },
  },
  mounted() {
    this.$bannerSlider = this.$refs.bannerSlider

    // this.getBanners()
  },
}
</script>

<style lang="scss" scoped>
.home-banners {
  position: relative;
  &:hover {
    .banner-left,
    .banner-right {
      opacity: 1;
    }
  }
  .banner-slider {
    width: 100%;
    height: 35.65rem;
    @media (max-width: 768.89px) {
      width: 100%;
      height: 63vw;
    }
  }
  .banner {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: 768.89px) {
      width: 100%;
    }
  }
  .banner-left,
  .banner-right {
    transition: opacity 0.3s;
    opacity: 0;
    position: absolute;
    top: 50%;
    z-index: 3;
    margin-top: -1.5rem;
    width: 2rem;
    height: 3rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 1.1rem;
    cursor: pointer;
  }
  .banner-left {
    left: 2rem;
    background-image: url('~@/assets/home/banner-left.png');
  }
  .banner-right {
    right: 2rem;
    background-image: url('~@/assets/home/banner-right.png');
  }
  .dots {
    position: absolute;
    z-index: 5;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    @media (max-width: 768.89px) {
      bottom: 1rem;
    }
    .dot {
      display: inline-block;
      margin: 0 0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      background-color: #fff;
      transition: width 0.1s;
      @media (max-width: 768.89px) {
        margin: 0 0.125rem;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 0.25rem;
      }
      &.active {
        width: 3rem;
        background: linear-gradient(90deg, #0078ff, #ae00ff);
        @media (max-width: 768.89px) {
          width: 1.5rem;
        }
      }
    }
  }
}
</style>

