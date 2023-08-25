<template>
  <section class="minting-data-panel">
    <div class="row" v-for="item in list" :key="item">
      <div class="label">{{ item.label }}</div>
      <div class="value">
        <img class="icon" v-if="item.icon" :src="item.icon" />
        <span>{{ item.value }}</span>
      </div>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'DataPanel',
  props: {
    list: Array,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

.minting-data-panel {
  margin-bottom: 1.2rem;
  padding: 0.7rem 1rem;
  text-align: left;
  box-sizing: border-box;
  background-color: $color-white;
  border: 0.05rem solid rgba($color-black, 0.05);
  border-radius: 0.5rem;
  @media (max-width: 1200px) {
    flex: none;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 0.05rem;
    padding: 0.6rem 0.4rem;
    border: none;
    border-radius: 0;
  }
  .row {
    margin-bottom: 1rem;
    @media (max-width: 1200px) {
      box-sizing: border-box;
      width: 25%;
      padding: 0 0.2rem;
      margin-bottom: 0.5rem;
    }
    @media (max-width: 768.89px) {
      width: 50%;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .label {
    padding: 0.25rem 0;
    line-height: 1.3;
    font-size: 0.7rem;
    color: $color-secondary;
    @media (max-width: 768.89px) {
      font-size: 0.65rem;
    }
  }
  .value {
    font-size: 1.1rem;
    font-family: 'itcavantgardestd-bold';
    white-space: nowrap;
    @media (max-width: 768.89px) {
      font-size: 1rem;
    }
  }
  .icon {
    margin-right: 0.3rem;
    height: 0.9em;
    vertical-align: -0.1rem;
  }
}
</style>

