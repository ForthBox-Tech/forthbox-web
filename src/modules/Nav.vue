<template>
  <div :class="['fb-nav', !dropdown ? navClass : '']" ref="nav">
    <div class="nav-logo">
      <router-link to="/">
        <img src="@/assets/common/logo.png" />
      </router-link>
    </div>

    <template v-if="outerPath.indexOf($route.path) > -1">
      <div
        :class="[
          'nav-links',
          [DROPDOWN.NAV, DROPDOWN.LANGUE].indexOf(dropdown) > -1 ? 'visible' : '',
        ]"
      >
        <router-link
          :class="['nav-link', $route.path === '/minting' ? 'active' : '']"
          to="/minting"
        >
          {{ $t('Nav.Minting') }}
        </router-link>
        <router-link :class="['nav-link', $route.path === '/game2' ? 'active' : '']" to="/game2">
          {{ $t('Nav.Games') }}
        </router-link>
        <router-link
          :class="['nav-link', $route.path === '/market2' ? 'active' : '']"
          to="/market2"
        >
          {{ $t('Nav.Market') }}
        </router-link>
        <router-link :class="['nav-link', $route.path === '/faq' ? 'active' : '']" to="/faq">
          {{ $t('Nav.FAQ') }}
        </router-link>
        <router-link
          :class="['nav-link', $route.path === '/recruit' ? 'active' : '']"
          to="/recruit"
        >
          {{ $t('Nav.JoinUs') }}
        </router-link>
        <!-- <a class="nav-link">
          {{ $t('Nav.Swap') }}
        </a> -->
        <div class="nav-toggle pc-v-hide" @click="onToggleDropdown(DROPDOWN.LANGUE, DROPDOWN.NAV)">
          <span class="nav-link">
            {{ $t('Nav.Language') }}
          </span>
          <div :class="['nav-dropdown', dropdown === DROPDOWN.LANGUE ? 'visible' : '']">
            <a class="dropdown-item" @click="onLangue('en')">English</a>
            <!-- <a class="dropdown-item" @click="onLangue('zh-CN')">中文 (简体)</a> -->
            <a class="dropdown-item" @click="onLangue('zh-TW')">中文 (繁體)</a>
            <a class="dropdown-item" @click="onLangue('ko')">한국어</a>
            <a class="dropdown-item" @click="onLangue('vn')">Tiếng Việt</a>
            <a class="dropdown-item" @click="onLangue('ru')">русский</a>
          </div>
        </div>
      </div>

      <div class="nav-interact">
        <Button class="nav-btn" type="color" @click="onBuyFbx">{{ $t('Nav.BuyFbx') }}</Button>
        <Button class="nav-btn" type="color" @click="onBuyUSDC">{{ $t('Nav.BuyUSDC') }}</Button>

        <div class="nav-toggle m-v-hide" @click="onToggleDropdown(DROPDOWN.LANGUE)">
          <Button class="nav-btn" type="text">{{ $t('Nav.Language') }}</Button>
          <div :class="['nav-dropdown', dropdown === DROPDOWN.LANGUE ? 'visible' : '']">
            <a class="dropdown-item" @click="onLangue('en')">English</a>
            <!-- <a class="dropdown-item" @click="onLangue('zh-CN')">中文 (简体)</a> -->
            <a class="dropdown-item" @click="onLangue('zh-TW')">中文 (繁體)</a>
            <a class="dropdown-item" @click="onLangue('ko')">한국어</a>
            <a class="dropdown-item" @click="onLangue('vn')">Tiếng Việt</a>
            <a class="dropdown-item" @click="onLangue('ru')">Русский</a>
          </div>
        </div>
      </div>
      <a class="menu-btn pc-v-hide" @click="onToggleDropdown(DROPDOWN.NAV)">
        <span class="line"></span>
        <span class="line" style="width: 80%"></span>
        <span class="line"></span>
      </a>
    </template>
    <template v-else>
      <div class="nav-interact">
        <div class="nav-toggle wallet" @click="onConnectWallet">
          <img class="icon m-v-hide" src="@/assets/comp-nav/nav1-wallet.png" />
          <span class="text">{{ $root.vUserWallet || $t('Nav.Wallet') }}</span>
          <div :class="['nav-dropdown', 'fixed', dropdown === DROPDOWN.WALLET ? 'visible' : '']">
            <a class="dropdown-item" @click.stop="onDisconnectWallet">
              {{ $t('Nav.DisconnectWallet') }}
            </a>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div class="nav-drop-bg" v-if="dropdown" @click="onHideDropdown"></div>

  <WalletDialog ref="wallet" />
</template>

<script>
import Button from '../components/Button.vue'
import WalletDialog from './WalletDialog.vue'

export default {
  components: {
    Button,
    WalletDialog,
  },
  data() {
    return {
      username: '',

      navClass: '',

      dropdown: '',
      DROPDOWN: {
        NAV: 1,
        ACCOUNT: 2,
        LANGUE: 3,
        WALLET: 4,
      },

      outerPath: ['/', '/faq', '/recruit'],
    }
  },
  methods: {
    onConnectWallet() {
      if (this.$root.userWallet) {
        this.onToggleDropdown(this.DROPDOWN.WALLET)
        return
      }
      this.$wallet.show()
    },
    onDisconnectWallet() {
      this.$root.disconnectWallet()
      this.onHideDropdown()
    },

    onToggleDropdown(dropdown, backto = '') {
      this.dropdown = this.dropdown == dropdown ? backto || '' : dropdown
    },
    onHideDropdown() {
      this.dropdown = ''
    },

    onBuyFbx() {
      window.open(
        'https://www.pancakeswap.finance/swap?outputCurrency=0xfd57ac98aa8e445c99bc2c41b23997573fadf795'
      )
    },
    onBuyUSDC() {
      window.open(
        'https://www.pancakeswap.finance/swap?outputCurrency=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'
      )
    },

    onLangue(langue) {
      this.$root.$i18n.locale = langue || 'en'
    },

    onLogout() {
      this.$axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      this.username = ''
      this.onHideDropdown()
    },

    getUserInfo() {
      const token = localStorage.getItem('token') || ''
      if (!token) return Promise.resolve()

      return this.$axios
        .get('/users/get_auth_info', {
          params: {
            token,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            this.username = res.data.username || ''
            return
          }
          throw new Error(res.msg)
        })
        .catch((err) => {
          this.username = ''
          // console.error(err)
        })
    },
  },
  mounted() {
    this.$wallet = this.$refs.wallet

    this.dropdown = ''

    // 获取用户信息
    this.getUserInfo()

    // 导航栏样式处理
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const navHeight = this.$refs.nav?.clientHeight
      if (scrollTop >= navHeight) {
        this.navClass = ''
      } else {
        this.navClass = 'opacity'
      }
    }
    const homeScrollHandler = (to) => {
      window.removeEventListener('scroll', onScroll)
      if (to.path == '/') {
        onScroll()
        window.addEventListener('scroll', onScroll)
      } else {
        this.navClass = ''
      }
    }
    homeScrollHandler(this.$route)
    this.$router.beforeEach((to, from) => {
      setTimeout(() => {
        this.onHideDropdown()
      }, 0)

      homeScrollHandler(to)
    })
  },
}
</script>

<style lang="scss">
$nav-bg: #28282e;
$nav-bg-hover: #3d3d42;
$nav-height: 4.7rem;

.fb-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 0 2vw;
  width: 100%;
  height: $nav-height;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  background-color: $nav-bg;
  user-select: none;
  &.opacity {
    transition: background-color 0.3s;
    background-color: rgba(0, 0, 0, 0);
  }

  .nav-logo {
    img {
      width: 9.5rem;
    }
  }
  .nav-links {
    margin: 0 1.5625vw;
    white-space: nowrap;
    .nav-link {
      position: relative;
      display: inline-block;
      padding: 0 1.5625vw;
      line-height: $nav-height;
      text-align: center;
      color: #fff;
      &:hover {
        color: #eee;
      }
      &.active {
        color: #ae00ff;
      }
    }
  }
  .nav-interact {
    flex: 1;
    white-space: nowrap;
    text-align: right;
    line-height: $nav-height;
    .user-avatar {
      margin-right: 0.8rem;
      display: inline-block;
      width: 2.1rem;
      height: 2.1rem;
      vertical-align: middle;
    }
    .user-name {
      display: inline-block;
      font-size: 0.8rem;
      vertical-align: middle;
      &::after {
        content: '';
        margin-left: 0.5rem;
        display: inline-block;
        width: 0.55rem;
        height: 0.55rem;
        background: url('~@/assets/comp-nav/nav1-triangle.png') center center no-repeat;
        background-size: 0.55rem;
        vertical-align: middle;
      }
    }
    .wallet {
      cursor: pointer;
      .icon {
        vertical-align: middle;
        margin-right: 0.25rem;
        width: 1.25rem;
      }
      .text {
        vertical-align: middle;
        display: inline-block;
        line-height: 1.2;
        font-size: 0.8rem;
        color: #fff;
      }
    }
  }
  .menu-btn {
    display: inline-block;
    padding: 0.5rem;
    font-size: 0;
    .line {
      margin: 0.2rem 0;
      display: block;
      width: 1rem;
      height: 0.1rem;
      border-radius: 0.05rem;
      background-color: #fff;
    }
  }
  .nav-btn {
    margin: 0 0.52vw;
  }
  .nav-toggle {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  .nav-dropdown {
    display: none;
    position: absolute;
    top: $nav-height;
    right: -1rem;
    width: 10rem;
    line-height: 2.5rem;
    background-color: $nav-bg;
    text-align: center;
    &.visible {
      display: block;
    }
    .dropdown-item {
      display: block;
      cursor: pointer;
      color: #fff;
      &:hover {
        background-color: $nav-bg-hover;
      }
    }
  }
}
.nav-drop-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

@media (max-width: 768.89px) {
  $nav-height: 3.5rem;
  .fb-nav {
    height: $nav-height;
    .nav-logo {
      img {
        width: 6rem;
      }
    }
    .nav-links {
      display: none;
      position: fixed;
      top: $nav-height;
      left: 0;
      bottom: 0;
      width: 60%;
      margin: 0;
      background-color: $nav-bg;
      overflow-y: auto;
      &.visible {
        display: block;
      }
      .nav-link {
        display: block;
        padding: 0 1rem 0 1.2rem;
        line-height: 3rem;
        text-align: left;
        font-size: 0.65rem;
        &:hover {
          background-color: $nav-bg-hover;
        }
      }
      .nav-toggle {
        display: block;
      }
    }
    .nav-interact {
      line-height: $nav-height;

      .wallet {
        .text {
          font-size: 0.65rem;
        }
      }
    }
    .nav-btn {
      padding: 0 0.5rem;
      line-height: 1.8rem;
      font-size: 0.65rem;
    }
    .nav-dropdown {
      position: static;
      width: auto;
      font-size: 0.65rem;
      text-align: left;
      &.visible {
        transition: height 0.2s;
      }
      .dropdown-item {
        margin-left: 1.5rem;
        padding-left: 1rem;
      }
      &.fixed {
        position: absolute;
        top: $nav-height;
        right: 0;
        width: 100%;
        text-align: center;
        .dropdown-item {
          margin: 0;
          padding: 0 1rem;
        }
      }
    }
  }
}
.ru {
  .nav-link {
    padding: 0 1.5625vw 0 0 !important;
  }
}
</style>
