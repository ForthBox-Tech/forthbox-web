<template>
  <div class="price-wrap">
    <div class="board">
      <div class="name">{{ $t('Market.Unitprice') }}</div>
      <div class="setting">
        <Select class="set-select" v-model="iUnit" :list="TOKENS" disabled></Select>
        <Input
          class="set-input"
          v-model="iUnitPrice"
          placeholder="Please enter the price"
          :disabled="isCanceled || !isValid"
        ></Input>
      </div>
      <div v-if="contractType == 'ERC1155'" class="amount">
        <NumberInput v-model="iAmount" disabled></NumberInput>
      </div>
    </div>
    <div class="board">
      <div class="name">{{ $t('Market.TotalPrice') }}</div>
      <div :class="['value', erc20Type.toLowerCase()]">
        <span class="text">{{ iTotalPrice }}</span>
        <span class="unit">{{ erc20Type }}</span>
      </div>
      <div class="dollar" v-if="dTotalPrice">${{ dTotalPrice }}</div>
    </div>
  </div>
  <div class="btns-wrap">
    <Button class="btn-color" :disabled="isCanceled || !isValid" loader :handler="onEditPrice">
      <img class="icon" src="@/assets/page-market2/comp-detail/btn-edit.png" />
      <span>{{ $t('Market2.EditPrice') }}</span>
    </Button>
    <Button class="btn-stroke" :disabled="isCanceled" loader :handler="onCancel">
      <img
        class="icon"
        :src="
          isCanceled
            ? require('@/assets/page-market2/comp-detail/btn-back-0.png')
            : require('@/assets/page-market2/comp-detail/btn-back.png')
        "
      />
      <span>{{ $t('Market.Revoke') }}</span>
    </Button>
  </div>
</template>

<script>
import Select from '@/components/Select.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import NumberInput from '../components/NumberInput.vue'
import { TOKENS, cancel, editPrice } from '@/models/market2.model'
import { getFbxPrice } from '../common/helper'

export default {
  name: 'DetailOnSale',
  components: {
    Select,
    Input,
    Button,
    NumberInput,
  },
  props: {
    swapId: String,
    tokenId: String,
    contractType: String, // 可选值：ERC1155、ERC721
    contractAddr: String,
    erc20Type: String,
    unitPrice: Number,
    amount: Number,
    isOnSale: {
      type: Boolean,
      default: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      TOKENS,

      iUnitPrice: '0',
      dTotalPrice: '0',
      iAmount: '1',

      isCanceled: false,
    }
  },
  computed: {
    iUnit() {
      const token = TOKENS.find((item) => item.text === this.erc20Type)
      return token || TOKENS[0]
    },
    iTotalPrice() {
      const unitPrice = this.iUnitPrice || 0
      const amount = this.iAmount || 1
      return parseInt(unitPrice * amount * 100) / 100
    },
  },
  watch: {
    unitPrice(val) {
      this.iUnitPrice = `${val}`
    },
    amount(val) {
      this.iAmount = `${val}`
    },
    async iTotalPrice(val) {
      const fbxPrice = await getFbxPrice()
      this.dTotalPrice = (fbxPrice * val).toFixed(4)
    },
    isOnSale() {
      this.isCanceled = !this.isOnSale
    },
  },
  methods: {
    async onEditPrice() {
      if (!this.swapId) return
      if (!(this.iUnitPrice < this.unitPrice)) {
        this.$modal.toast('The new price must be less than the original price')
        return
      }

      try {
        await editPrice(this.swapId, this.iTotalPrice)
      } catch (err) {
        this.$modal.toast(err.message)
        return
      }

      this.$modal.toast('success')
    },
    async onCancel() {
      if (!this.swapId) return

      try {
        await cancel(this.swapId)
      } catch (err) {
        this.$modal.toast(err.message)
        return
      }

      this.isCanceled = true
      this.$modal.toast('success')
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
// @import '@/common/css/variable.scss';
</style>

