<template>
  <section class="section pet-cast m-py-0" v-bind="$attrs">
    <header class="header">
      <h1 class="title">{{ $t('Home.Minting.HamMinting') }}</h1>
      <div class="title-content">{{ $t('Home.Minting.HamMinting') }}</div>
    </header>
    <main class="main m-mx-1">
      <div class="text">
        {{ $t('Home.Minting.HamIsAPlatformNFTAsset') }}
      </div>
      <div class="content pc-layout-flex">
        <div class="content-flex m-ta-center pc-mr-2v">
          <router-link class="m-w-100 m-v-hide" to="/minting">
            <img class="m-w-100" src="@/assets/home/main-2-left.png" />
          </router-link>
          <router-link class="m-w-100 pc-v-hide" to="/minting">
            <img class="m-w-100" src="@/assets/home/main-2-left-m.png" />
          </router-link>
          <div class="text-feed">
            {{ $t('Home.Minting.FeedingInstructions1') }}
            <span class="anchor" @click="$refs.feedIntroDialog.show()">{{
              $t('Home.Minting.FeedingInstructions2')
            }}</span
            >{{ $t('Home.Minting.FeedingInstructions3') }}
          </div>
        </div>
        <div class="content-flex m-mt-2">
          <div class="m-border">
            <div class="m-inner">
              <div style="text-align: center">
                <img
                  class="img-right m-w-100"
                  src="https://static.forthbox.io/image/gif/card1.gif"
                />
              </div>
              <div class="text-gray">
                {{ $t('Home.Minting.WhatsMoreExciting') }}
              </div>
            </div>
          </div>
          <div class="m-text-refer">
            {{ $t('Home.Minting.NFTDescription1') }}
            <span class="anchor" @click="onShowNftDialog">{{
              $t('Home.Minting.NFTDescription2')
            }}</span>
            {{ $t('Home.Minting.NFTDescription3') }}
          </div>
        </div>
      </div>
    </main>
  </section>

  <FeedIntroDialog ref="feedIntroDialog"></FeedIntroDialog>
  <NftDialog :visible="nftDialogVisible" @hide="onHideNftDialog"></NftDialog>
</template>

<script>
import FeedIntroDialog from './FeedIntroDialog.vue'
import NftDialog from './NftDialog.vue'

export default {
  name: 'MintHam',
  components: {
    FeedIntroDialog,
    NftDialog,
  },
  data() {
    return {
      nftDialogVisible: false,
    }
  },
  methods: {
    onShowNftDialog() {
      this.nftDialogVisible = true
    },
    onHideNftDialog() {
      this.nftDialogVisible = false
    },
  },
}
</script>

<style lang="scss">
@import '../home.animate.scss';

