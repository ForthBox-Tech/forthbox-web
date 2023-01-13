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

