<template>
  <Nav2></Nav2>
  <main class="page-share">
    <div class="main">
      <section class="logo-wrap">
        <img class="logo" src="@/assets/common/logo.png" />
        <div class="wallet">
          <img class="icon" src="@/assets/comp-nav/icon-wallet.png" />
          <span>{{ $root.vUserWallet }}</span>
        </div>
      </section>
      <section class="subject">
        <img class="img" src="@/assets/page-share/start-cast.png" />
        <div class="split"></div>
        <div class="text">
          {{ $t('Share.Invite1') }} {{ vInviterWalletAddress }}
          {{ $t('Share.Invite2') }}
        </div>
      </section>
      <header class="title-wrap">
        <div class="title-bg">{{ $t('Share.MintHam') }}</div>
        <h1 class="title">{{ $t('Share.MintHam') }}</h1>
      </header>
      <p class="title-aside">
        {{ $t('Share.HamMintedForFree') }}
      </p>
      <section class="ham-wrap" :class="{ empty: status === STATUS.BLANK }">
        <div class="ham-main">
          <div class="inner" v-if="status === STATUS.MINTED">
            <div class="left">
              <div class="ham">{{ $t('Share.MintHam') }}</div>
              <div>#{{ nft.token }}</div>
            </div>
            <div class="middle">
              <img :src="nft.image" />
            </div>
            <div class="right">
              <div class="level">LEVEL {{ nft.level.lv }}</div>
              <ul class="attr-list">
                <li class="attr-item">
                  <img class="icon" src="@/assets/minting/attr-pow.png" />
                  <span class="name">{{ $t('Share.ComputingPower') }}</span>
                  <span class="value">{{ nft.property.pow }}</span>
                </li>
                <li class="attr-item">
                  <img class="icon" src="@/assets/minting/attr-int.png" />
                  <span class="name">{{ $t('Share.INT') }}</span>
                  <span class="value">{{ nft.property.int }}</span>
                </li>
                <li class="attr-item">
                  <img class="icon" src="@/assets/minting/attr-rich.png" />
                  <span class="name">{{ $t('Share.Gold') }}</span>
                  <span class="value">{{ nft.property.gold }}</span>
                </li>
                <li class="attr-item">
                  <img class="icon" src="@/assets/minting/attr-atk.png" />
                  <span class="name">{{ $t('Share.CE') }}</span>
                  <span class="value">{{ nft.property.ce }}</span>
                </li>
                <li class="attr-item">
                  <img class="icon" src="@/assets/minting/attr-dex.png" />
                  <span class="name">{{ $t('Share.AGI') }}</span>
                  <span class="value">{{ nft.property.agi }}</span>
                </li>
                <li class="attr-item">
                  <img class="icon" src="@/assets/minting/attr-am.png" />
                  <span class="name">{{ $t('Share.CHR') }}</span>
                  <span class="value">{{ nft.property.chr }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="inner inner-m" v-if="status === STATUS.BLANK">
            <div><img src="@/assets/page-share/moment.png" /></div>
            <div>{{ $t('Share.StartMinting') }}</div>
          </div>
        </div>
        <div class="progress" v-if="status === STATUS.MINTED">
          <div class="bar-wrap">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="`width: ${(nft.level.exp / nft.level.stage) * 100}%`"
              ></div>
              <div class="progress-text">{{ nft.level.exp }} / {{ nft.level.stage }}</div>
            </div>
            <img class="bar-bg m-v-hide" src="@/assets/minting/create-icon.png" />
          </div>
          <router-link class="feed-btn" v-if="status === STATUS.MINTED" to="/minting">
            {{ $t('Share.toFeed') }}
          </router-link>
        </div>
        <Button
          type="color"
          class="cast-btn"
          v-if="status === STATUS.BLANK"
          loader
          :handler="onCreate"
        >
          <img class="icon" src="@/assets/minting/create-icon.png" />
          {{ $t('Dapp.StartMinting') }}
        </Button>
      </section>
      <p class="feed-text m-v-hide" v-if="status === STATUS.MINTED">
        {{ $t('Share.FeedingCanUpgrade') }}
      </p>
      <section class="details-wrap">
        <img src="@/assets/home/why2-1.png" />
        <img src="@/assets/home/why2-2.png" />
        <img src="@/assets/home/why2-3.png" />
        <img src="@/assets/home/why2-4.png" />
        <img src="@/assets/home/why2-5.png" />
        <img src="@/assets/home/why2-6.png" />
      </section>
      <p class="feed-text text2">
        {{ $t('Share.ProtocolContent') }}
      </p>
      <img class="img-money" src="@/assets/page-minting/money.png" />
      <p class="feed-text text3">
        {{ $t('Share.ShareContent') }}
      </p>
      <Button type="color" class="share-btn" @click="$refs.shareDialog.show()">
        {{ $t('Share.ShareLink') }}
      </Button>
      <section class="social">
        <a
          v-for="social in socials"
          :key="social"
          class="btn-socail"
          target="_blank"
          :href="social.link"
        >
          <img :src="social.icon" />
        </a>
      </section>
      <p class="copyright">{{ $t('Share.Copyright') }}</p>
    </div>
  </main>

  <ShareDialog ref="shareDialog"></ShareDialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Nav2 from '@/modules/Nav2.vue'
import ShareDialog from '@/modules/ShareDialog.vue'
import { getNft, initNft } from '@/models/ham.model'
import { SOCIALS } from '@/models/footer.model'
import emitter from '@/common/js/emitter'
import { transformAddress } from '@/common/js/utils'

// 用户铸造状态
const STATUS = {
  /** 未曾铸造 */
  BLANK: 0,
  /** 已铸造过 */
  MINTED: 1,
}

const socials = [
  { icon: require('@/assets/comp-footer/social-facebook.png'), link: SOCIALS.Facebook },
  { icon: require('@/assets/comp-footer/social-twitter.png'), link: SOCIALS.Twitter },
  { icon: require('@/assets/comp-footer/social-telegram.png'), link: SOCIALS.Telegram },
  { icon: require('@/assets/comp-footer/social-discord.png'), link: SOCIALS.Discord },
]

export default {
  name: 'Share',
  components: {
    Button,
    Nav2,
    ShareDialog,
  },
  data() {
    return {
      STATUS,
      status: STATUS.BLANK,
      inviterWallet: '', // 邀请者钱包地址
      nft: getNft(),
      socials,
    }
  },
  computed: {
    vInviterWalletAddress() {
      return transformAddress(this.inviterWallet)
    },
  },
  methods: {
    onCreate() {
      if (this.inviterWallet == this.$root.userWallet) {
        alert("can't invite yourself")
        return
      }

      const promise = this.inviterWallet
        ? window.cNFTFun.mintNFT_AddInviter(this.inviterWallet)
        : window.cNFTFun.mintNFT()

      return promise
        .then(() => this.getNft())
        .then(() => {
          this.status = STATUS.MINTED
          return Promise.resolve()
        })
        .catch((error) => {
          console.warn(error)
          this.status = STATUS.BLANK
        })
    },

    getNft() {
      return Promise.all([
        window.cNFTFun.tokenOfOwner(),
        window.cFBX_NFTFun.getOwnerStakeTokenIDs(),
      ]).then(([nftTokens, stakedNftTokens]) => {
        const tokens = [].concat(nftTokens, stakedNftTokens).filter((token) => token)
        const token = tokens[tokens.length - 1]
        if (!token) {
          throw new Error('has not nft')
        }

        return initNft(token, false).then((nft) => {
          this.nft = nft
          return nft
        })
      })
    },
    init() {
      if (!window.cWebModel.mConnected) {
        this.status = STATUS.BLANK
        return
      }

      window.cNFTFun.connectToContract()
      window.cFBX_NFTFun.connectToContract()

      this.getNft()
        .then((nft) => {
          this.status = nft ? STATUS.MINTED : STATUS.BLANK
        })
        .catch((err) => {
          console.warn(err)
          this.status = STATUS.BLANK
        })
    },
  },
  mounted() {
    emitter.on('connect-wallet', this.init)
    this.$root.connectWallet()

    this.inviterWallet = this.$route.query.inviter || ''
  },
  unmounted() {
    emitter.off('connect-wallet', this.init)
  },
}
</script>

<style lang="scss" scoped>
.page-share {
  padding: 8.6rem 0 4rem;
  background: url('~@/assets/page-share/bg.png') center top / auto 100% no-repeat;
  @media (max-width: 768.89px) {
    padding: 2rem 0 3rem;
  }
  .main {
    width: 56rem;
    margin: 0 auto;
    padding: 3.5rem 4rem 4.4rem;
    background-color: rgba(0, 0, 0, 0.8);
    border: 0.15rem solid #c6a5e4;
    border-radius: 3.2rem;
    box-sizing: border-box;
    @media (max-width: 768.89px) {
      width: 16.5rem;
      padding: 1rem 1.1rem;
      border-width: 0.1rem;
      border-radius: 0.8rem;
    }
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    .logo {
      width: 15.2rem;
      @media (max-width: 768.89px) {
        width: 5.4rem;
      }
    }
    .wallet {
      flex: 1;
      text-align: right;
      font-size: 1.2rem;
      color: #cbcbcb;
      @media (max-width: 768.89px) {
        font-size: 0.7rem;
      }
      .icon {
        height: 1.5em;
        margin-right: 0.7em;
        vertical-align: -0.35em;
      }
    }
  }
  .subject {
    margin-top: 3.5rem;
    @media (max-width: 768.89px) {
      margin-top: 2rem;
    }
    .img {
      width: 35rem;
      @media (max-width: 768.89px) {
        width: 100%;
      }
    }
    .text {
      font-size: 1.75rem;
      font-weight: bold;
      color: #fff;
      text-shadow: 0 0 10px #6000ff;
      @media (max-width: 768.89px) {
        font-size: 0.9rem;
      }
    }
    .split {
      width: 5rem;
      height: 0.1rem;
      margin: 2rem auto;
      background-color: #8730f5;
      border-radius: 0.05rem;
      @media (max-width: 768.89px) {
        margin: 0.3rem auto 0.5rem;
      }
    }
  }
  .title-wrap {
    margin: 3rem 0;
    text-align: center;
    font-weight: bold;
    @media (max-width: 768.89px) {
      margin: 0 0 1rem;
    }
    .title-bg {
      margin: 0 auto -0.5em;
      padding-top: 0.5rem;
      line-height: 3.8rem;
      font-size: 3.8rem;
      background-image: linear-gradient(0deg, rgba(80, 80, 80, 0), rgba(255, 255, 255, 0.29));
      background-clip: text;
      -webkit-text-fill-color: transparent;
      @media (max-width: 768.89px) {
        margin: 0 auto -2.1rem;
        font-size: 1.5rem;
        font-weight: normal;
      }
    }
    .title {
      max-width: 18.5rem;
      min-height: 1.8rem;
      padding: 0 2.5rem;
      margin: 0 auto;
      font-size: 1.5rem;
      color: #fff;
      background: url('~@/assets/home/title.png') 0 bottom no-repeat;
      background-size: 100%;
      @media (max-width: 768.89px) {
        max-width: 6rem;
        min-height: 1.4rem;
        padding: 0 1.5rem;
        font-size: 0.8rem;
      }
    }
  }
  .title-aside {
    width: 35rem;
    margin: 0 auto 2.5rem;
    font-size: 1rem;
    color: #c6c7e3;
    text-align: left;
    @media (max-width: 768.89px) {
      width: 100%;
      margin-bottom: 1rem;
      font-size: 0.7rem;
    }
  }
  .ham-wrap {
    .ham-main {
      width: 35rem;
      margin: 0 auto;
      padding: 0.1rem;
      box-sizing: border-box;
      border-radius: 1.6rem;
      background: linear-gradient(90deg, #0078ff, #ae00ff);
      @media (max-width: 768.89px) {
        width: auto;
        padding: 0.05rem;
        border-radius: 0.8rem;
      }
      .inner {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 3rem 2.5rem;
        box-sizing: border-box;
        background-color: #171429;
        border-radius: 1.6rem;
        @media (max-width: 768.89px) {
          display: block;
          padding: 0.8rem 0.7rem;
          font-size: 0.7rem;
          color: #c6c7e3;
          border-radius: 0.8rem;
        }
      }
      .left {
        flex: 1;
        font-size: 0.8rem;
        color: #8184a5;
        @media (max-width: 768.89px) {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.6rem;
        }
        .ham {
          font-size: 1.75rem;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 0 10px #6000ff;
          @media (max-width: 768.89px) {
            flex: 1;
            font-size: 0.9rem;
            text-align: left;
          }
        }
      }
      .middle {
        img {
          height: 18rem;
          @media (max-width: 768.89px) {
            width: 10rem;
            height: 10rem;
          }
        }
      }
      .right {
        flex: 1;
        margin-left: 1rem;
        @media (max-width: 768.89px) {
          margin-left: 0;
        }
        .level {
          font-size: 1.2rem;
          color: #fdfdfd;
          @media (max-width: 768.89px) {
            margin-bottom: 0;
            text-align: left;
            font-size: 0.7rem;
          }
        }
        .attr-list {
          margin: 1rem 0 0.5rem;
          padding: 0.6rem 0;
          @media (max-width: 768.89px) {
            margin: 0;
            padding: 0.4rem 0 0;
            display: flex;
            flex-wrap: wrap;
          }
        }
        .attr-item {
          display: flex;
          align-items: center;
          line-height: 2rem;
          font-size: 1rem;
          @media (max-width: 768.89px) {
            width: 40%;
            flex: 1;
            margin-right: 1rem;
            line-height: 1.2rem;
            font-size: 0.65rem;
            text-align: left;
          }
        }
        .icon {
          width: 1.2em;
          height: 1.2em;
        }
        .name {
          display: block;
          margin: 0 1rem 0 0.3rem;
          color: #c5c5d1;
          @media (max-width: 768.89px) {
            margin: 0 0.3rem 0 0.3rem;
            width: 3rem;
          }
        }
        .value {
          flex: 1;
          display: block;
          color: #fff;
          text-align: right;
        }
      }
    }
    .progress {
      display: flex;
      width: 35rem;
      margin: 1.65rem auto 1.5rem;
      align-items: center;
      @media (max-width: 768.89px) {
        display: block;
        width: 100%;
        margin-top: 1rem;
      }
      .bar-wrap {
        position: relative;
        flex: 1;
      }
      .bar-bg {
        position: absolute;
        top: 0.7rem;
        left: 50%;
        width: 2.6rem;
        opacity: 0.5;
        filter: grayscale(100%) brightness(200%);
      }
      .progress-bar {
        position: relative;
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.8rem;
        color: #fff;
        border: 0.05rem solid #6441d3;
        border-radius: 1rem;
        overflow: hidden;
        .progress-fill {
          position: absolute;
          left: 0;
          width: 1rem;
          height: 1.3rem;
          background: linear-gradient(90deg, #6441d3, #93ffff);
        }
        .progress-text {
          position: relative;
          z-index: 10;
          font-weight: bold;
        }
      }
    }
    .feed-btn {
      display: block;
      width: 11rem;
      margin-left: 1.25rem;
      line-height: 2.5rem;
      font-size: 0.9rem;
      color: #fff;
      text-align: center;
      background-color: #6441d3;
      border-radius: 1.25rem;
      cursor: pointer;
      @media (max-width: 768.89px) {
        width: 100%;
        margin: 0.8rem 0 1rem 0;
        line-height: 2rem;
        font-size: 0.75rem;
      }
    }
    .cast-btn {
      width: 16.45rem;
      height: 3.6rem;
      margin: 2rem auto;
      line-height: 3.6rem;
      text-align: center;
      font-size: 1.2rem;
      color: #fff;
      border-radius: 1.8rem;
      background: linear-gradient(90deg, #0078ff, #ae00ff);
      cursor: pointer;
      @media (max-width: 768.89px) {
        width: 10rem;
        height: 2rem;
        margin: 1.3rem auto;
        line-height: 2rem;
        text-align: center;
        font-size: 0.75rem;
        color: #fff;
        border-radius: 1rem;
        background: linear-gradient(90deg, #0078ff, #ae00ff);
      }
      .icon {
        display: inline-block;
        width: 1.6rem;
        margin-right: 0.5rem;
        vertical-align: -0.1rem;
        filter: grayscale(100%) brightness(200%);
        @media (max-width: 768.89px) {
          display: inline-block;
          width: 1.2rem;
          margin-right: 0.2rem;
          vertical-align: -0.1rem;
          filter: grayscale(100%) brightness(200%);
        }
      }
    }
  }
  .empty {
    .ham-main {
      .inner {
        display: block;
        font-size: 0.9rem;
        color: #c6c7e3;
        @media (max-width: 768.89px) {
          padding: 1.1rem 1.5rem;
          font-size: 0.7rem;
        }
        img {
          width: 16rem;
          margin-bottom: 2rem;
          @media (max-width: 768.89px) {
            width: 8rem;
            margin-bottom: 1rem;
          }
        }
      }
    }
  }
  .feed-text {
    width: 35rem;
    margin: 0 auto 3rem;
    line-height: 1.5;
    text-align: left;
    font-size: 0.9rem;
    color: #c6c7e3;
    @media (max-width: 768.89px) {
      width: 100%;
      font-size: 0.7rem;
    }
    &.text2 {
      margin: 3rem auto 2.5rem;
      @media (max-width: 768.89px) {
        margin: 1rem 0 0.9rem;
      }
    }
    &.text3 {
      margin: 2rem auto 1.8rem;
      @media (max-width: 768.89px) {
        margin: 0.5rem 0 1.3rem;
      }
    }
  }
  .details-wrap {
    margin: 0 auto;
    width: 30rem;
    @media (max-width: 768.89px) {
      width: auto;
    }
    img {
      margin: 0 1% 0.5rem;
      width: 31%;
      @media (max-width: 768.89px) {
        margin: 0;
        width: 32%;
      }
    }
  }
  .img-money {
    display: block;
    margin: 0 auto;
    width: 4rem;
  }
  .share-btn {
    position: relative;
    margin: 0 auto;
    width: 35rem;
    line-height: 3.75rem;
    font-size: 1.1rem;
    color: #fff;
    background: #6441d3;
    border-radius: 0.9rem;
    box-sizing: border-box;
    @media (max-width: 768.89px) {
      width: 100%;
      line-height: 2.2rem;
      font-size: 0.8rem;
      border-radius: 0.5rem;
    }
    &:before {
      content: '';
      display: inline-block;
      margin: 0 0.6em 0 0;
      width: 1.1em;
      height: 1.15em;
      background: url('~@/assets/minting/btn-share.png') 0 0 / contain no-repeat;
      vertical-align: middle;
    }
    &::after {
      content: '';
      position: absolute;
      top: -1.2rem;
      right: -1.5rem;
      display: block;
      width: 3.4rem;
      height: 2.85rem;
      background: url('~@/assets/page-minting/invitation-gift.png') 0 0 / contain no-repeat;
      @media (max-width: 768.89px) {
        width: 2.5rem;
        height: 2rem;
        top: -1rem;
        right: -1.2rem;
      }
    }
  }
  .social {
    margin-top: 2.4rem;
    @media (max-width: 768.89px) {
      margin-top: 1.4rem;
    }
    img {
      width: 2.35rem;
      margin: 0 0.6rem;
      @media (max-width: 768.89px) {
        width: 1.5rem;
        margin: 0 0.4rem;
      }
    }
  }
  .copyright {
    margin: 5.2rem 0 6rem;
    font-size: 1rem;
    color: #cbcbcb;
    @media (max-width: 768.89px) {
      margin: 1.6rem 0 0.7rem;
      font-size: 0.6rem;
    }
  }
}
</style>

