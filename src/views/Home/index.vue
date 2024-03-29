<template>
  <!-- <Nav2></Nav2> -->
  <main class="page-home">
    <Banners></Banners>
    <PlatformStats></PlatformStats>
    <CryptoNews></CryptoNews>
    <Investors></Investors>
    <Partners></Partners>
  </main>
  <Footer></Footer>
</template>

<script>
// import Nav2 from '@/modules/Nav2.vue'
import Banners from './modules/Banners.vue'
import PlatformStats from './modules/PlatformStats.vue'
import CryptoNews from './modules/ CryptoNews.vue'
import Investors from './modules/Investors.vue'
import Partners from './modules/Partners.vue'
import Footer from '@/modules/Footer.vue'

export default {
  name: 'Home',
  components: {
    // Nav2,
    Banners,
    PlatformStats,
    CryptoNews,
    Investors,
    Partners,
    Footer,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  created() {},
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';
@import './home.common.scss';

.page-home {
  background-color: $color-white;
}
</style>
