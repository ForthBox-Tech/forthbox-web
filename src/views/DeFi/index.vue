<template>
  <div :class="['page-defi', isBlueBg() ? 'bg-blue' : '']">
    <Nav2></Nav2>
    <div class="defi-nav">
      <Menu class="defi-menu" :menu="menu"> </Menu>
    </div>
    <div class="defi-nav-placeholder"></div>
    <div class="page-wrap2">
      <router-view class="defi-main main-wrap2"></router-view>
    </div>
  </div>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'
import Menu from '@/modules/Menu.vue'

export default {
  name: 'DeFi',
  components: {
    Nav2,
    Menu,
  },
  data() {
    return {}
  },
  computed: {
    menu() {
      // 使用computed，确保支持多语言切换变化
      return [
        {
          path: '/defi/staking',
          related: ['/defi/staking', '/defi/staking-detail'],
          text: this.$t('DeFi.Staking'),
        },
        {
          path: '/defi/lp-farm',
          related: ['/defi/lp-farm', '/defi/lp-farm-detail'],
          text: this.$t('DeFi.LPFarm'),
        },
        {
          path: '/defi/nft',
          related: ['/defi/nft', '/defi/nft-detail'],
          text: 'NFT',
        },
        {
          path: '/defi/fbx-staking',
          related: ['/defi/fbx-staking', '/defi/fbx-staking-detail'],
          text: this.$t('DeFi.FBX staking'),
        },
      ]
    },
  },
  methods: {
    isBlueBg() {
      const page = this.$route.path.replace('/defi', '')
      return ['/lp-farm', '/lp-farm-detail', '/nft', '/staking', '/fbx-staking'].indexOf(page) != -1
    },
  },
}
</script>

<style lang="scss">
@import './defi.common.scss';

.page-defi {
  padding-bottom: 3rem;
  &.bg-blue {
    min-height: 100vh;
    background-color: #f5f9ff;
  }
  &::before,
  &::after {
    content: '';
    clear: both;
    display: table;
  }
  .defi-nav {
    position: fixed;
    top: var(--nav2-height);
    z-index: 10;
    width: 100%;
    background-color: $color-white;
    border-bottom: 0.05rem solid rgba($color-black, 0.07);
    .defi-menu {
      max-width: 77rem;
      color: $color-black;
      border: 0 none;
    }
    .menu-item {
      &.active {
        .text {
          border-color: $color-blue;
        }
      }
    }
  }
  .defi-nav-placeholder {
    height: 3.5rem;
    @media (max-width: 768.89px) {
      height: 2.7rem;
    }
  }
  .defi-main {
    margin-top: 1.5rem;
    margin-bottom: 4rem;
    @media (max-width: 768.89px) {
      margin-top: 3%;
      margin-bottom: 3rem;
    }
  }
}
</style>

