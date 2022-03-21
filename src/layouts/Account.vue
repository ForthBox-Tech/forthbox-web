<template>
  <Dialog :visible="visible">
    <div class="fb-account">
      <div class="header">
        <img class="logo" src="@/assets/common/logo.png" />
        <div class="close" @click="onClose"></div>
      </div>
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '../components/Dialog'

export default {
  components: {
    Dialog,
  },
  props: {
    visible: Boolean,
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
  },
}
</script>

