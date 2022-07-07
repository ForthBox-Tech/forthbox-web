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

