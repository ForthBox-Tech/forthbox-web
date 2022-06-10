<template>
  <Dialog class="dialog-metabull dialog-team-confirm" :visible="visible" @hide="onHide">
    <main class="main">
      <a class="close" @click="onHide"></a>
      <div class="text">You cannot change to join the other team after selection</div>
      <Button class="btn-ok" :handler="onConfirm">Confirm to join</Button>
    </main>
  </Dialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'TeamConfirmDialog',
  components: {
    Dialog,
    Button,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show(callback) {
      this.visible = true

      this._callback = callback
    },
    hide() {
      this.visible = false
    },

    onHide() {
      this.hide()
      typeof this._callback === 'function' && this._callback(false)
    },

    onConfirm() {
      this.hide()
      typeof this._callback === 'function' && this._callback(true)
    },
  },
}
</script>

<style lang="scss">
.dialog-team-confirm {
  .main {
    width: 20rem;
    padding: 1.8rem 1.5rem 1.5rem;
    text-align: center;
    @media (max-width: 768.89px) {
      padding: 1rem 0.6rem;
      width: 14rem;
    }
    .btn-ok {
      width: 8rem;
      margin: 1.7rem auto 0;
      padding: 0 0.5rem;
      line-height: 2rem;
      border-radius: 1rem;
      background: linear-gradient(90deg, #03a9ff 0%, #df01ff 100%);
      @media (max-width: 768.89px) {
        margin: 1.2rem auto 0;
        width: 6rem;
        font-size: 0.7rem;
      }
    }
  }
}
</style>

