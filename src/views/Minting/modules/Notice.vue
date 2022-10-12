<template>
  <div class="message" id="message">
    <div class="message-outer" ref="outer">
      <div
        class="message-inner"
        :class="[{ scroll: noticeScroll }]"
        :style="{ width: width }"
        ref="inner"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {
      noticeScroll: false,
      width: 'auto',
    }
  },
  mounted() {
    const innerScrollWidth = this.$refs.inner.scrollWidth
    const outerClientWidth = this.$refs.outer.clientWidth

    this.noticeScroll = innerScrollWidth > outerClientWidth
    this.width = innerScrollWidth + 'px'
  },
}
</script>

<style lang="scss">
.message-out::-webkit-scrollbar {
  overflow: scroll;
  height: 0 !important;
  width: 0 !important;
}
.scroll {
  animation: scroll 9s linear infinite;
}
@keyframes scroll {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%); /* 总长的一半再加上margin-left的一半 */
  }
}
</style>

