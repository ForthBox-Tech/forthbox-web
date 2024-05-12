<template>
  <div class="cart-modal" v-if="visible" @click="onHide">
    <main class="cart-main" @click.stop="">
      <header class="header">
        <h1 class="title">{{ $t('Market2.YourCart') }}</h1>
        <a class="close" @click="onHide"></a>
      </header>
      <section class="summary">
        <div class="amount">{{ list.length }} Orders</div>
        <a class="delete" @click="onDelete">Delete</a>
      </section>
      <section class="orders">
        <ul class="list">
          <li
            :class="['item', item.checked ? 'checked' : '']"
            v-for="item in list"
            :key="item"
            @click="onToggle(item)"
          >
            <div class="project">
              <img class="icon" src="@/assets/common/token-fbx.png" />
              <span class="name">{{ item.CollectionName }}</span>
            </div>
            <div class="info">
              <img class="img" :src="item.TokenCoverUrl" />
              <div class="name">
                <div class="text">{{ item.TokenName }}</div>
                <div class="lv">
                  {{ item.TokenDegreeName + (item.TokenLevel ? `-${item.TokenLevel}` : '') }}
                </div>
                <div class="tips" v-if="item.disabled">invalid</div>
              </div>
              <div class="num">
                <div class="count">x{{ item.Amount }}</div>
                <div class="price">
                  <img class="icon" src="@/assets/common/token-fbx.png" />
                  <span class="text">{{ item.TotalPrice }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <footer class="footer">
        <div class="total">
          <span class="label">Total</span>
          <span class="value">{{ total }} FBX</span>
        </div>
        <div class="btns">
          <Button class="btn-buy" :disabled="total <= 0" loader :handler="onBuy">
            <img class="icon" src="@/assets/page-market2/comp-detail/btn-buy.png" />
            {{ $t('Market.BuyNow') }}
          </Button>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import { getCart, rmCart, buyMulti } from '@/models/market2.model'
import emitter from '@/common/js/emitter'

export default {
  name: 'CartModal',
  components: {
    Button,
  },
  data() {
    return {
      visible: false,

      list: [],
    }
  },
  computed: {
    total() {
      let total = 0
      this.list.forEach((item) => {
        if (item.checked && !item.disabled) {
          total += parseFloat(item.TotalPrice)
        }
      })
      return total
    },
  },
  methods: {
    show() {
      this.visible = true

      this._getCart()

      this.$root.connectWallet()
    },
    hide() {
      this.visible = false
    },

    onHide() {
      this.hide()
    },

    async onDelete() {
      if (this._deleting) return

      const swapIds = []
      this.list.forEach((item) => {
        if (item.checked) {
          swapIds.push(item.SwapId)
        }
      })
      if (!swapIds.length) return

      this._deleting = true
      await this._rmCart(swapIds)
      await this._getCart()
      this._deleting = false
    },

    onToggle(item) {
      item.checked = !item.checked
    },

    async onBuy() {
      const swapIds = []
      const orders = []
      this.list.forEach((item) => {
        if (item.checked && !item.disabled) {
          orders.push({
            swapId: item.SwapId,
            erc20Type: item.Erc20Type,
            erc20Addr: item.Erc20Addr,
            quantity: item.TotalPrice,
          })
          swapIds.push(item.SwapId)
        }
      })
      if (!orders.length) return

      try {
        await buyMulti(orders)
        await this._rmCart(swapIds)
      } catch (err) {
        this.$modal.toast(err.message)
        return
      }

      this.$modal.toast('success')
      emitter.emit('cart-flush')
      await this._getCart()
    },

    async _getCart() {
      const res = await getCart()
      if (res.code != 200) {
        this.list = []
        console.warn(res.msg)
        return
      }

      this.list = (res.data || []).map((item) => {
        item.disabled = item.StateType != 'OPEN'
        item.checked = false
        return item
      })
      this.$emit('change', this.list)
    },
    async _rmCart(swapIds) {
      const res = await rmCart(swapIds)
      if (res.code != 200) {
        console.warn(res.msg)
        return false
      }

      return true
    },
  },
  created() {
    this._getCart()

    emitter.on('cart-update', this._getCart)
  },
  unmounted() {
    emitter.off('cart-update', this._getCart)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba($color-white, 0.8);

