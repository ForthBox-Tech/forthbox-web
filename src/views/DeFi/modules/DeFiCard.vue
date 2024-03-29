<template>
  <div :class="['comp-defi-card', (card.ended && 'ended') || (card.new && 'new') || '']">
    <div class="images">
      <img class="image" v-for="item in card.images" :key="item" :src="item.image || item" />
    </div>
    <div class="name">
      {{ card.name }}
    </div>
    <ul class="detail">
      <li class="row" v-for="item in card.details" :key="item">
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </li>
    </ul>
    <div class="links">
      <a class="link" @click="onLink">{{ card.btnText }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default() {
        return {
          key: '',
          ended: false,
          new: false,
          name: '',
          images: [],
          details: [],
          btnText: '',
        }
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    onLink() {
      this.$emit('link', this.card)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-defi-card {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.5rem 1rem 0;
  background-color: $color-white;
  border: 0.05rem solid $color-blue;
  border-radius: 0.5rem;
  overflow: hidden;
  @media (max-width: 768.89px) {
    padding: 1rem 0.6rem 0;
  }
  &:hover {
    box-shadow: 0 0.05rem 0.7rem 0.05rem rgba($color-black, 0.1);
  }
  .images {
    font-size: 0;
    text-align: center;
    .image {
      display: inline-block;
      width: 4rem;
      height: 4rem;
      border: 0.05rem solid $color-border;
      border-radius: 100%;
      overflow: hidden;
      @media (max-width: 768.89px) {
        width: 2.5rem;
        height: 2.5rem;
      }
      &:last-child {
        margin-left: -1rem;
        @media (max-width: 768.89px) {
          margin-left: -0.5rem;
        }
      }
    }
  }
  .name {
    height: 3em;
    margin: 1rem 0 0.5rem;
    font-size: 0.9rem;
    font-weight: bold;
    text-align: center;
    @media (max-width: 768.89px) {
      margin: 0.8rem 0 0.2rem;
      font-size: 0.7rem;
    }
  }
  .detail {
    flex: 1;
    .row {
      display: flex;
      font-size: 0.7rem;
      line-height: 1.5;
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
      }
    }
    .value {
      flex: 1;
      text-align: right;
      font-weight: 500;
      @media (max-width: 768.89px) {
        margin-left: 0.3rem;
      }
    }
  }
  .links {
    display: flex;
    margin: 1rem -1rem 0;
    @media (max-width: 768.89px) {
      margin: 0.6rem -0.6rem 0;
    }
    .link {
      flex: 1;
      display: block;
      height: 2.8rem;
      line-height: 2.8rem;
      font-size: 0.9rem;
      text-align: center;
      color: $color-white;
      background-color: $color-blue;
      cursor: pointer;
      @media (max-width: 768.89px) {
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 0.65rem;
      }
    }
  }
  &.ended,
  &.new {
    &::before {
      position: absolute;
      top: 0.6rem;
      left: -2.4rem;
      display: block;
      width: 7rem;
      line-height: 1.8;
      text-align: center;
      font-size: 0.7rem;
      color: $color-white;
      background-color: rgba($color-black, 0.23);
      transform: rotate(315deg);
      @media (max-width: 768.89px) {
        top: 0.5rem;
        left: -1.3rem;
        width: 4.5rem;
        line-height: 1.5;
        font-size: 0.6rem;
      }
    }
  }
  &.new {
    &::before {
      content: 'New';
      background-color: $color-blue;
    }
  }
  &.ended {
    border-color: rgba($color-black, 0.23);
    background-color: rgba($color-white, 0.6);
    &::before {
      content: 'Ended';
      background-color: rgba($color-black, 0.23);
    }
    .link {
      background-color: rgba($color-black, 0.23);
    }
  }
}
</style>
