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
