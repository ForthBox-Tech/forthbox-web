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

.home {
  .pet-cast {
    position: relative;
    z-index: 1;
    padding: 4.5rem 0 5.5rem;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: #121536;
      clip-path: polygon(0 0, 0 90%, 50% 100%, 100% 90%, 100% 0, 50% 10%);
    }
    .text {
      line-height: 1.2rem;
      font-size: 0.9rem;
      text-align: left;
      margin-bottom: 1.8rem;
    }
    .content {
      flex-wrap: wrap;
      align-items: center;
      line-height: 1.2rem;
      font-size: 0.8rem;
      color: #5e5f86;
      .content-flex {
        width: 1%;
        flex: 1;
        .img-right {
          margin: 1.3rem 0 0;
        }
        @media (max-width: 768.89px) {
          width: auto;
        }
      }
      .text-gray {
        margin-bottom: 1rem;
        color: #eeeef1;
      }
      .anchor {
        color: #00f0ff;
        cursor: pointer;
        &:hover {
          opacity: 0.92;
        }
        &:active {
          opacity: 0.85;
        }
      }
    }
    @media (max-width: 768.89px) {
      &:after {
        background-color: #121536;
        padding-bottom: 1.5rem;
        clip-path: polygon(0 0, 0 98%, 50% 100%, 100% 98%, 100% 0, 50% 2%);
      }
      .text {
        line-height: 1.2rem;
        text-align: center;
        font-size: 0.7rem;
        color: #c6c7e3;
      }
      .text-feed {
        text-align: left;
      }
      .m-border {
        width: 100%;
        height: 100%;
        padding: 0.1rem;
        box-sizing: border-box;
        border-radius: 0.2rem;
        background: linear-gradient(90deg, #0078ff, #ae00ff);
        overflow: hidden;
        .m-inner {
          background-color: #202346;
          .img-right {
            margin: 0;
          }
        }
        .text-gray {
          margin: 0 1rem 0;
          text-align: left;
          font-size: 0.7rem;
        }
      }
      .m-text-refer {
        margin-top: 1rem;
        font-size: 0.7rem;
      }
    }
  }

  .pet-cast {
    .header,
    .main .text,
    .main .content {
      opacity: 0;
    }
    &.main-animation {
      .header {
        animation: blurFadeIn 0.5s ease-in forwards;
      }
      .main .text {
        animation: blurFadeIn 0.8s ease-in forwards;
        animation-delay: 0.3s;
      }
      .main .content {
        animation: blurFadeIn 0.8s ease-in forwards;
        animation-delay: 1s;
      }
    }
  }
}
</style>

