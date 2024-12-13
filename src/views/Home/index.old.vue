<template>
  <div class="home">
    <Banners></Banners>
    <WhyForthbox1></WhyForthbox1>
    <WhyForthbox2></WhyForthbox2>
    <WhyForthbox3></WhyForthbox3>
    <WhyForthbox4></WhyForthbox4>
    <MintHam id="nft-cast"></MintHam>
    <GameCenter id="gamefi-center"></GameCenter>
    <SocialFi id="forthbox-society"></SocialFi>
    <EcologicalSystem id="forthbox-ecosystem"></EcologicalSystem>
    <Partnets></Partnets>
    <Footer></Footer>
  </div>
</template>

<script>
import Banners from './modules/Banners.vue'
import WhyForthbox1 from './modules/WhyForthbox1.vue'
import WhyForthbox2 from './modules/WhyForthbox2.vue'
import WhyForthbox3 from './modules/WhyForthbox3.vue'
import WhyForthbox4 from './modules/WhyForthbox4.vue'
import MintHam from './modules/MintHam.vue'
import GameCenter from './modules/GameCenter.vue'
import SocialFi from './modules/SocialFi.vue'
import EcologicalSystem from './modules/EcologicalSystem.vue'
import Partnets from './modules/Partnets.vue'
import Footer from '@/modules/Footer.vue'

function scrollTo(elemId) {
  let elem = null
  if (['#nft-cast', '#gamefi-center', '#forthbox-society'].indexOf(elemId) > -1) {
    elem = document.querySelector(elemId)
  } else if (['#roadmap', '#about', '#tokenomics'].indexOf(elemId) > -1) {
    elem = document.querySelector('#forthbox-ecosystem')
  }
  if (elem) {
    elem.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

function onScrollChange() {
  let header = document.querySelector('.header')
  let main = document.querySelector('.main')
  let whyForthbox2 = document.querySelector('.why-forthbox-2')
  let whyForthbox3 = document.querySelector('.why-forthbox-3')
  let whyForthbox4 = document.querySelector('.why-forthbox-4')
  let petCast = document.querySelector('.pet-cast')
  let forthboxSociety = document.querySelector('.forthbox-society')

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        let elem = ''
        if (entry.target.classList.contains('header')) {
          elem = header
        } else if (entry.target.classList.contains('main')) {
          elem = main
        } else if (entry.target.classList.contains('why-forthbox-2')) {
          elem = whyForthbox2.querySelector('.main')
        } else if (entry.target.classList.contains('why-forthbox-3')) {
          elem = whyForthbox3.querySelector('.main')
        } else if (entry.target.classList.contains('why-forthbox-4')) {
          elem = whyForthbox4.querySelector('.main')
        } else if (entry.target.classList.contains('pet-cast')) {
          elem = petCast
        } else if (entry.target.classList.contains('forthbox-society')) {
          elem = forthboxSociety
        }
        elem && elem.classList.add('main-animation')
      }
    })
  })

  observer.observe(header)
  observer.observe(main)
  observer.observe(whyForthbox2)
  observer.observe(whyForthbox3)
  observer.observe(whyForthbox4)
  observer.observe(petCast)
  observer.observe(forthboxSociety)
}

export default {
  name: 'Home',
  components: {
    Banners,
    WhyForthbox1,
    WhyForthbox2,
    WhyForthbox3,
    WhyForthbox4,
    MintHam,
    GameCenter,
    SocialFi,
    EcologicalSystem,
    Partnets,
    Footer,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
    scrollTo(this.$route.hash)
    onScrollChange()
  },
  beforeRouteUpdate(to, from) {
    scrollTo(to.hash)
    if (['#roadmap', '#about', '#tokenomics'].indexOf(to.hash) > -1) {
      this.ecosystem = to.hash
    }
  },
  created() {},
}
</script>

<style lang="scss">
@import './home.animate.scss';

.home {
  background-color: #0c0c29;
  overflow: hidden;

  .section {
    line-height: 1.2rem;
    font-size: 0.9rem;
    color: #fff;
    &::before,
    &::after {
      content: '';
      display: table;
      clear: both;
    }

    .header {
      margin: 3rem 0;
      overflow: hidden;
      .title {
        margin: 0 auto -1.75rem;
        padding-top: 0.5rem;
        line-height: 3.8rem;
        text-align: center;
        font-size: 3.8rem;
        background-image: linear-gradient(0deg, rgba(80, 80, 80, 0), rgba(255, 255, 255, 0.29));
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .title-content {
        max-width: 21.5rem;
        min-height: 1.8rem;
        padding: 0 2.5rem;
        margin: 0 auto;
        font-size: 1.5rem;
        font-weight: 600;
        font-family: PingFang SC;
        color: #fff;
        background: url('~@/assets/home/title.png') 0 bottom no-repeat;
        background-size: 100%;
      }
    }
    .main {
      position: relative;
      margin: 0 auto;
      box-sizing: border-box;
      max-width: 59rem;
      text-align: left;
      &.border {
        border: 0.1rem solid #81deff;
        border-radius: 1.1rem;
        box-shadow: 0 0 0.4rem #ae00ff;
      }
    }
    @media (max-width: 768.89px) {
      .header {
        margin: 0 0 1rem;
        .title {
          margin: 0 auto -2rem;
          font-size: 1.5rem;
          font-weight: normal;
        }
        .title-content {
          display: inline-block;
          min-height: 1.4rem;
          padding: 0 1.5rem;
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
