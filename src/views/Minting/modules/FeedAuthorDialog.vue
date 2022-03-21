<template>
  <Dialog class="dialog-feed-author" :visible="visible">
    <main class="feed-main">
      <a class="close" @click="onClose"></a>
      <h1 class="title">{{ $t('Dapp.FeedDialog.Authorize') }}</h1>
      <section class="feed-content">
        <ul class="list">
          <li class="item">
            <img class="icon" src="@/assets/minting/overview-usdc.png" />
            <p class="text">{{ $t('Dapp.FeedDialog.AuthorizeForth') }}</p>
            <Button
              class="btn-author"
              :disabled="usdcAuthor"
              :loader="true"
              :handler="onUsdcAuthor"
              >{{ $t('Dapp.FeedDialog.Authorize') }}</Button
            >
          </li>
          <li class="item">
            <img class="icon" src="@/assets/minting/overview-fbx.png" />
            <p class="text">{{ $t('Dapp.FeedDialog.AuthorizeFbx') }}</p>
            <Button
              class="btn-author"
              :disabled="fbxAuthor"
              :loader="true"
              :handler="onFbxAuthor"
              >{{ $t('Dapp.FeedDialog.Authorize') }}</Button
            >
          </li>
        </ul>
      </section>
      <aside class="feed-aside">
        {{ $t('Dapp.FeedDialog.Note') }}
      </aside>
    </main>
  </Dialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'
import { NFT_HAM } from '@/web3/contract.constant'
import { getFbxContract, getUsdcContract } from '@/web3/contract.factory'

export default {
  name: 'FeedAuthorDialog',
  components: {
    Button,
    Dialog,
  },
  props: {
    usdcAuthor: Boolean,
    fbxAuthor: Boolean,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onClose() {
      this.hide()
    },

    onUsdcAuthor() {
      if (this.usdcAuthor) return
      const usdcContract = getUsdcContract()
      return usdcContract.approve(NFT_HAM, 99999999).then(() => {
        this.$emit('update:usdcAuthor', true)
        this.$nextTick(() => {
          if (this.usdcAuthor && this.fbxAuthor) {
            this.onClose()
          }
        })
      })
    },
    onFbxAuthor() {
      if (this.fbxAuthor) return
      const fbxContract = getFbxContract()
      return fbxContract.approve(NFT_HAM, 99999999).then(() => {
        this.$emit('update:fbxAuthor', true)
        this.$nextTick(() => {
          if (this.usdcAuthor && this.fbxAuthor) {
            this.onClose()
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-feed-author {
  .feed-main {
    position: relative;
    box-sizing: border-box;
    max-width: 28rem;
    padding: 1rem 1.5rem 1.5rem;
    text-align: left;
    font-size: 0.8rem;
    color: $color-primary;
    background-color: $color-white;
    border: 0.05rem solid $color-border;
    border-radius: 0.5rem;
    @media (max-width: 768.89px) {
      max-width: 15rem;
      padding: 1rem;
      font-size: 0.65rem;
    }
  }
  .close {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    background: url('~@/assets/common/close.png') center center / 60% no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      top: 0.4rem;
      right: 0.4rem;
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .title {
    font-size: 1.5em;
    font-weight: normal;
    text-align: center;
  }
  .feed-content {
    .list {
      padding: 0.1rem 0.7rem 0.2rem;
      @media (max-width: 768.89px) {
        padding: 0;
      }
    }
    .item {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      @media (max-width: 768.89px) {
        margin: 0.8rem 0;
      }
      .icon {
        margin-right: 1em;
        width: 1.6em;
      }
      .text {
        flex: 1;
      }
      .btn-author {
        @include btn-fill-pure($color-purple);
        width: 6rem;
        line-height: 1.8rem;
        font-size: inherit;
        border-radius: 1.6rem;
        @media (max-width: 768.89px) {
          width: 3rem;
          line-height: 1.6rem;
          border-radius: 1.6rem;
        }
      }
    }
  }
  .feed-aside {
    border-top: 1px solid $color-border;
    padding: 1em 0.3em 0;
    line-height: 1.2;
    font-size: 0.85em;
    color: $color-gray;
  }
}
</style>

