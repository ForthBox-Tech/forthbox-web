<template>
  <Dialog :class="['fbx-modal', type]" :visible="visible" :bgVisible="bgVisible">
    <main :class="['modal-main', visible ? 'animateIn' : 'animateOut']">
      <h1 class="title" v-if="title">{{ title }}</h1>
      <div class="content">{{ content }}</div>
      <div class="btns" v-if="!!cancelBtnVisible || !!confirmBtnVisible">
        <a class="btn-cancel" v-if="!!cancelBtnVisible" @click="onCancel">
          {{ cancelBtnText || 'Cancel' }}
        </a>
        <a class="btn-confirm" v-if="!!confirmBtnVisible" @click="onConfirm">
          {{ confirmBtnText || 'OK' }}
        </a>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue'

export default {
  name: 'Modal',
  components: {
    Dialog,
  },
  props: {
    type: String, // toast, alert, confirm
    title: String,
    content: String,
    cancelBtnVisible: Boolean,
    cancelBtnText: String,
    cancelCallback: Function,
    confirmBtnVisible: Boolean,
    confirmBtnText: String,
    confirmCallback: Function,

    removeElement: Function,
  },
  data() {
    return {
      visible: false,
      bgVisible: true,
    }
  },
  methods: {
    show() {
      this.visible = true
      this.bgVisible = this.type !== 'toast'
    },
    hide() {
      this.visible = false
      setTimeout(() => {
        this.removeElement()
      }, 1000)
    },

    onCancel() {
      typeof this.cancelCallback == 'function' && this.cancelCallback()
      this.hide()
    },
    onConfirm() {
      typeof this.confirmCallback == 'function' && this.confirmCallback()
      this.hide()
    },
  },
}
</script>

