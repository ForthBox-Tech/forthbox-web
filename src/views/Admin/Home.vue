<template>
  <main class="admin-home page-wrap2">
    <h1 class="title main-wrap2">Home Admin</h1>
    <TabsFrame
      class="main main-wrap2"
      :tabs="[
        { text: 'Banners', name: 'Banners' },
        { text: 'Crypto news', name: 'CryptoNews' },
      ]"
      @tab-change="onTabChange"
    >
      <template #Banners><Banners class="content"></Banners></template>
      <template #CryptoNews><CryptoNews class="content"></CryptoNews></template>
    </TabsFrame>
  </main>
</template>

<script>
import TabsFrame from '@/layouts/TabsFrame.vue'
import Banners from './home-modules/Banners.vue'
import CryptoNews from './home-modules/CryptoNews.vue'

export default {
  components: {
    TabsFrame,
    Banners,
    CryptoNews,
  },
  data() {
    return {}
  },
  methods: {
    onTabChange(tab) {
      // console.log('tab', tab)
    },
  },
  mounted() {},
}
