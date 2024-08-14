<template>
  <div class="market-detail-page drops-detail-page">
    <DetailImage :image="dropInfo.image"></DetailImage>
    <DetailTransaction class="forthbox-wrap" :title="dropInfo.name" :note="dropInfo.note">
      <template v-if="keyMapName == KEYS.xbox">
        <div class="xbox-remaining">
          <img class="icon" src="@/assets/page-market/drops-icon-box.png" />
          <span>X-Box remaining: </span>
          <span>{{ contractInfo.ownNum }}</span>
        </div>
      </template>
      <template v-else>
        <div class="price-title">
          Fixed price
          <span class="remaining">
            <img class="icon" src="@/assets/page-market/drops-icon-box.png" />
            <span>Total Remaining: </span>
            <span>{{ contractInfo.allLastNum }}</span>
          </span>
        </div>
        <div class="card-num">{{ dropInfo.price }}</div>
        <div class="quantity">
          <img class="icon" src="@/assets/page-market/drops-icon-buy.png" />
          <span>Available Quantity: </span>
          <span class="yellow">{{ contractInfo.addrLastNum }}</span
          ><span>/{{ contractInfo.addrMaxNum }}</span>
        </div>
      </template>
      <div class="btn-wraps">
        <template v-if="keyMapName == KEYS.nftbox">
          <Button loader :handler="onBuy" :disabled="contractInfo.unAvailable"> Open </Button>
        </template>
        <template v-if="[KEYS.towerboxround1, KEYS.towerboxround2].indexOf(keyMapName) > -1">
          <Button loader :handler="onBuy" :disabled="contractInfo.unAvailable"> Buy </Button>
          <Button loader :handler="onDraw" :disabled="contractInfo.ownNum <= 0">
            Open
            <p class="own-num">You have {{ contractInfo.ownNum }} Boxes</p>
          </Button>
        </template>
        <template v-if="keyMapName == KEYS.xbox">
          <Button class="btn-xbox" loader :handler="onOpen" :disabled="contractInfo.ownNum <= 0">
            <img class="icon" src="@/assets/page-market/xbox-icon.png" />
            Open
          </Button>
        </template>
      </div>
    </DetailTransaction>
    <DetailPanel class="prizes-wrap" title="Prizes">
      <ul class="icon-list">
        <li v-for="img in dropInfo.prizes" :key="img">
          <img :src="img" />
        </li>
      </ul>
    </DetailPanel>
    <DetailPanel class="description-wrap" title="Description">
      <ul>
        <li v-for="(fragment, index) in dropInfo.description" :key="index">
          <div v-if="fragment.title">{{ fragment.title }}</div>
          <div v-for="text in fragment.content" :key="text">{{ text }}</div>
        </li>
      </ul>
    </DetailPanel>
  </div>

  <PrizeDialog
    :visible="prizeDialogVisible"
    :image="BuyResult.showImg"
    :text="BuyResult.showText"
    :imgStyle="BuyResult.imgStyle"
    @hide="prizeDialogVisible = false"
  ></PrizeDialog>
</template>

<script>
import Button from '@/components/Button.vue'
import PrizeDialog from './PrizeDialog.vue'
import DetailImage from './DetailImage.vue'
import DetailTransaction from './DetailTransaction.vue'
import DetailPanel from './DetailPanel.vue'
import emitter from '@/common/js/emitter'
import { DROPS } from '@/models/market.drops.model'
import { isSupportedChain } from '@/web3/wallet'
import { getFbxContract } from '@/web3/contract.factory'
import FBXTurretNFT from '@/web3/FBXTurretNFT'

const KEYS = {}
Object.keys(DROPS).forEach((key) => {
  KEYS[key] = key
})

export default {
  components: {
    Button,
    PrizeDialog,
    DetailImage,
    DetailTransaction,
    DetailPanel,
  },
  data() {
    return {
      chainId: 0,
      keyMapName: '',
      KEYS,
      prizeDialogVisible: false,
      isApproved: false,
      dropInfo: DROPS[this.$route.query.id] || {},
      contractInfo: {
        addrLastNum: 0,
        addrMaxNum: 0,
        allLastNum: 0,
        ownNum: 0,
        unAvailable: false,
      },
      BuyResult: {
        showText: '',
        showImg: '',
        imgStyle: '',
      },
    }
  },
  methods: {
    //是否授权
    async isApprovedFBX() {
      let result = 0
      try {
        result = await this.fbxContract.allowance(cWebModel.mAccount, this.drop.address)
      } catch (err) {
        console.warn(err)
        alert('Error. Fail to approve.')
      }
      return parseInt(result) > 1000
    },
    //开始抽奖
    async onBuy() {
      try {
        //判断账户是否有fbx
        let fbx = await this.fbxContract.balanceof()
        if (fbx < this.drop.price) {
          throw 'no enough FBX'
        }
        //先授权fbx
        const isApproved = await this.isApprovedFBX()
        if (!isApproved) {
          await this.fbxContract.approve(this.drop.address, 10000000)
        }
        //抽奖
        this.BuyResult = await this.drop.draw(this.carnivalContract)
        await this.getContractInfo()
        this.prizeDialogVisible = true
      } catch (err) {
        console.log(err)
        alert(err)
      }
    },

    //开盲盒
    async onDraw() {
      try {
        this.contractInfo.ownNum = await this.drop.getOwnNum(this.carnivalContract)
        if (this.contractInfo.ownNum == 0) {
          return
        }
        let tokenId = await this.carnivalContract.tokenOfOwnerByIndex(0)
        await this.carnivalContract.randGift(tokenId)
        let towerNFT = new FBXTurretNFT(this.drop.tokenResult)
        let num = await towerNFT.balanceof()
        let towerId = await towerNFT.tokenOfOwnerByIndex(num - 1)
        let tokenURI = await towerNFT.tokenURI(towerId)
        Object.assign(this.BuyResult, {
          showText: "You've got " + tokenURI.degreeName + 'Tower NFT. ID #' + towerId,
          showImg: tokenURI.image,
          imgStyle: 'top: 0; left: 11%;',
        })
        this.prizeDialogVisible = true
        this.contractInfo.ownNum = await this.drop.getOwnNum(this.carnivalContract)
      } catch (err) {
        console.log(err)
        alert(err?.message || 'Failed!')
      }
    },

    async onOpen() {
      try {
        const nftContract = this.drop.getNftContract()
        const isApproved = await nftContract.isApprovedForAll(
          cWebModel.mAccount || '',
          this.drop.address
        )
        if (!isApproved) {
          await nftContract.setApprovalForAll(this.drop.address, true)
        }

        const num = await nftContract.balanceof()
        const tokenId = await nftContract.tokenOfOwnerByIndex(num - 1)
        const receipt = await this.carnivalContract.SellToken(tokenId)
        const txHash = receipt.transactionHash

        const url = `${process.env.VUE_APP_HAM_FANTASY_URL || ''}/buy/open_xbox`
        const params = new URLSearchParams()
        params.append('userAddr', cWebModel.mAccount || '')
        params.append('txhash', txHash || '')
        const res = await this.$axios.post(url, params)
        if (res.code != 200) {
          alert(res.msg)
          return
        }

        this.BuyResult = await this.drop.getPrize(res.data.prize)
        this.prizeDialogVisible = true
        this.contractInfo.ownNum = await nftContract.balanceof()
      } catch (err) {
        console.log(err)
        alert(err?.message || 'Failed!')
      }
    },

    //获取必要的合约信息
    async getContractInfo() {
      try {
        this.contractInfo = await this.drop.getInfo(this.carnivalContract)
      } catch (err) {
        console.log(err)
        alert(err)
      }
    },
    //初始化
    async init({ accounts, chainId } = {}) {
      if (!accounts || !accounts.length) {
        return
      }
      if (!isSupportedChain(chainId)) {
        alert('Please change your chain provider to the Binance Smart Chain (or testnet)')
        return
      }
      //初始化合约
      this.chainId = chainId

      this.fbxContract = getFbxContract()
      this.drop = DROPS[this.keyMapName]
      this.carnivalContract = this.drop.getContract(chainId)
      await this.getContractInfo()
    },
  },
  mounted() {
    //获取和判断路由参数
    this.keyMapName = this.$route.query.id || KEYS.nftbox
    if (this.keyMapName.length == 0) {
      alert('Please select a id')
      return
    }

    emitter.on('connect-wallet', this.init)
    this.$root.connectWallet()
  },
  unmounted() {
    emitter.off('connect-wallet', this.init)
  },
}
</script>

<style lang="scss">
@import './market.detail.scss';

.market-detail-page.drops-detail-page {
  .market-detail-image {
    .image {
      max-width: 76%;
      max-height: 80%;
      @media (max-width: 768.89px) {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .remaining {
    float: right;
    line-height: 1;
    font-size: 0.7rem;
    font-weight: normal;
    .icon {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
    @media (max-width: 768.89px) {
      font-size: 0.6rem;
      .icon {
        margin-right: 0.25rem;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
  .quantity {
    font-size: 0.8rem;
    margin: 1rem 0;
    .icon {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
    .yellow {
      color: #efb35c;
    }
    @media (max-width: 768.89px) {
      font-size: 0.6rem;
      margin: 0.7rem 0;
      .icon {
        margin-right: 0.25rem;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
  .xbox-remaining {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    line-height: 2rem;
    border-bottom: 0.05rem solid #5f6175;
    @media (max-width: 768.89px) {
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      line-height: 1rem;
      font-size: 0.6rem;
    }
    .icon {
      height: 1rem;
      margin-right: 1rem;
      @media (max-width: 768.89px) {
        height: 0.6rem;
        margin-right: 0.5rem;
        vertical-align: -0.05rem;
      }
    }
  }
  .btn-wraps {
    display: flex;
    margin-bottom: 1rem;
    .fbx-btn {
      position: relative;
    }
    .own-num {
      position: absolute;
      line-height: 1.6rem;
      color: #fff;
      font-size: 0.7rem;
      left: 0;
      width: 100%;
      @media (max-width: 768.89px) {
        font-size: 0.5rem;
      }
    }
    .btn-xbox {
      background-color: #33f0f1;
      border-color: #33f0f1;
      color: #353644;
      .icon {
        margin-right: 0.5rem;
        width: 0.9rem;
        vertical-align: -0.2rem;
        @media (max-width: 768.89px) {
          margin-right: 0.2rem;
          width: 0.5rem;
          vertical-align: middle;
        }
      }
    }
  }

  .prizes-wrap {
    .icon-list {
      padding: 0.6rem 0;
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        align-items: center;
        width: 32%;
        margin: 0 2% 0.4rem 0;
        padding: 0.2rem;
        background-color: #262734;
        border-radius: 1.2rem;
        border: 0.1rem solid #545e91;
        box-sizing: border-box;
        &:nth-child(3n) {
          margin-right: 0;
        }
        img {
          width: 100%;
        }
      }
      @media (max-width: 768.89px) {
        padding: 0.4rem 0;
        li {
          width: 32%;
          margin: 0 2% 0.4rem 0;
          padding: 0.55rem;
          border-radius: 0.6rem;
          border: 0.05rem solid #545e91;
        }
      }
    }
  }
  .description-wrap {
    ul {
      margin-top: 0.5rem;
      li {
        font-size: 0.9rem;
        margin-bottom: 1.2rem;
      }
      @media (max-width: 768.89px) {
        margin-top: 0.35rem;
        li {
          font-size: 0.6rem;
          margin-bottom: 0.6rem;
        }
      }
    }
  }
}
</style>
