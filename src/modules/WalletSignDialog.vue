<template>
  <Dialog class="wallet-sign-dialog" :visible="visible">
    <main class="wallet-main">
      <header class="header">
        <h1 class="title">Welcome to ForthBox</h1>
      </header>
      <section class="content">
        <img class="logo" src="@/assets/common/token-fbx.png" />
        <p class="text">
          <span>By connecting your wallet and using ForthBox, </span>
          <span>
            you agree to our
            <a
              class="link"
              href="https://static.forthbox.io/document/Terms-of-Service.pdf"
              target="_blank"
            >
              Terms of Service
            </a>
            and Privacy Policy .
          </span>
        </p>
      </section>
      <footer class="footer">
        <Button class="btn-cancel" :handler="onCancel">Cancel</Button>
        <Button class="btn-ok" loader :handler="onSign">Accept and sign</Button>
      </footer>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import emitter from '@/common/js/emitter'

export default {
  name: 'WalletSignDialog',
  components: {
    Dialog,
    Button,
  },
  props: {},
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      if (this.visible) return
      this.visible = true
    },
    hide() {
      if (!this.visible) return
      this.visible = false
    },

    onCancel() {
      this.$root.logout()
      this.hide()
    },
    async onSign() {
      await this.$root.sign()
      await this.$root.getUserInfo()

      this.hide()

      emitter.emit('auth-change')
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

