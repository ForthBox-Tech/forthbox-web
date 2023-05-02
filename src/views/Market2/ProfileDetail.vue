<template>
  <div class="market-profile-detail page-wrap2">
    <section class="main main-wrap2">
      <DetailImage :image="image" :stamp="forbiddenText"></DetailImage>
      <DetailBoard :name="name" :tags="tags">
        <DetailOnSale
          v-if="query.scene === 'onsale'"
          :contractType="query.contractType"
          :contractAddr="query.contractAddr"
          :tokenId="query.tokenId"
          :swapId="query.swapId"
          :erc20Type="erc20Type"
          :unitPrice="unitPrice"
          :amount="amount"
          :isOnSale="isOnSale"
          :isValid="isValid"
        ></DetailOnSale>
        <DetailCollections
          v-else
          :contractType="query.contractType"
          :contractAddr="query.contractAddr"
          :tokenId="query.tokenId"
          :max="max"
          :isOnSale="isOnSale"
          :forbiddenText="forbiddenText"
        ></DetailCollections>
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
import DetailImage from './components/DetailImage.vue'
import DetailBoard from './components/DetailBoard.vue'
import DetailSection from './components/DetailSection.vue'
import DetailCollections from './profile-modules/DetailCollections.vue'
import DetailOnSale from './profile-modules/DetailOnSale.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { BSCSCAN } from '@/web3/contract.constant'
import { transformAddress } from '@/common/js/utils'
import { getSellInfo } from '@/models/market2.model'

export default {
  components: {
    DetailImage,
    DetailBoard,
    DetailSection,
    DetailCollections,
    DetailOnSale,
  },
  props: {},
  data() {
    return {
      erc20Type: '',
      unitPrice: 0,
      totalPrice: 0,
      amount: 1,
      max: 1,

      image: '',
      name: '',
      tags: [],
      desc: '',
      props: [],
      details: [],

      isOnSale: false,
      isValid: false,
      forbiddenText: '',
    }
  },
  computed: {
    query() {
      return this.$route.query || {}
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    _dataHandler(data) {
      data = data || {}
      const nft = data.Nft || {}
      const config = data.Config || {}
      const order = data.Order || {}
      const props = data.Props || []

      this.isOnSale = !!nft.OnSale
      this.isValid = order.ShowStatus == 'ON'
      this.forbiddenText = nft.UnavaiableReason || ''

      this.erc20Type = config.SwapErc20Symbol || ''
      this.unitPrice = order.UnitPrice || 0
      this.totalPrice = order.TotalPrice || 0
      this.amount = order.Amount || nft.Amount || 1 // 订单内NFT的数量，用户拥有的NFT的数量（ERC1155）

      this.image = nft.CoverUrl || ''
      this.name = nft.Name || ''
      this.tags = [
        { label: this.$t('Market2.ID'), value: nft.TokenId ? `#${nft.TokenId}` : '-' },
        { label: this.$t('Market2.Rarity'), value: nft.DegreeName || '-' },
        { label: this.$t('Market2.Quantity'), value: this.amount || 1 },
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
    async _getNftDetail() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/nft/get_detail`
      const params = {
        contract_addr: this.query.contractAddr,
        token_id: this.query.tokenId,
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
    async _getSwapDetail() {
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
      if (this.query.scene === 'onsale') {
        await this._getSwapDetail()
      } else {
        await this._getNftDetail()
        const sellCount = await getSellInfo(this.query.contractAddr, this.query.tokenId)
        this.max = this.amount - (sellCount || 0)
      }
    },
  },
  created() {
    this.$root.connectWallet()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.market-profile-detail {
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
