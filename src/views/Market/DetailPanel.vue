<template>
  <section class="market-detail-placeholder" v-if="!title && (!list || !list.length)"></section>
  <section class="market-detail-panel" v-else v-bind="$attrs">
    <header class="panel-header">
      {{ title }}
    </header>
    <main class="panel-main">
      <template v-for="item in list" :key="item">
        <div class="panel-row" v-if="item.value">
          <div class="panel-label" v-if="item.label">{{ item.label }}</div>
          <div class="panel-value" :style="{ textAlign: item.label ? 'right' : 'left' }">
            {{ item.value }}
          </div>
        </div>
      </template>
      <slot></slot>
    </main>
  </section>
</template>

<script>
export default {
  name: 'DetailPanel',
  props: {
    title: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
@import './market.detail.scss';

.market-detail-panel {
  @include layout-flex();
  padding: 1.5rem 2rem 1.8rem;
  background-color: #353644;
  color: #fff;
  @media (max-width: 768.89px) {
    padding: 0.7rem 1rem 1rem;
  }

  .panel-header {
    font-size: 0.9rem;
    font-weight: bold;
    padding-bottom: 0.8rem;
    border-bottom: 0.05rem solid #5f6175;
    @media (max-width: 768.89px) {
      font-size: 0.7rem;
      padding-bottom: 0.5rem;
    }
  }
  .panel-main {
    padding: 0.5rem 0;
    font-size: 0.8rem;
    @media (max-width: 768.89px) {
      padding: 0.25rem 0;
      font-size: 0.6rem;
    }
  }
  .panel-row {
    display: flex;
    margin-top: 0.8rem;
    @media (max-width: 768.89px) {
      margin-top: 0.5rem;
    }
  }
  .panel-label {
    color: #c5c5d1;
    vertical-align: middle;
  }
  .panel-value {
    flex: 1;
    text-align: right;
  }
}
.market-detail-placeholder {
  @include layout-flex();
}
</style>

