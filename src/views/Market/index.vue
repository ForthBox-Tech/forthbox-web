<template>
  <Nav></Nav>
  <main class="nft-market">
    <div class="market-nav">
      <Menu class="market-menu" :menu="menu"> </Menu>
    </div>
    <div class="market-wrap">
      <router-view class="market-main"></router-view>
    </div>
  </main>
</template>

<script>
import Nav from '@/modules/Nav.vue'
import Menu from '@/modules/Menu.vue'

export default {
  name: 'Market',
  components: {
    Nav,
    Menu,
  },
  data() {
    return {
      menu: [
        {
          path: '/market/drops',
          related: ['/market/drops', '/market/drops-detail'],
          text: this.$t('Market.Carnivals'),
        },
        {
          path: '/market/market-place',
          related: ['/market/market-place', '/market/market-place-detail'],
          text: this.$t('Market.MarketPlace'),
        },
        {
          path: '/market/nft',
          related: ['/market/nft', '/market/nft-collections-detail'],
          text: this.$t('Market.MyNFTs'),
        },
      ],
    }
  },
  mounted() {},
  unmounted() {},
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

.nft-market {
  position: relative;
  margin-top: 4.7rem;
  color: #fff;
  text-align: left;
  background: #2f2f37 url('~@/assets/page-defi/content-bg.png') 0 5vh / 100% no-repeat;
  min-height: 100vh;
  @media (max-width: 768.89px) {
    margin-top: 3.5rem;
  }
  .market-nav {
    z-index: 10;
    width: 100%;
    .market-menu {
      max-width: 58rem;
      border: 0 none;
    }
  }
  .filter-wrap {
    margin: -1rem 0 1rem;
    font-size: 0.8rem;
    color: #a6a6a6;
    @media (max-width: 768.89px) {
      margin: -0.2rem 0 1rem;
      font-size: 0.6rem;
    }
  }
  .row-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    .filter-btn {
      display: inline-block;
      line-height: 2rem;
      cursor: pointer;
      &::after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 0.9rem;
        height: 0.9rem;
        margin-left: 0.25rem;
        background: url('~@/assets/page-defi/filter-icon.png');
        background-size: 100%;
      }
    }
    .sort-btn {
      display: inline-block;
      cursor: pointer;
      .sort-icon {
        display: inline-block;
        margin-left: 0.55rem;
        width: 0.6rem;
        height: 0.6rem;
        background: url('~@/assets/page-market/drops-order-icon.png') center center no-repeat;
        background-size: 100%;
        &.reverse {
          transform: rotate(180deg);
        }
      }
    }
    @media (max-width: 768.89px) {
      .filter-btn {
        line-height: 1rem;
        &::after {
          width: 0.45rem;
          height: 0.45rem;
        }
      }
      .sort-wrap {
        .sort-icon {
          margin-left: 0.2rem;
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
  }
  .row-filter-list {
    li {
      display: inline-block;
      margin: 0 1rem 0.5rem 0;
      padding: 0 1.3rem;
      line-height: 2.3rem;
      font-size: 0.8rem;
      color: #fff;
      border: 0.05rem solid #4f505f;
      background-color: #2f2f37;
      border-radius: 2rem;
      box-sizing: border-box;
      cursor: pointer;
      &.active {
        background-color: #4e4e6e;
      }
    }
    @media (max-width: 768.89px) {
      li {
        margin-right: 0.3rem;
        padding: 0 0.4rem;
        line-height: 1.2rem;
        font-size: 0.6rem;
        white-space: nowrap;
      }
    }
  }
  .detail-list {
    display: flex;
    flex-wrap: wrap;
    margin-right: -2%;
  }
  .detail-block {
    flex-basis: 31.3%;
    max-width: 32%;
    min-width: 14.5rem;
    box-sizing: border-box;
    margin-right: 2%;
    margin-bottom: 2vw;
    padding: 0.8rem 1rem;
    border-radius: 1.6rem;
    border: 0.1rem solid #545e91;
    background-color: #262734;
    overflow: hidden;
    cursor: pointer;
    @media (max-width: 768.89px) {
      flex-basis: 48%;
      max-width: 49%;
      min-width: 7rem;
      padding: 0.7rem;
      border-radius: 0.8rem;
      border: 0.05rem solid #545e91;
    }

    &.new {
      position: relative;
      &::before {
        color: #fff;
        content: 'New';
        position: absolute;
        top: 0.9rem;
        left: -1.9rem;
        display: block;
        width: 7rem;
        line-height: 1.4rem;
        font-size: 0.9rem;
        text-align: center;
        background-color: #6441d3;
        transform: rotate(315deg);
      }
      @media (max-width: 768.89px) {
        &::before {
          color: #fff;
          top: 0.6rem;
          left: -1.2rem;
          width: 4.5rem;
          line-height: 0.9rem;
          font-size: 0.6rem;
        }
      }
    }

    .logo-wrap {
      position: relative;
      padding-top: 100%;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: 100%;
        max-height: 100%;
        transform: translate(-50%, -50%);
      }
    }
    .name-wrap {
      display: flex;
      align-items: center;
      margin: 1.6rem 0;
      color: #fff;
      .place-name {
        flex: 1;
        font-size: 1rem;
        font-weight: bold;
      }
      .grade {
        height: 1.2rem;
        padding: 0 0.6rem;
        line-height: 1.2rem;
        font-size: 0.8rem;
        color: #262734;
        background-color: #efb35c;
        border-radius: 0.6rem;
      }
      @media (max-width: 768.89px) {
        margin: 0.8rem 0;
        .place-name {
          font-size: 0.6rem;
        }
        .grade {
          height: 0.8rem;
          padding: 0 0.3rem;
          line-height: 0.8rem;
          font-size: 0.5rem;
          border-radius: 0.4rem;
        }
      }
    }
    .price-list {
      .price-inline {
        display: flex;
        color: #fff;
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
        font-size: 0.8rem;
        .price-name {
          flex: 1;
          margin-right: 0.1rem;
        }
        .price {
          &::before {
            content: '';
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.55rem;
            vertical-align: middle;
            background: url('~@/assets/page-market/drops-price-icon.png') center no-repeat;
            background-size: 100%;
          }
        }
      }
      @media (max-width: 768.89px) {
        .price-inline {
          &:not(:last-child) {
            margin-bottom: 0.5rem;
          }
          font-size: 0.6rem;
          .name {
            margin-right: 0.3rem;
          }
          .price {
            &::before {
              content: '';
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.25rem;
            }
          }
        }
      }
    }

    .name {
      margin: 1rem 0 1.5rem;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      @media (max-width: 768.89px) {
        margin: 0.7rem 0 1rem;
        font-size: 0.6rem;
      }
    }
    .date {
      font-size: 0.7rem;
      color: #979bc8;
      margin-top: 1rem;
      @media (max-width: 768.89px) {
        font-size: 0.55rem;
        margin-top: 0.4rem;
      }
    }
    &.ended {
      position: relative;
      color: #fff;
      &::before {
        content: 'Ended';
        position: absolute;
        top: 0.9rem;
        left: -1.9rem;
        display: block;
        width: 7rem;
        line-height: 1.4rem;
        font-size: 0.9rem;
        text-align: center;
        background-color: #a0a0a0;
        transform: rotate(315deg);
      }
      @media (max-width: 768.89px) {
        &::before {
          top: 0.6rem;
          left: -1.2rem;
          width: 4.5rem;
          line-height: 0.9rem;
          font-size: 0.6rem;
        }
      }
    }
  }
  .pagination-wrap {
    margin: 2rem 0 1.5rem;
    text-align: right;
    @media (max-width: 768.89px) {
      margin: 0.5rem 0;
      text-align: center;
    }
  }
  .market-wrap {
    margin: 2rem 0 0 0;
    padding: 0 4rem 2rem;
    max-width: none;
    box-sizing: border-box;
    text-align: inherit;
    color: inherit;
    @media (max-width: 768.89px) {
      margin-top: 1rem;
      padding: 0 0.7rem 1rem;
    }
  }
  .market-main {
    max-width: 55rem;
    margin: 0 auto;
  }
}
</style>

