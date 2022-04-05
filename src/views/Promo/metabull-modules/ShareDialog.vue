<template>
  <Dialog class="dialog-metabull dialog-share" :visible="visible">
    <main class="main">
      <a class="close" @click="onHide"></a>
      <h1 class="title">Share</h1>
      <div class="content">
        <p class="desc">
          You can share the invitation link with your friends. Once they vote via the link, you will
          get <strong class="strong">6 Hashrate</strong> while they will get
          <strong class="strong">10 Hashrate</strong>. Act Now!
        </p>
        <div class="wrap">
          <input id="shareLink" class="copy-value" type="text" :value="shareLink" readonly />
          <Button
            class="btn-copy"
            ref="btnCopy"
            :disabled="btnDisabled"
            data-clipboard-target="#shareLink"
          >
            {{ btnText }}
          </Button>
        </div>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import Clipboard from 'clipboard'

export default {
  name: 'ShareDialog',
  components: {
    Dialog,
    Button,
  },
  data() {
    return {
      visible: false,

      shareLink: '',
      btnText: 'Copy',
      btnDisabled: false,
    }
  },
  methods: {
    show() {
      this.visible = true

      const origin = window.location.origin
      const userWallet = this.$root.userWallet || ''
      this.shareLink = `${origin}/#/promo/metabull?inviter=${userWallet}`
      this.btnText = 'Copy'
      this.btnDisabled = false

      this.$nextTick(() => {
        const elem = this.$refs.btnCopy.$el
        this._clipboard = new Clipboard(elem)
        this._clipboard.on('success', () => {
          this.btnText = 'Copied'
          this.btnDisabled = true
        })
      })
    },
    hide() {
      this.visible = false

