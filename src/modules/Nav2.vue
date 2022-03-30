<template>
  <div class="comp-nav" v-bind="$attrs">
    <main class="main-wrap2">
      <nav class="nav">
        <a class="link link-home" href="/">
          <img class="logo" src="@/assets/common/logo.png" />
        </a>
        <router-link
          v-for="tab in tabs"
          :key="tab"
          :class="[
            'link',
            'm-v-hide',
            $route.path.search(tab.regexp) > -1 ? 'router-link-active' : '',
          ]"
          :to="tab.path"
        >
          {{ tab.text }}
        </router-link>
        <!-- <Input
          class="search"
          :icon="require('@/assets/comp-nav/icon-search.png')"
          placeholder="Search by collection, NFT or user"
          v-model.trim="keyword"
          @enter="onSearch"
        ></Input> -->
      </nav>
      <div class="btns">
        <a class="btn btn-cart">
          <span class="bubble" v-if="cartCount > 0">{{ cartCount }}</span>
          <i class="trigger" @click.stop="onCart"></i>
        </a>
        <a class="btn btn-profile">
          <span class="inner" v-if="$root.token" @click.stop="onProfile">
            <span class="name">{{ $root.vUserWallet }}</span>
            <img class="avatar" :src="$root.user.avatar" />
          </span>
          <i class="trigger" v-else @click.stop="onProfile"></i>
          <UserModal ref="UserModal" class="user-modal"></UserModal>
        </a>
        <!-- <a class="btn btn-connect" @click.stop="onWallet">
          <WalletModal ref="WalletModal" class="wallet-modal"></WalletModal>
        </a> -->
        <a
          v-if="outerPath.indexOf($route.path) != -1"
          :class="['btn', 'btn-menu', 'pc-v-hide', menuVisible ? 'close' : '']"
          @click.stop="onMenu"
        >
          <i class="line line-1"></i>
          <i class="line line-2"></i>
          <i class="line line-3"></i>
        </a>
      </div>
    </main>
  </div>
  <div class="comp-nav-placeholder"></div>
  <div
    :class="['comp-nav-menu', 'pc-v-hide', outerPath.indexOf($route.path) == -1 ? 'fixed' : '']"
    v-if="menuVisible || outerPath.indexOf($route.path) == -1"
    @click.stop="menuVisible = false"
  >
    <router-link
      v-for="tab in tabs"
      :key="tab"
      :class="['link', $route.path.search(tab.regexp) > -1 ? 'router-link-active' : '']"
      :to="tab.path"
    >
      <img class="icon" :src="$route.path.search(tab.regexp) > -1 ? tab.icon1 : tab.icon0" />
      <span>{{ tab.text }}</span>
    </router-link>
  </div>
  <CartModal ref="CartModal" @change="onCartChange"></CartModal>
  <ConnectDialog ref="ConnectDialog"></ConnectDialog>
  <WalletSignDialog ref="WalletSignDialog"></WalletSignDialog>
</template>

<script>
// import Input from '@/components/Input.vue'
import CartModal from '@/modules/CartModal.vue'
import UserModal from '@/modules/UserModal.vue'
// import WalletModal from '@/modules/WalletModal.vue'
import WalletSignDialog from '@/modules/WalletSignDialog.vue'
import ConnectDialog from '@/modules/ConnectDialog.vue'
import emitter from '@/common/js/emitter'

export default {
  components: {
    // Input,
    CartModal,
    UserModal,
    // WalletModal,
    WalletSignDialog,
    ConnectDialog,
  },
  data() {
    return {
      keyword: '',

      cartCount: 0,

      menuVisible: false,
      outerPath: ['/', '/share', '/faq', '/recruit'],
    }
  },
  computed: {
    tabs() {
      return [
        // { path: '/promo/metabull', regexp: /\/promo\/metabull/, text: 'Campaign' },
        {
          path: '/minting',
          regexp: /\/minting/,
          text: this.$t('Nav.Minting'),
          icon0: require('@/assets/comp-nav/nav-minting.png'),
          icon1: require('@/assets/comp-nav/nav-minting-a.png'),
        },
        // { path: '/defi', regexp: /\/defi/, text: this.$t('SideTab.DeFi') },
        {
          path: '/game2/collections',
          regexp: /\/game2\//,
          text: this.$t('Game2.Games'),
          icon0: require('@/assets/comp-nav/nav-games.png'),
          icon1: require('@/assets/comp-nav/nav-games-a.png'),
        },
        {
          path: '/market2/marketplace',
          regexp: /\/market2\/marketplace/,
          text: this.$t('Market2.Marketplace'),
          icon0: require('@/assets/comp-nav/nav-market.png'),
          icon1: require('@/assets/comp-nav/nav-market-a.png'),
        },
        {
          path: '/market2/carnivals',
          regexp: /\/market2\/carnivals/,
          text: this.$t('Market.Carnivals'),
          icon0: require('@/assets/comp-nav/nav-carnivals.png'),
          icon1: require('@/assets/comp-nav/nav-carnivals-a.png'),
        },
      ]
    },
  },
  methods: {
    // onSearch() {
    //   console.log('------onSearch:', this.keyword)
    // },

    onCartChange(orders) {
      this.cartCount = orders?.length || 0
    },

    onCart() {
      this._toggle('CartModal')
      this.$emit('cart')
    },
    onProfile() {
      const ref = this.$root.token ? 'UserModal' : 'ConnectDialog'
      this._toggle(ref)
    },
    // onWallet() {
    //   const ref = this.$root.token ? 'WalletModal' : 'ConnectDialog'
    //   this._toggle(ref)
    // },
    onMenu() {
      this._toggle('MenuModal')
    },
    _toggle(ref) {
      const names = [
        'CartModal',
        'UserModal',
        // 'WalletModal',
        'WalletSignDialog',
        'ConnectDialog',
        'MenuModal',
      ]
      names.forEach((name) => {
        const $ref = this.$refs[name]
        if ($ref) {
          if (ref === name) {
            typeof $ref.toggle == 'function' ? $ref.toggle() : $ref.show()
          } else {
            $ref.hide()
          }
        } else if (name === 'MenuModal') {
          this.menuVisible = ref === name ? !this.menuVisible : false
        }
      })
    },

    async _onWalletChange() {
      if (this.$root.token) return

      const isExist = await this._isExistUser()
      if (isExist) {
        await this.$root.sign()
        await this.$root.getUserInfo()
        emitter.emit('auth-change')
      } else {
        this._toggle('WalletSignDialog')
      }
    },
    async _isExistUser() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/users/is_exist`
      const params = {
        type: 'userAddr',
        value: this.$root.userWallet,
      }

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        console.warn(res.msg)
        return
      }

      return !!res.data?.isExisted
    },
  },
  created() {
    emitter.on('wallet-connect', this.onProfile)
    emitter.on('wallet-change', this._onWalletChange)
  },
  unmounted() {
    emitter.off('wallet-connect', this.onProfile)
    emitter.off('wallet-change', this._onWalletChange)
  },
}
</script>

<style>
:root {
  --nav2-height: 3.5rem;
}
@media (max-width: 768.89px) {
  :root {
    --nav2-height: 3rem;
  }
}
</style>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  color: $color-primary;
  background-color: $color-white;
  box-shadow: 0 0 0.8rem 0 rgba(91, 92, 97, 0.1);
  -webkit-tap-highlight-color: transparent;
  .main-wrap2 {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--nav2-height);
    margin-top: 0;
    margin-bottom: 0;
  }
  .nav {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    .link {
      display: block;
      margin-right: 1.5rem;
      font-weight: 500;
      color: inherit;
      cursor: pointer;
      &.link-home {
        margin-right: 2.5rem;
        @media (max-width: 768.89px) {
          margin-right: 0;
        }
      }
      &:hover,
      &.router-link-active {
        color: $color-blue;
      }
    }
    .logo {
      display: block;
      width: 6.9rem;
      @media (max-width: 768.89px) {
        width: 5.75rem;
      }
    }
  }
  .search {
    margin-left: 2rem;
    width: 20rem;
  }
  .btns {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    .btn {
      position: relative;
      display: block;
      margin-left: 1.5rem;
      cursor: pointer;
      @media (max-width: 768.89px) {
        margin-left: 0.5rem;
      }
      .trigger {
        display: block;
        height: 1.5rem;
        width: 1.5rem;
        background: $color-placeholder center center / 100% no-repeat;
        @media (max-width: 768.89px) {
          height: 1.2rem;
          width: 1.2rem;
        }
      }
    }
    .btn-cart {
      .trigger {
        background-image: url('~@/assets/comp-nav/icon-cart.png');
        &:hover {
          background-image: url('~@/assets/comp-nav/icon-cart-active.png');
        }
      }
      .bubble {
        position: absolute;
        top: -10%;
        right: -30%;
        display: inline-block;
        box-sizing: border-box;
        padding: 0 0.2rem;
        min-width: 0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.6rem;
        color: $color-white;
        background-color: $color-red;
        border-radius: 1rem;
        @media (max-width: 768.89px) {
          min-width: 0.65rem;
          height: 0.65rem;
          line-height: 0.65rem;
          font-size: 0.5rem;
        }
      }
    }
    .btn-profile {
      .inner {
        display: block;
        padding: 0.15rem 0.3rem 0.15rem 0.1rem;
        line-height: 1;
        border: 0.05rem solid $color-blue;
        border-radius: 2rem;
        white-space: nowrap;
        @media (max-width: 768.89px) {
          padding: 0.1rem 0.15rem 0.1rem 0.1rem;
        }
      }
      .name {
        margin: 0 0.5rem;
        font-size: 0.8rem;
        color: $color-blue;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          margin: 0 0.3rem;
          font-size: 0.6rem;
        }
      }
      .avatar {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 1.5rem;
        overflow: hidden;
        vertical-align: middle;
        @media (max-width: 768.89px) {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .trigger {
        background-image: url('~@/assets/comp-nav/icon-profile.png');
        &:hover {
          background-image: url('~@/assets/comp-nav/icon-profile-active.png');
        }
      }
    }
    .btn-connect {
      padding: 0.2rem 0;
      .trigger {
        background-image: url('~@/assets/comp-nav/icon-wallet.png');
        &:hover {
          background-image: url('~@/assets/comp-nav/icon-wallet-active.png');
        }
      }
    }
    .btn-menu {
      padding: 0.2rem;
      font-size: 0;
      width: 0.9rem;
      @media (max-width: 768.89px) {
        margin-left: 0.35rem;
      }
      .line {
        margin: 0.22rem 0;
        display: block;
        width: inherit;
        height: 0.1rem;
        border-radius: 0.05rem;
        background-color: $color-black;
        transition: transform 0.5s, width 0.4s, opacity 0.4s;
        &.line-1 {
          transform-origin: top left;
        }
        &.line-3 {
          transform-origin: bottom left;
        }
      }
      &.close {
        .line {
          width: 0.97rem;
        }
        .line-1 {
          transform: rotate(45deg);
        }
        .line-2 {
          width: 0;
          opacity: 0;
        }
        .line-3 {
          transform: rotate(-45deg);
        }
      }
    }
  }

  .user-modal,
  .wallet-modal {
    top: 130%;
    right: -1rem;
    @media (max-width: 768.89px) {
      position: fixed;
      top: var(--nav2-height);
      left: 0;
      right: 0;
      bottom: 0;
      background-color: darken($color-white, 1);
    }
  }
}
.comp-nav-placeholder {
  height: var(--nav2-height);
}
.comp-nav-menu {
  position: fixed;
  top: var(--nav2-height);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: darken($color-white, 1);
  padding: 1em 0;
  text-align: left;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  .link {
    display: block;
    padding: 0 1.5em;
    line-height: 2.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: inherit;
    cursor: pointer;
    &.router-link-active {
      color: $color-blue;
    }
    .icon {
      margin-right: 0.5em;
      width: 1.2em;
      vertical-align: -0.25em;
    }
  }
  &.fixed {
    top: auto;
    display: flex;
    padding: 0;
    background-color: $color-white;
    box-shadow: 0 0 0.8rem 0 rgba(91, 92, 97, 0.1);
    .link {
      flex: 1;
      padding: 0.9em 0 0.8em;
      line-height: 1;
      text-align: center;
      font-size: 0.5rem;
      .icon {
        display: block;
        margin: 0 auto 0.7em;
        width: 2em;
      }
    }
  }
}
</style>
