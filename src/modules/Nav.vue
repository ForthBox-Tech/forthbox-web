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

