<template>
  <ul class="game-type-selector">
    <li
      v-for="item in list"
      :key="item.text"
      :class="['item', item.value == modelValue ? 'active' : '']"
      @click="onSelect(item)"
    >
      <img v-if="item.icon" class="icon" :src="item.value == modelValue ? item.icon2 : item.icon" />
      <span class="text">{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
const GAME_TYPES = [
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-all.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-all-active.png'),
    text: 'ALL',
    value: '',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-stg.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-stg-active.png'),
    text: 'STG',
    value: 'STG',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-tdg.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-tdg-active.png'),
    text: 'TDG',
    value: 'TDG',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-tbs.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-tbs-active.png'),
    text: 'TBS',
    value: 'TBS',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-edu.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-edu-active.png'),
    text: 'EDU',
    value: 'EDU',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-rpg.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-rpg-active.png'),
    text: 'RPG',
    value: 'RPG',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-act.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-act-active.png'),
    text: 'ACT',
    value: 'ACT',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-rtt.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-rtt-active.png'),
    text: 'RTT',
    value: 'RTT',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-spt.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-spt-active.png'),
    text: 'SPT',
    value: 'SPT',
  },
]

export default {
  name: 'GameTypeSelector',
  props: {
    modelValue: String,
  },
  data() {
    return {
      list: JSON.parse(JSON.stringify(GAME_TYPES)),
    }
  },
  methods: {
    onSelect(item) {
      this.$emit('update:modelValue', item.value)
      this.$emit('change', item.value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.game-type-selector {
  .item {
    margin: 0 0.5rem 0.6rem 0;
    display: inline-block;
    box-sizing: border-box;
    min-width: 4rem;
    padding: 0 0.4rem;
    height: 1.5rem;
    line-height: 1.4rem;
    font-size: 0;
    color: $color-primary;
    border: 0.05rem solid rgba($color-border, 0.7);
    border-radius: 0.3rem;
    cursor: pointer;
    @media (max-width: 768.89px) {
      margin: 0 0.4rem 0.4rem 0;
      padding: 0 0.35rem;
      min-width: 3.6rem;
      border-radius: 0.2rem;
    }
    .icon {
      margin-right: 0.3rem;
      display: inline-block;
      width: 1.15rem;
      height: 1.15rem;
      vertical-align: -0.35rem;
      @media (max-width: 768.89px) {
        width: 0.85rem;
        height: 0.85rem;
        vertical-align: -0.2rem;
      }
    }
    .text {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 500;
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
        font-weight: normal;
      }
    }
    &.active {
      color: $color-white;
      background-color: $color-purple;
      border-color: $color-purple;
    }
  }
}
</style>

