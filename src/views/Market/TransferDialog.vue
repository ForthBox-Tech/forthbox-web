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
