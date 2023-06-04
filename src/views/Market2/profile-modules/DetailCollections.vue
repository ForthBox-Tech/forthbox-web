<template>
  <div class="price-wrap">
    <div class="board">
      <div class="name">{{ $t('Market.SetUnitPrice') }}</div>
      <div class="setting">
        <Select class="set-select" v-model="unit" :list="TOKENS"></Select>
        <Input class="set-input" v-model="price" placeholder="Please enter the price"></Input>
      </div>
      <div v-if="contractType == 'ERC1155'" class="amount">
        <NumberInput :max="max" v-model="amount"></NumberInput>
      </div>
    </div>
    <div class="board">
      <div class="name">{{ $t('Market.TotalPrice') }}</div>
      <div :class="['value', this.unit.text.toLowerCase()]">
        <span class="text">{{ totalPrice }}</span>
        <span class="unit">{{ this.unit.text }}</span>
      </div>
      <div class="dollar" v-if="dTotalPrice">${{ dTotalPrice }}</div>
    </div>
  </div>
  <div class="btns-wrap">
    <Button
      class="btn-color"
      :disabled="
        !!forbiddenText || (contractType != 'ERC1155' && isOnSale) || isSold || !totalPrice
      "
      loader
      :handler="onSell"
    >
      <img class="icon" src="@/assets/page-market2/comp-detail/btn-buy.png" />
      <span>{{ $t('Market.Sell') }}</span>
    </Button>
    <Button class="btn-stroke" :disabled="isSold" :handler="onTransfer">
      <img
        class="icon"
        :src="
          isSold
            ? require('@/assets/page-market2/comp-detail/btn-exchange-0.png')
            : require('@/assets/page-market2/comp-detail/btn-exchange.png')
        "
      />
      <span>{{ $t('Market2.Transfer') }}</span>
    </Button>
  </div>
  <TransferDialog
    ref="TransferDialog"
    :contractType="contractType"
    :contractAddr="contractAddr"
    :tokenId="tokenId"
  ></TransferDialog>
</template>

<script>
import Select from '@/components/Select.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import NumberInput from '../components/NumberInput.vue'
import TransferDialog from './TransferDialog.vue'
import { TOKENS, sell } from '@/models/market2.model'
import { getFbxPrice } from '../common/helper'

export default {
  name: 'DetailCollections',
  components: {
    Select,
    Input,
    Button,
    NumberInput,
    TransferDialog,
  },
  props: {
    tokenId: String,
    contractType: String, // 可选值：ERC1155、ERC721
    contractAddr: String,
    max: Number,
    isOnSale: {
      type: Boolean,
      default: false,
    },
    forbiddenText: String,
  },
  data() {
    return {
      TOKENS,

      unit: TOKENS[0],
      price: '',
      amount: '1',

      dTotalPrice: 0,

      isSold: false,
    }
  },
  computed: {
    totalPrice() {
      return parseFloat(this.price) * this.amount || 0
    },
  },
  watch: {
    price(newVal, oldVal) {
      // 填入值不合法，设置回旧值
      if (newVal !== '' && !/^\d*($|\.\d*$)/.test(`${newVal}`)) {
        this.$nextTick(() => {
          this.price = oldVal
        })
        return
      }
    },
    async totalPrice(totalPrice) {
      const fbxPrice = await getFbxPrice()
      this.dTotalPrice = (fbxPrice * totalPrice).toFixed(4)
    },
  },
  methods: {
    async onSell() {
      if (!this.price) return

      try {
        await sell(
          this.contractType,
          this.contractAddr,
          this.tokenId,
          this.unit.contract,
          this.totalPrice,
          this.amount
        )
      } catch (err) {
        this.$modal.toast(err.message)
        return
      }

      this.isSold = true
      this.$modal.toast('success')
    },
    onTransfer() {
      this.$refs.TransferDialog.show()
    },
  },
  created() {
    console.log(this.contractAddr)
  },
}
</script>

<style lang="scss" scoped>
// @import '@/common/css/variable.scss';
</style>

