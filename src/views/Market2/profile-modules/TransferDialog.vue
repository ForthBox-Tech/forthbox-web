<template>
  <Dialog class="transfer-dialog" :visible="visible">
    <main class="transfer-main">
      <header class="header">
        <h1 class="title">Transfer</h1>
        <a class="close" @click="onHide"></a>
      </header>
      <section class="content">
        <FormItem label="From">
          <Input placeholder="Please enter the address" v-model="from" disabled></Input>
        </FormItem>
        <FormItem label="To">
          <Input placeholder="Please enter the address" v-model="to"></Input>
        </FormItem>
        <FormItem label="Amount" v-if="contractType == 'ERC1155'">
          <Input placeholder="Please enter the amount" v-model="amount"></Input>
        </FormItem>
      </section>
      <footer class="footer">
        <Button class="btn-cancel" :handler="onHide">Cancel</Button>
        <Button class="btn-ok" loader :handler="onConfirm">OK</Button>
      </footer>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import FormItem from '@/components/FormItem.vue'
import { transfer } from '@/models/market2.model'

export default {
  name: 'TransferDialog',
  components: {
    Dialog,
    FormItem,
    Input,
    Button,
  },
  props: {
    contractType: String,
    contractAddr: String,
    tokenId: String,
  },
  data() {
    return {
      visible: false,

      from: this.$root.userWallet,
      to: '',
      amount: 1,
    }
  },
  methods: {
    show() {
      this.visible = true

      this.to = ''
      this.amount = 1
    },
    hide() {
      this.visible = false
    },

    onHide() {
      this.hide()
    },
    async onConfirm() {
      if (!this.to) {
        alert('Please enter the address')
        return
      }
      const result = await transfer(
        this.contractType,
        this.contractAddr,
        this.from,
        this.to,
        this.tokenId,
        this.amount || 1
      )
      if (result) {
        this.hide()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.transfer-dialog {
  .transfer-main {
    box-sizing: border-box;
    width: 26rem;
    text-align: left;
    background-color: $color-white;
    border-radius: 1rem;
    &::before,
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }
  .header {
    display: flex;
    align-items: center;
    line-height: 3rem;
    .title {
      flex: 1;
      margin: 0 1rem;
      font-size: 1rem;
      font-weight: 500;
    }
    .close {
      display: block;
      margin-right: 0.5rem;
      width: 2rem;
      height: 2rem;
      background: url('~@/assets//common/close.png') center center / 0.8rem no-repeat;
      cursor: pointer;
    }
  }
  .content {
    margin: 0 1rem;
  }
  .footer {
    margin: 2rem 0 1.5rem;
    text-align: center;
    .fbx-btn {
      box-sizing: border-box;
      width: 9rem;
      border-radius: 0.5rem;
    }
    .btn-cancel {
      @include btn-stroke-pure($color-primary, $color-border, $color-blue, $color-blue);
    }
    .btn-ok {
      margin-left: 2rem;
      @include btn-fill-color();
    }
  }
}
</style>

