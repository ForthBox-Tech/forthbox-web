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

