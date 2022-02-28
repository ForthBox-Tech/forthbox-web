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
      font-size: 0.65rem;
    }
    .lv {
      position: absolute;
      top: 0.7em;
      left: 0.7em;
      &::before {
        content: '';
        margin-right: 0.3rem;
        display: inline-block;
        width: 1em;
        height: 1em;
        background: url('~@/assets/page-market2/comp-card/icon-lv.png') 0 0 / 100% no-repeat;
        vertical-align: -0.15em;
      }
    }
    .status {
      position: absolute;
      top: 0.5rem;
      right: -1.5rem;
      width: 5rem;
      line-height: 1.5;
      text-align: center;
      color: $color-white;
      background-color: $color-blue;
      transform: rotate(45deg);
    }
  }
  .info {
    padding: 0 0 0.4rem 0;
  }
  .row {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    line-height: 1.3;
    padding: 1.5% 4.5% 1.5% 4.5%;
    @media (max-width: 768.89px) {
      font-size: 0.65rem;
    }
  }
  .name {
    flex: 1;
    font-size: 1.2em;
  }
  .count {
    min-width: 2rem;
    padding: 0 0.1rem;
    line-height: 1.3;
    text-align: center;
    font-size: 0.85em;
    color: $color-white;
    background-color: #ccc;
    border-radius: 1rem;
    @media (max-width: 768.89px) {
      min-width: 1.2rem;
    }
  }
  .label {
    flex: 1;
  }
  .value {
    padding-left: 0.5rem;
    &::before {
      content: '';
      margin-right: 0.2rem;
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      background: url('~@/assets/common/token-fbx.png') 0 0 / 100% no-repeat;
      vertical-align: -0.05rem;
      @media (max-width: 768.89px) {
        width: 0.5rem;
        height: 0.5rem;
        vertical-align: 0;
      }
    }
  }
  .cart {
    position: absolute;
    top: 48%;
    right: -3.5%;
    display: flex;
    width: 12%;
    background: $color-white url('~@/assets/page-market2/comp-card/icon-cart.png') center center /
      50% no-repeat;
    border: 0.05rem solid #ccc;
    border-radius: 50%;
    box-shadow: 0 0 0.6rem 0.05rem rgba(91, 92, 97, 0.13);
    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }
}
</style>

