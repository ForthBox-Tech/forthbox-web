<template>
  <Dialog class="dialog-home dialog-nft" :visible="visible" @hide="onHide">
    <main class="main">
      <header class="header">
        <h1 class="title">{{ $t('Home.GreekMythology.CharacterNFT') }}</h1>
        <div class="close-wrap">
          <a class="close" @click="onHide"></a>
        </div>
      </header>
      <ul class="list">
        <li class="item">
          <i class="order">1</i>
          <p class="text one-line">
            {{ $t('Home.GreekMythology.UserCannotMint') }}
          </p>
        </li>
        <li class="item">
          <i class="order">2</i>
          <p class="text">
            {{ $t('Home.GreekMythology.NFTIssued') }}
          </p>
        </li>
        <li class="item">
          <i class="order">3</i>
          <p class="text">
            {{ $t('Home.GreekMythology.FreeTransfer') }}
          </p>
        </li>
        <li class="item">
          <i class="order">4</i>
          <p class="text one-line">{{ $t('Home.GreekMythology.NFTCorresponds') }}</p>
        </li>
        <li class="item">
          <i class="order">5</i>
          <p class="text">
            {{ $t('Home.GreekMythology.GeneratedByAirdrops') }}
          </p>
        </li>
        <li class="item">
          <i class="order">6</i>
          <p class="text">
            {{ $t('Home.GreekMythology.CannotParticipate') }}
          </p>
        </li>
        <li class="item">
          <i class="order">7</i>
          <p class="text">
            {{ $t('Home.GreekMythology.EnjoysTheRight') }}
          </p>
        </li>
      </ul>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'NftDialog',
  components: {
    Dialog,
  },
  props: {
    visible: Boolean,
  },
  methods: {
    onHide() {
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss">
@import '../home.dialog.scss';

.dialog-nft {
  .main {
    background: url('~@/assets/home/dialog-nft-bg2.png') 90% 83% no-repeat,
      url('~@/assets/home/dialog-nft-bg1.png') 0 0 no-repeat;
    background-size: 12.3rem, 100% 100%;
  }

  @media (max-width: 768.89px) {
  }
}
</style>

