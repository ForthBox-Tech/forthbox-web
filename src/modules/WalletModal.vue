<template>
  <div class="wallet-modal" ref="WalletModal" v-if="visible" @click.stop="">
    <div class="user">
      <img class="avatar" src="@/assets/common/token-fbx.png" />
      <span class="name">My wallet</span>
      <span class="wallet">{{ $root.vUserWallet }}</span>
    </div>
    <div class="total">
      <div class="text">Total balance</div>
      <div class="value">$0.00 USD</div>
      <Button class="btn-add">Add Funds</Button>
    </div>
    <ul class="tokens">
      <li class="item" v-for="item in list" :key="item">
        <img class="icon" :src="item.icon" />
        <div class="label">
          <div class="name">{{ item.name }}</div>
          <div class="chain">Ethereum</div>
        </div>
        <div class="value">
          <div class="balance">{{ item.balance }}</div>
          <div class="dollar">$0 USD</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import ERC20 from '@/web3/ERC20'
import { TOKEN_FBX } from '@/web3/contract.constant'
import { isInElem } from '@/common/js/utils'

export default {
  components: {
    Button,
  },
  props: {},
  data() {
    return {
      visible: false,

      list: [
        {
          icon: require('@/assets/common/token-fbx.png'),
          name: 'FBX',
          contract: TOKEN_FBX,
          balance: 0,
          dollar: 0,
        },
      ],
    }
  },
  methods: {
    show() {
      if (this.visible) return
      this.visible = true

      this._initTokens()
    },
    hide() {
      if (!this.visible) return
      this.visible = false
    },

    _initTokens() {
      this.list.forEach(async (item) => {
        const iToken = new ERC20(item.contract)
        const balance = await iToken.balanceof()
        item.balance = parseInt(balance * 100) / 100
      })
    },
  },
  created() {
    this._hide = (evt) => {
      if (!isInElem(evt, this.$refs.WalletModal)) {
        this.hide()
      }
    }
    document.addEventListener('click', this._hide)
  },
  unmounted() {
    document.removeEventListener('click', this._hide)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.wallet-modal {
  position: absolute;
  z-index: 100;
  width: 20rem;
  line-height: 1.5;
  background-color: $color-white;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.6rem 0.05rem rgba(91, 92, 97, 0.16);
  .user {
    display: flex;
    align-items: center;
    padding: 2rem 0.9rem 1.5rem 0.6rem;
    border-bottom: 0.05rem solid $color-border;
    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      background-color: $color-placeholder6;
      border-radius: 50%;
      overflow: hidden;
    }
    .name {
      margin: 0 0.8rem;
      flex: 1;
      width: 0;
      font-size: 1.2rem;
    }
    .wallet {
      font-size: 0.9rem;
    }
  }
  .total {
    margin: 0.6rem;
    text-align: center;
    border: 0.05rem solid $color-border;
    border-radius: 0.5rem;
    overflow: hidden;
    .text {
      margin: 0.6rem 0 0;
      font-size: 0.9rem;
      color: $color-gray;
    }
    .value {
      font-size: 1.5rem;
    }
    .btn-add {
      @include btn-fill-pure(#2081e2);
      margin-top: 0.6rem;
      box-sizing: border-box;
      width: 100%;
      line-height: 2.4rem;
    }
  }
  .tokens {
    margin: 0.8rem 0.6rem;
    border: 0.05rem solid $color-border;
    border-radius: 0.5rem;
    .item {
      display: flex;
      align-items: center;
      line-height: 1.33;
      padding: 0.6rem 0.9rem 0.9rem 0.8rem;
      &:not(:last-child) {
        border-bottom: 0.05rem solid $color-border;
      }
    }
    .icon {
      margin-right: 0.6rem;
      width: 2rem;
      height: 2rem;
    }
    .label {
      flex: 1;
      .name {
        font-size: 1.5rem;
      }
      .chain {
        font-size: 0.8rem;
        color: $color-gray;
      }
    }
    .value {
      margin: 0.5rem 0 0 0.5rem;
      text-align: right;
      font-size: 0.9rem;
      .balance {
      }
      .dollar {
        color: $color-gray;
      }
    }
  }
}
</style>
