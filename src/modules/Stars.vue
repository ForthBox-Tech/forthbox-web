<template>
  <div class="comp-stars">
    <i
      :class="['star', calcStar(order)]"
      v-for="order in [1, 2, 3, 4, 5]"
      :key="order"
      @click="onToggle(order)"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    score: {
      type: Number,
      value: 0,
    },
  },
  methods: {
    calcStar(order) {
      let star = ''
      const score = this.score || 0
      if (score - order >= 0) {
        star = 'full'
      } else if (score - order > -1) {
        star = 'half'
      }

      return star
    },

    onToggle(order) {
      this.$emit('change', order)
    },
  },
}
</script>

<style lang="scss" scoped>
.comp-stars {
  display: inline-block;
  font-size: 0;
  .star {
    margin-right: 0.1rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
    background: url('~@/assets/comp-stars/star-hollow.png') center center no-repeat;
    background-size: 100%;
    cursor: pointer;
    @media (max-width: 768.89px) {
      width: 0.8rem;
      height: 0.8rem;
    }
    @media (max-width: 375.89px) {
      width: 0.7rem;
      height: 0.7rem;
    }
    &.half {
      background-image: url('~@/assets/comp-stars/star-half.png');
    }
    &.full {
      background-image: url('~@/assets/comp-stars/star-full.png');
    }
  }
}
</style>

