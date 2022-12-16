<template>
  <div class="market-detail-page market-place-detail">
    <DetailImage :image="nftDetail.image" :stamp="isSoldOut ? 'Sold out' : ''"></DetailImage>
    <DetailTransaction
      class="forthbox-wrap"
      :title="nftDetail.showName || ''"
      :logo="require('@/assets/common/logo.png')"
    >
      <div class="price-middle">
        <div class="fixed-price">
          <div class="card-title">{{ $t('Market.Unitprice') }}</div>
          <div class="card-num">{{ nftDetail.price || 0 }}</div>
          <div class="price-total">
            <span>{{ $t('Market.TotalPrice') }} </span>
            <img class="price-logo" src="@/assets/page-market/drops-price-icon.png" />
            <span>{{ nftDetail.totalPrice || 0 }}</span>
          </div>
        </div>
        <div class="count">
          <div class="card-title">{{ $t('Market.Count') }}</div>
          <div class="card-num">{{ nftDetail.amount || 0 }}</div>
        </div>
      </div>
      <div class="btn-wrap">
        <Button :disabled="isApproved" loader :handler="onApprove">
          {{ $t('Market.Approve') }}
        </Button>
        <Button :disabled="!isApproved || isSoldOut || isDamaged" loader :handler="onBuy">
          {{ $t('Market.BuyNow') }}
        </Button>
      </div>
    </DetailTransaction>
    <DetailPanel
      v-if="nftDetail.properties"
      :title="$t('Market.Properties')"
      :list="nftDetail.properties.map((info) => ({ label: info.name, value: info.value }))"
    ></DetailPanel>
    <DetailPanel
      v-if="nftDetail.description"
      :title="$t('Market.Description')"
      :list="[{ value: nftDetail.description || '' }]"
    ></DetailPanel>
    <DetailPanel
      :title="$t('Market.Details')"
      :list="[
        { label: $t('Market.ContractAddress'), value: transformAddress(nftDetail.address || '') },
        { label: $t('Market.TokenID'), value: nftDetail.tokenId || '' },
        { label: $t('Market.TokenStandard'), value: nftDetail.standard || '' },
        { label: $t('Market.Blockchain'), value: nftDetail.blockChain || '' },
      ]"
    ></DetailPanel>
    <DetailPanel></DetailPanel>
  </div>

  <!-- <Buynow :visible="buyNowVisible" @hide="closeBuyNowDialog"></Buynow> -->
</template>

<script>
import Button from '@/components/Button.vue'
import DetailImage from './DetailImage.vue'
import DetailTransaction from './DetailTransaction.vue'
import DetailPanel from './DetailPanel.vue'
import emitter from '@/common/js/emitter'
import { isSupportedChain } from '@/web3/wallet'
import { getFbxContract } from '@/web3/contract.factory'
import { getNftByType, NFT721Detail, NFT1155Detail } from '@/models/market.model'

export default {
  name: 'MarketPlaceDetail',
  components: {
    Button,
    DetailImage,
    DetailTransaction,
    DetailPanel,
  },
  data() {
    return {
      isApproved: false,
      isSoldOut: false,
      isDamaged: false,
      nftDetail: {},
    }
  },
  methods: {
    transformAddress(address) {
      return address ? address.substr(0, 6) + '...' + address.substr(-6) : ''
    },

    async init({ accounts, chainId } = {}) {
      if (!accounts || !accounts.length) {
        return
      }
      if (!isSupportedChain(chainId)) {
        alert('Please change your chain provider to the Binance Smart Chain (or testnet)')
        return
      }
      this.tokenId = this.$route.query.id
      const type = this.$route.query.type
      const nftItem = getNftByType(type)
      this._swapAddr = nftItem.swapAddr

      this._detailManager = nftItem.ercType == 1155 ? NFT1155Detail : NFT721Detail
      this._detailManager.init(nftItem.nftAddr, this._swapAddr, type)
      this._fbxContract = getFbxContract()
      this._marketContract = nftItem.getMarketContract()
      this._nftSwapContract = nftItem.getSwapContract(this._swapAddr)
      await this.getNftDetail(true, this._marketContract, this.tokenId)
      this.getApprovedStatus()
      this.isInMarket()
    },
    async getNftDetail(...args) {
      const { nftDetail, isDamaged } = await this._detailManager.getNftDetail(...args)
      this.nftDetail = nftDetail
      // this.isDamaged = isDamaged
    },
    //是否授权
    async getApprovedStatus() {
      let result = 0
      try {
        result = await this._fbxContract.allowance(cWebModel.mAccount, this._swapAddr)
      } catch (err) {
        console.warn(err)
        alert('Error. Fail to approve.')
      }
      const approvedNum = parseInt(result) - this.nftDetail.totalPrice
      this.isApproved = approvedNum >= 0 && approvedNum < 10
    },
    //点击授权
    async onApprove() {
      if (this.isApproved) {
        return
      }
      try {
        await this._fbxContract.approve(this._swapAddr, this.nftDetail.totalPrice + 1)
        this.isApproved = true
      } catch (err) {
        console.log(err)
        alert('Error. Fail to approve.')
        this.isApproved = false
      }
    },
    //是否已经被购买
    async isInMarket() {
      let result
      try {
        result = await this._detailManager.isInMarket(this._marketContract, this.tokenId)
        if (result == false) {
          this.isSoldOut = true
          return true
        }
      } catch (err) {
        console.warn(err)
      }
      return false
    },
    async isUserOwn() {
      let result
      try {
        result = await this._marketContract.ownerOf(this._swapAddr, this.tokenId)
        if (cWebModel.mAccount == result) {
          alert('Cannot pay for the order set by yourself.')
          return true
        }
      } catch (err) {
        console.log(err)
      }
      return false
    },
    //点击购买
    async onBuy() {
      if (await this.isInMarket()) {
        return
      }
      if (await this.isUserOwn()) {
        return
      }
      try {
        await this._nftSwapContract.buy(this.tokenId)
        this.isSoldOut = true
        alert('Success.')
      } catch (err) {
        console.log(err)
        alert('Error. Fail to buy.')
      }
    },
  },
  mounted() {
    if (!this.$route.query.id) {
      alert('Error. Url parameter requires id.')
      return
    }

