<template>
  <section class="market-detail-transaction">
    <header class="transaction-header">
      <div class="wrap">
        <h1 class="title">{{ title }}</h1>
        <img class="logo" v-if="logo" :src="logo" />
      </div>
      <div class="note" v-if="note">{{ note }}</div>
    </header>
    <main class="transaction-main">
      <slot></slot>
    </main>
  </section>
</template>

<script>
export default {
  name: 'DetailTransaction',
  props: {
    title: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    note: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
@import './market.detail.scss';

.market-detail-transaction {
  @include layout-flex();

  .transaction-header {
    color: #fff;

    .wrap {
      display: flex;
      align-items: center;
    }
    .title {
      flex: 1;
      font-size: 1.5rem;
      @media (max-width: 768.89px) {
        font-size: 0.75rem;
      }
    }
    .logo {
      width: 5.05rem;
      @media (max-width: 768.89px) {
        width: 2.5rem;
      }
    }
    .note {
      margin-top: 0.3rem;
      color: #808080;
      font-size: 0.8rem;
      font-weight: normal;
      @media (max-width: 768.89px) {
        margin-top: 0.1rem;
        font-size: 0.5rem;
      }
    }
  }
  .transaction-main {
    margin-top: 1.8rem;
    padding: 2rem 2rem 1.9rem;
    border-radius: 1.2rem;
    background-color: #353644;
    @media (max-width: 768.89px) {
      margin-top: 0.8rem;
      padding: 1rem;
      border-radius: 0.6rem;
    }
  }
}
</style>

