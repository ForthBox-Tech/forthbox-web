<template>
  <div class="market-detail-page market-collection-detail" v-bind="$attrs">
    <DetailImage :image="nftDetail.image" :stamp="isBlack ? 'Blacklist' : ''"></DetailImage>
    <DetailTransaction
      class="forthbox-wrap"
      :title="nftDetail.showName || ''"
      :logo="require('@/assets/common/logo.png')"
    >
      <div class="price-middle">
        <div class="fixed-price" v-if="scene === 'onSale'">
          <div class="card-title">{{ $t('Market.Unitprice') }}</div>
          <div class="card-num">{{ nftDetail.price || 0 }}</div>
          <div class="price-total">
            <span>{{ $t('Market.TotalPrice') }}</span>
            <img class="price-logo" src="@/assets/page-market/drops-price-icon.png" />
            <span>{{ nftDetail.totalPrice || 0 }}</span>
          </div>
        </div>
        <div class="set-count-wrap" v-if="scene !== 'onSale' && ercType == 1155">
          <div class="card-title">{{ $t('Market.Count') }}</div>
          <DigitalInput
            class="card-count"
            :max="parseInt(nftDetail.amount) || 0"
            v-model="swapNum"
          ></DigitalInput>
        </div>
        <div class="count" v-else>
          <div class="card-title">{{ $t('Market.Count') }}</div>
          <div class="card-num">{{ nftDetail.amount || 0 }}</div>
        </div>
        <template v-if="scene == 'collections'">
          <a class="btn-transfer" @click="onShowTransferDialog" title="transfer"></a>
        </template>
      </div>
      <template v-if="scene === 'collections'">
        <div class="set-price-wrap">
          <div class="title">{{ $t('Market.SetUnitPrice') }}</div>
          <div class="set-wrap">
            <input type="text" v-model="swapPrice" />
          </div>
        </div>
        <div class="total-wrap" v-if="ercType == 1155">
          {{ $t('Market.TotalPrice') }}:
          {{ Math.floor((swapNum || 0) * (swapPrice || 0) * 100) / 100 }}
        </div>
        <div class="btn-wrap">
          <Button :disabled="isApproved" loader :handler="onApprove">
            {{ $t('Market.Approve') }}
          </Button>
          <Button
            :disabled="!isApproved || isOnSale || isBlack || !isActiveSell || isDamaged"
            loader
            :handler="onSell"
          >
            {{ $t('Market.Sell') }}
          </Button>
        </div>
        <div class="btn-tips" v-if="isDamaged">
          <div class="text"></div>
          <div class="text">Health is not 100%</div>
        </div>
      </template>
      <div class="btn-wrap" v-if="scene === 'onSale'">
        <Button :disabled="!isApproved || !isOnSale" loader :handler="onPullOff">
          {{ $t('Market.Revoke') }}
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

  <Transfer
    ref="transfer"
    :enable-amount="ercType == 1155"
    :max="parseInt(nftDetail.amount) || 0"
    :handler="onTransfer"
  ></Transfer>
</template>

<script>
import Button from '@/components/Button.vue'
import DetailImage from './DetailImage.vue'
import DetailTransaction from './DetailTransaction.vue'
import DetailPanel from './DetailPanel.vue'
import Transfer from './TransferDialog.vue'
import DigitalInput from './DigitalInput.vue'
import emitter from '@/common/js/emitter'
import { getNftByType, NFT721Detail, NFT1155Detail } from '@/models/market.model'
import { isSupportedChain } from '@/web3/wallet'

export default {
  name: 'NftCollectionsDetail',
  components: {
    Button,
    DetailImage,
    DetailTransaction,
    DetailPanel,
    Transfer,
    DigitalInput,
  },
  data() {
    return {
      scene: '',

      ercType: '',

      nftDetail: {},
      isApproved: true,

      isOnSale: false, // 是否出售中
      isBlack: false, // 是否在黑名单（黑名单不可售卖）
      isActiveSell: false, // 是否可以操作
      isDamaged: false, //飞机需要维护

      swapNum: 0,
      swapPrice: 0.0,
    }
  },
  watch: {
    // 输入价格限制最多3位小数
    swapPrice(newVal, oldVal) {
      if (newVal !== '' && !/^\d+\.?\d{0,2}$/.test(`${newVal}`)) {
        this.swapPrice = parseFloat(oldVal) ? oldVal : 0
      }
    },
  },
  methods: {
    transformAddress(address) {
      return address ? address.substr(0, 6) + '...' + address.substr(-6) : ''
    },

    //撤回售卖
    async onPullOff() {
      try {
        await this._detailManager.withdraw(this._swapContract, this.tokenId)
        this.isOnSale = false
        alert('Success.')
      } catch (err) {
        alert('Error. Fail to withdraw.')
        console.log(err)
      }
    },
    //售卖
    async onSell() {
      const price = Math.floor(this.swapPrice * 100) / 100 || 0
      if (price <= 0) {
        alert('Error. The price cannot be null.')
        return
      }
      const num = parseInt(this.swapNum)
      if (this.ercType == 1155) {
        if (num <= 0) {
          alert('Error. The count cannot be null.')
          return
        }
      }
      try {
        await this._detailManager.sell(this._swapContract, this.tokenId, price, num)
        this.isOnSale = true
        this.swapNum = 0
        this.swapPrice = 0
        alert('Success.')
      } catch (err) {
        alert('Error. Fail to sell.')
        console.log(err)
      }
    },

    //点击授权
    async onApprove() {
      if (this.isApproved) {
        return
      }
      try {
        await this._detailManager.setSwapApproval(this._nftContract)
        this.isApproved = true
      } catch (err) {
        console.error(err)
        alert('Error. Fail to approve.')
        this.isApproved = false
      }
    },

    onShowTransferDialog() {
      this.$refs.transfer.show()
    },
    async onTransfer(address, amount) {
      let result = false
      try {
        await this._detailManager.transfer(
          this._nftContract,
          address,
          this.nftDetail.tokenId,
          amount
        )
        alert('success')
        result = true
      } catch (err) {
        alert(err.message)
      }
      return result
    },

    //是否已授权
    async isApproveSwap() {
      let result = false
      try {
        result = await this._detailManager.isApproveSwap(this._nftContract)
      } catch (err) {
        console.log(err)
      }
      this.isApproved = result
    },
    // 是否在市场售卖中
    async isInMarket() {
      let result = false
      try {
        result = await this._detailManager.isInMarket(
          this._marketContract,
          this.tokenId,
          this.scene
        )
      } catch (err) {
        console.log(err)
      }
      this.isOnSale = result
    },
    async getNftDetail(...args) {
      const { nftDetail, isBlack, isDamaged } = await this._detailManager.getNftDetail(...args)
      this.nftDetail = nftDetail
      this.isBlack = isBlack
      this.isDamaged = isDamaged
    },
    init({ accounts, chainId } = {}) {
      if (!accounts || !accounts.length) {
        return
      }
      if (!isSupportedChain(chainId)) {
        alert('Please change your chain provider to the Binance Smart Chain (or testnet)')
        return
      }

      this.tokenId = this.$route.query.id
      this.scene = this.$route.query.scene
      const type = this.$route.query.type
      const nftItem = getNftByType(type)
      this.ercType = nftItem.ercType

      this._detailManager = nftItem.ercType == 1155 ? NFT1155Detail : NFT721Detail
      this._detailManager.init(nftItem.nftAddr, nftItem.swapAddr, type)

      this._marketContract = nftItem.getMarketContract()
      this._swapContract = nftItem.getSwapContract(nftItem.swapAddr)
      this._nftContract = nftItem.getNftContract(nftItem.nftAddr)

      Promise.all([
        this.isApproveSwap(),
        this.isInMarket(),
        this.getNftDetail(this.scene == 'onSale', this._marketContract, this.tokenId),
      ])
        .catch((err) => {
          console.error(err)
        })
        .then(() => {
          this.isActiveSell = true
        })
    },
  },
  mounted() {
    if (!this.$route.query.id) {
      alert('Error. Url parameter requires id.')
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

.market-detail-page.market-collection-detail {
  .forthbox-wrap {
    .price-logo {
      width: 1rem;
      margin: 0 0.5rem 0 0.8rem;
      @media (max-width: 768.89px) {
        width: 0.6rem;
        margin: 0 0.3rem 0 0.4rem;
      }
    }
    .set-count-wrap {
      .card-count {
        margin: 1rem 0 0;
      }
    }
    .set-price-wrap {
      margin-top: 0.9rem;
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      .set-wrap {
        flex: 1;
        margin-left: 1rem;
        input {
          margin: 0;
          outline: 0;
          border: 0 none;
          box-sizing: border-box;
          padding: 0 1rem;
          width: 100%;
          line-height: 2.2rem;
          background-color: #25262f;
          color: #fff;
          font-size: 0.9rem;
          border-radius: 0.35rem;
        }
      }
      @media (max-width: 768.89px) {
        margin-top: 0.6rem;
        font-size: 0.6rem;
        .set-wrap {
          margin-left: 0.7rem;
          input {
            padding: 0 0.7rem;
            width: 100%;
            line-height: 1.6rem;
            background-color: #25262f;
            color: #fff;
            font-size: 0.65rem;
            border-radius: 0.2rem;
          }
        }
      }
    }
    .price-middle {
      position: relative;
      display: flex;
      .fixed-price {
        flex: 1;
        margin-right: 1.2rem;
        padding-right: 1.2rem;
        border-right: 0.05rem solid #5f6175;
        @media (max-width: 768.89px) {
          padding-right: 0.6rem;
        }
      }
      .count {
        min-width: 4rem;
        .card-num {
          &::before {
            display: none;
          }
        }
      }
      .btn-transfer {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        padding: 0.5rem;
        width: 1rem;
        height: 1rem;
        background: url('~@/assets/page-market/detail-transfer.png') center center no-repeat;
        background-size: 1rem;
        cursor: pointer;
      }
    }
    .total-wrap {
      margin: 1rem 0;
    }
  }
  .btn-tips {
    margin-top: 0.5rem;
    display: flex;
    .text {
      flex: 1;
      text-align: center;
      font-size: 0.7rem;
      color: #f0541e;
      @media (max-width: 768.89px) {
        font-size: 0.5rem;
      }
    }
  }
}
</style>

