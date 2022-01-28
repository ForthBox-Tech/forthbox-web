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
