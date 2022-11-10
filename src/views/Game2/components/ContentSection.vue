<template>
  <section class="comp-content">
    <header class="header">
      <img class="icon" v-if="icon" :src="icon" />
      <h1 class="title">{{ title }}</h1>
      <slot name="aside"></slot>
    </header>
    <main class="main">
      <slot></slot>
    </main>
  </section>
</template>

<script>
export default {
  name: 'ContentSection',
  components: {},
  props: {
    icon: String,
    title: String,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-content {
  margin: 0 auto 2rem;
  padding: 0 2.5rem;
  border: 0.05rem solid $color-border;
  border-radius: 0.5rem;
  @media (max-width: 768.89px) {
    margin: 0 auto 1rem;
    padding: 0 4%;
  }
  .header {
    position: relative;
    font-size: 1rem;
    color: $color-primary;
    @media (max-width: 768.89px) {
      line-height: 0.85rem;
      font-size: 0.9rem;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: -2.15rem;
      transform: translateY(-50%);
      display: block;
      width: 1.8rem;
      height: 1.8rem;
      @media (max-width: 768.89px) {
        left: 0;
        width: 1.2rem;
        height: 1.2rem;
      }
    }
    .title {
      flex: 1;
      line-height: 3.3rem;
      font-size: inherit;
      border-bottom: 0.05rem solid $color-border;
      @media (max-width: 768.89px) {
        padding-left: 1.6rem;
        line-height: 2.7rem;
      }
    }
  }
  .main {
    padding: 1.5rem 0;
    @media (max-width: 768.89px) {
      padding: 5% 0;
    }
  }
}
</style>

