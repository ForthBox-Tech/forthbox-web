<template>
  <Dialog class="dialog-market dialog-transfer" :visible="visible" @hide="onHide">
    <main class="main">
      <header class="header">
        <h1 class="title">Transfer</h1>
        <a class="close" @click="onHide"></a>
      </header>
      <div class="address-wrap">
        <p class="label">From</p>
        <p class="value">{{ $root.userWallet }}</p>
      </div>
      <div class="address-wrap">
        <p class="label">To</p>
        <input class="value" type="text" placeholder="Please enter the address" v-model="address" />
      </div>
      <div class="address-wrap" v-if="enableAmount">
        <p class="label">Amount</p>
        <input class="value" type="text" placeholder="Please enter the amount" v-model="amount" />
      </div>
      <div class="btn-wrap">
        <Button :handler="onHide">Cancel</Button>
        <Button loader :handler="onConfirm">Confirm</Button>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'TransferDialog',
  components: {
    Button,
    Dialog,
  },
  props: {
    enableAmount: Boolean,
    max: Number,
    handler: Function,
  },
  data() {
    return {
      visible: false,
      address: '',
      amount: '',
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.address = ''
      }
    },
    amount(newVal, oldVal) {
      if (newVal !== '' && (!/^\d*$/.test(`${newVal}`) || Number(newVal) > this.max)) {
        this.amount = parseFloat(oldVal) ? oldVal : ''
      }
    },
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onHide() {
      this.hide()
    },
    async onConfirm() {
      if (!this.address) {
        alert('Please enter the address')
        return
      }
      const result = await this.handler(this.address, this.amount)
      if (result) {
        this.hide()
      }
    },
  },
}
</script>

<style lang="scss">
@import './market.dialog.scss';

.dialog-market.dialog-transfer {
  .address-wrap {
    margin-bottom: 1rem;
    @media (max-width: 768.89px) {
      margin-bottom: 0.65rem;
    }

    .label {
      line-height: 2;
    }
    .value {
      box-sizing: border-box;
      width: 100%;
      padding: 0 1rem;
      line-height: 2.5rem;
      background-color: #25262f;
      border-radius: 0.35rem;
      color: #fff;
      border: 0 none;
      outline: none;
      box-shadow: none;
      font-size: 0.8rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      @media (max-width: 768.89px) {
        padding: 0 0.65rem;
        line-height: 2rem;
        font-size: 0.65rem;
      }
    }
  }
}
</style>

