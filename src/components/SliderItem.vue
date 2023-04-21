<template>
  <div class="fbx-slider-item" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SliderItem',
  props: {
    url: String,
  },
  methods: {
    onClick() {
      const url = this.url
      if (!url) return

      if (/^https?/.test(url)) {
        window.open(url)
      } else {
        this.$router.push(url)
      }
    },
  },
}
</script>

<style lang="scss">
.fbx-slider-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  &:not(:first-child) {
    z-index: 0;
  }
}
</style>

