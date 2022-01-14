<template>
  <div :class="['nft-card', nft.invalid ? 'invalid' : '']">
    <div class="image" :style="{ backgroundImage: `url(${nft.image})` }">
      <span class="lv" v-if="nft.level">{{ nft.level }}</span>
      <span class="status" v-if="nft.invalid || nft.status">{{
        nft.invalid ? 'invalid' : nft.status
      }}</span>
    </div>
    <div class="info">
      <div class="row">
        <span class="name">{{ nft.name }}</span>
        <span class="count" v-if="nft.amount">x{{ nft.amount }}</span>
      </div>
      <div class="row" v-if="nft.unitPrice">
        <span class="label">{{ $t('Market.Unitprice') }}</span>
        <span class="value">{{ nft.unitPrice.toFixed(2) }}</span>
      </div>
      <div class="row" v-if="nft.totalPrice">
        <span class="label">{{ $t('Market.TotalPrice') }}</span>
        <span class="value">{{ nft.totalPrice.toFixed(2) }}</span>
      </div>
    </div>
    <a v-if="cartEnable" class="cart" @click.stop="onCart"></a>
  </div>
</template>

<script>
import emitter from '@/common/js/emitter'
import { addCart } from '@/models/market2.model'

export default {
  name: 'NftCard',
  components: {},
  props: {
    nft: Object,
    cartEnable: Boolean,
  },
  methods: {
    async onCart() {
      const nft = this.nft
      if (nft.isOwner) return

      const res = await addCart(nft.swapId)
      if (res.code != 200) {
        this.$modal.toast(res.msg)
        return
      }

      this.$modal.toast('success')
      this.$emit('cart', nft)
      emitter.emit('cart-update')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.nft-card {
  position: relative;
  display: inline-block;
  background-color: $color-white;
  border-radius: 0.5rem;
  box-shadow: 0 0 1.2rem 0.05rem rgba(91, 92, 97, 0.08);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0.6rem 0.05rem rgba(91, 92, 97, 0.16);
  }
  &.invalid {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba($color-black, 0.3);
      border-radius: 0.5rem;
    }
    .image {
      .status {
        background-color: $color-red;
      }
    }
    .cart {
      display: none;
    }
  }
  .image {
    position: relative;
    padding-top: 100%;
    background: center center / 75% no-repeat;
    font-size: 0.7rem;
    overflow: hidden;
    @media (max-width: 768.89px) {
