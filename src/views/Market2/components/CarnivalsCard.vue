<template>
  <div :class="['comp-carnivals']">
    <div :class="['display']">
      <div
        class="image"
        :style="{
          backgroundImage: `url('${carnivals.image}')`,
        }"
      ></div>
      <div :class="['status', carnivals.isEnd ? 'end' : '', carnivals.isNew ? 'new' : '']"></div>
      <div class="prizes">
        <img class="prize" v-for="prize in carnivals.prizes" :key="prize" :src="prize.image" />
      </div>
    </div>
    <div class="info">
      <div class="name">
        <span :class="['text', carnivals.isCert ? 'cert' : '']">{{ carnivals.name }}</span>
      </div>
      <div class="price">
        <img class="icon" :src="carnivals.tokenLogo" />
        <span class="text">{{ carnivals.price }}</span>
        <span class="unit">{{ carnivals.token }}</span>
        <img class="chain" :src="carnivals.chainLogo" />
      </div>
      <div class="start">
        <span class="label">{{ $t('Carnival2.StartTime') }}</span>
        <span class="time">{{ carnivals.startTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carnivals: Object,
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-carnivals {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 1.2rem 0.05rem rgba(91, 92, 97, 0.065);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 1.2rem 0.05rem rgba(91, 92, 97, 0.13);
  }
  .display {
    position: relative;
    padding-top: 100%;
    background: linear-gradient(#000, #1e005f) center center / cover no-repeat;
    border-radius: 0.5rem 0.5rem 0 0;
    .image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: center 10% / 80% no-repeat;
    }
    .prizes {
      position: absolute;
      bottom: 2%;
      left: 1%;
      right: 1%;
      display: flex;
      .prize {
        display: block;
        flex: 1;
        width: 0;
      }
    }
    .status {
      display: none;
      position: absolute;
      top: 0.5rem;
      left: -1.5rem;
      z-index: 10;
      width: 5rem;
      line-height: 1.5;
      text-align: center;
      font-size: 0.7rem;
      color: $color-white;
      transform: rotate(-45deg);
      &.end {
        display: block;
        background-color: $color-gray;
        &::before {
          content: 'ended';
        }
      }
      &.new {
        display: block;
        background-color: $color-red;
        &::before {
          content: 'new';
        }
      }
    }
  }
  .info {
    position: relative;
    line-height: 1.5;
    background-color: $color-white;
    border-radius: 0 0 0.5rem 0.5rem;
    .name {
      padding: 0.4rem 0.6rem;
      border-bottom: 0.05rem solid rgba($color-border, 0.7);
      font-size: 0;
      font-weight: 500;
      @media (max-width: 768.89px) {
        padding: 0.25rem 0.3rem;
      }
      .text {
        @include ellipsis(1);
        @include text-with-cert(0.3rem, 0.6rem, 0.6rem);
        font-size: 0.9rem;
        @media (max-width: 768.89px) {
          font-size: 0.8rem;
        }
      }
    }
    .price {
      padding: 0.45rem 0.6rem 0.1rem;
      font-size: 1rem;
      overflow: hidden;
      @media (max-width: 768.89px) {
        padding: 0.1rem 0.3rem 0;
      }
      .icon {
        margin-right: 0.3rem;
        display: inline-block;
        width: 0.7rem;
        height: 0.7rem;
        vertical-align: -0.05rem;
      }
      .text {
        font-weight: 500;
        vertical-align: middle;
      }
      .unit {
        margin-left: 0.3rem;
        font-size: 0.6rem;
        vertical-align: middle;
      }
      .chain {
        float: right;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: $color-placeholder6;
        overflow: hidden;
        @media (max-width: 768.89px) {
          margin: 0.35rem 0 0 0;
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }
    .start {
      padding: 0.1rem 0.6rem 0.7rem;
      font-size: 0.6rem;
      color: $color-gray;
      @media (max-width: 768.89px) {
        padding: 0.1rem 0.3rem 0.3rem;
        font-size: 0.5rem;
      }
      .label {
        margin-right: 0.4rem;
      }
    }
  }
}
</style>
