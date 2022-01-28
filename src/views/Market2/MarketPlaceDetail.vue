<template>
  <div class="market-marketplace-detail page-wrap2">
    <section class="main main-wrap2">
      <DetailImage
        :image="image"
        :stamp="(isSoldOut && 'Sold out') || (isOwner && 'Owner') || ''"
      ></DetailImage>
      <DetailBoard :name="name" :tags="tags">
        <div class="price-wrap">
          <div class="board">
            <div class="name">{{ $t('Market.Unitprice') }}</div>
            <div class="value">
              <span class="text">{{ unitPrice || 0 }}</span>
              <span class="unit">{{ erc20Type }}</span>
            </div>
            <div class="dollar" v-if="dUnitPrice">${{ dUnitPrice }}</div>
          </div>
          <div class="board">
            <div class="name">{{ $t('Market.TotalPrice') }}</div>
            <div class="value">
              <span class="text">{{ totalPrice || 0 }}</span>
              <span class="unit">{{ erc20Type }}</span>
            </div>
            <div class="dollar" v-if="dTotalPrice">${{ dTotalPrice }}</div>
          </div>
        </div>
        <div class="btns-wrap">
          <Button class="btn-color" :disabled="isOwner || isSoldOut" loader :handler="onBuy">
            <img class="icon" src="@/assets/page-market2/comp-detail/btn-buy.png" />
            <span>{{ $t('Market.BuyNow') }}</span>
          </Button>
          <Button class="btn-stroke" :disabled="isOwner || isSoldOut" loader :handler="onCart">
            <img
              class="icon"
              :src="
                isOwner || isSoldOut
                  ? require('@/assets/page-market2/comp-detail/btn-cart-0.png')
                  : require('@/assets/page-market2/comp-detail/btn-cart.png')
              "
            />
            <span>{{ $t('Market2.AddToCart') }}</span>
          </Button>
        </div>
      </DetailBoard>
    </section>
    <section class="detail main-wrap2">
      <DetailSection
        :icon="require('@/assets/page-market2/comp-detail/section-props.png')"
        :title="$t('Market.Properties')"
        :list="props"
      ></DetailSection>
      <DetailSection
        :icon="require('@/assets/page-market2/comp-detail/section-desc.png')"
        :title="$t('Market.Description')"
        :text="desc"
      >
      </DetailSection>
      <DetailSection
        :icon="require('@/assets/page-market2/comp-detail/section-details.png')"
        :title="$t('Market.Details')"
        :list="details"
      ></DetailSection>
    </section>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import DetailImage from './components/DetailImage.vue'
import DetailBoard from './components/DetailBoard.vue'
import DetailSection from './components/DetailSection.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { BSCSCAN } from '@/web3/contract.constant'
import { transformAddress } from '@/common/js/utils'
import { addCart, buy } from '@/models/market2.model'
import { getFbxPrice } from './common/helper'
import emitter from '@/common/js/emitter'

export default {
  components: {
    Button,
    DetailImage,
    DetailBoard,
    DetailSection,
  },
  data() {
    return {
      erc20Type: '',
      erc20Addr: '',

      unitPrice: 0,
      totalPrice: 0,
      dUnitPrice: 0,
      dTotalPrice: 0,

      image: '',
      name: '',
      tags: [],
      desc: '',
      props: [],
      details: [],

      isSoldOut: false,
      isOwner: false,
    }
  },
  computed: {
    query() {
      return this.$route.query || {}
    },
  },
  watch: {
    async unitPrice(val) {
      const fbxPrice = await getFbxPrice()
      this.dUnitPrice = (fbxPrice * val).toFixed(4)
    },
    async totalPrice(val) {
      const fbxPrice = await getFbxPrice()
      this.dTotalPrice = (fbxPrice * val).toFixed(4)
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    async onBuy() {
      if (!this.query.swapId) return

      try {
        await buy(this.query.swapId, this.erc20Type, this.erc20Addr, this.totalPrice)
      } catch (err) {
        this.$modal.toast(err.message)
        return
      }

      this.isSoldOut = true
      this.$modal.toast('success')
    },
    async onCart() {
      const res = await addCart(this.query.swapId)
      if (res.code != 200) {
        this.$modal.toast(res.msg)
        return
      }

      this.$modal.toast('success')
      emitter.emit('cart-update')
    },

    _dataHandler(data) {
      data = data || {}
      const nft = data.Nft || {}
      const config = data.Config || {}
      const order = data.Order || {}
      const props = data.Props || []

      this.isOwner = Number(order.OwnerAddr) == Number(this.$root.userWallet)

      this.erc20Type = config.SwapErc20Symbol || ''
      this.erc20Addr = config.SwapErc20Addr || ''
      this.unitPrice = order.UnitPrice || 0
      this.totalPrice = order.TotalPrice || 0

      this.image = nft.CoverUrl || ''
      this.name = nft.Name || ''
      this.tags = [
        { label: this.$t('Market2.ID'), value: nft.TokenId ? `#${nft.TokenId}` : '-' },
        { label: this.$t('Market2.Rarity'), value: nft.DegreeName || '-' },
        { label: this.$t('Market2.Quantity'), value: order.Amount || 1 },
        { label: this.$t('Market2.Level'), value: nft.TokenLevel || '-' },
      ]
      this.desc = config.Introduce || ''
      this.props = [{ label: this.$t('Market2.Rarity'), value: nft.DegreeName || '' }].concat(props)
      this.details = [
        {
          label: this.$t('Market.ContractAddress'),
          value: nft.ContractAddr ? transformAddress(nft.ContractAddr) : '',
          link: nft.ContractAddr ? `${BSCSCAN}/address/${nft.ContractAddr}` : '',
        },
        { label: this.$t('Market.TokenID'), value: nft.TokenId || '' },
        {
          label: this.$t('Market.TokenStandard'),
          value: (nft.ContractType || '').replace('ERC', 'BEP') || '',
        },
        { label: this.$t('Market.Blockchain'), value: (config.Chain || '').toUpperCase() },
      ]
    },
    async _getDetail() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/market_place/swap_order/detail/query`
      const params = {
        swapId: this.query.swapId,
      }

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        this._dataHandler()
        console.warn(res.msg)
        return
      }

      const data = res.data || {}
      this._dataHandler(data)
    },
    async init() {
      await this._getDetail()
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.market-marketplace-detail {
  .main {
    display: flex;
    align-items: center;
    @media (max-width: 768.89px) {
      display: block;
    }
  }
  .detail {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3vw;
    margin-bottom: 2rem;
    @media (max-width: 768.89px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
