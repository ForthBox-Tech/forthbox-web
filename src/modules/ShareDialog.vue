<template>
  <Dialog class="dialog-share" :visible="visible">
    <main class="share-main">
      <a class="close" @click="onClose"> </a>
      <div class="content">
        <div class="image"></div>
        <div class="info">
          <h1 class="title">{{ $t('ShareDialog.Title') }}</h1>
          <input class="input" id="shareLink" type="text" :value="shareLink" />
          <Button
            class="btn-copy"
            ref="btnCopy"
            data-clipboard-target="#shareLink"
            :disabled="btnDisabled"
          >
            {{ btnText }}
          </Button>
        </div>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Clipboard from 'clipboard'
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'

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

      btnText: this.$t('ShareDialog.BtnText'),
      btnDisabled: false,
    }
  },
  methods: {
    show() {
      this.visible = true
      this.init()
    },
    hide() {
      this.visible = false
      this._clipboard && this._clipboard.destroy()
    },
    onClose() {
      this.hide()
    },

    init() {
      this.shareLink = `${location.origin}/#/share?inviter=${window.cWebModel.mAccount || ''}`
      this.btnText = this.$t('ShareDialog.BtnText')
      this.btnDisabled = false
      this.$nextTick(() => {
        const elem = this.$refs.btnCopy.$el
        this._clipboard = new Clipboard(elem)
        this._clipboard.on('success', () => {
          this.btnText = this.$t('ShareDialog.BtnText2')
          this.btnDisabled = true
        })
      })
    },
  },
  unmounted() {
    this._clipboard && this._clipboard.destroy()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-share {
  .share-main {
    position: relative;
    padding: 1.5rem;
    background-color: $color-white;
    border-radius: 0.8rem;
    @media (max-width: 768.89px) {
      padding: 1.3rem 0.9rem 1.2rem 0.9rem;
      border-radius: 0.5rem;
    }
  }
  .close {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    display: block;
    width: 1rem;
    height: 1rem;
    background: url('~@/assets/common/close.png') center center / contain no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      top: 0.7rem;
      right: 0.7rem;
      background-size: 80%;
    }
  }
  .content {
    display: flex;
    align-items: center;
    @media (max-width: 768.89px) {
      display: block;
    }
  }
  .image {
    width: 14rem;
    height: 9rem;
    background: url('~@/assets/minting/role-empty.png') center center / auto 80% no-repeat;
    border: 0.05rem solid $color-border;
    border-radius: 0.5rem;
    @media (max-width: 768.89px) {
      margin-top: 0.8rem;
      width: 13rem;
      height: 7rem;
    }
  }
  .info {
    margin-left: 0.8rem;
    @media (max-width: 768.89px) {
      margin: 0;
    }
  }
  .title {
    line-height: 2.4;
    text-align: left;
    font-size: 1rem;
    @media (max-width: 768.89px) {
      font-size: 0.85rem;
    }
  }
  .input {
    margin: 0.3rem 0 1.2rem;
    padding: 0 1rem;
    width: 20rem;
    line-height: 3;
    box-sizing: border-box;
    font-size: 0.9rem;
    background-color: $color-placeholder6;
    border: 0 none;
    outline: none;
    @media (max-width: 768.89px) {
      margin: 0 0 0.9rem;
      padding: 0 0.5rem;
      width: 100%;
      font-size: 0.8rem;
    }
  }
  .btn-copy {
    @include btn-fill-color();
    box-sizing: border-box;
    display: block;
    width: 8rem;
    padding: 0;
    line-height: 2.2rem;
    border-radius: 2.2rem;
    @media (max-width: 768.89px) {
      width: 100%;
    }
  }
}
</style>

