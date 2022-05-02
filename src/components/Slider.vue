<template>
  <div
    class="fbx-slider"
    ref="fbxSlider"
    @touchstart="touchStart"
    @touchend="touchEnd"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    autoplay: {
      type: Boolean,
      default: false,
    },
    distance: {
      type: Number,
      default: 5000,
    },
    current: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      index: 0,
    }
  },
  watch: {
    list() {
      // 监听滚动的列表数据，如果数据发生变化，则重新初始化
      this.$nextTick(() => {
        this.stop()
        this.init()
      })
    },
  },
  methods: {
    prev() {
      const pages = this.pages
      const currentIndex = this.index
      const nextIndex = (this.index + pages.length - 1) % pages.length
      this.stop()
      this.$emit('slide-start', { index: nextIndex })
      animate(pages, currentIndex, nextIndex, 1, () => {
        this.index = nextIndex
        this.$emit('slide-end', { index: nextIndex })
        if (this.autoplay) {
          this.loop()
        }
      })
    },
    next() {
      const pages = this.pages
      const currentIndex = this.index
      const nextIndex = (this.index + 1) % pages.length
      this.stop()
      this.$emit('slide-start', { index: nextIndex })
      animate(pages, currentIndex, nextIndex, -1, () => {
        this.index = nextIndex
        this.$emit('slide-end', { index: nextIndex })

        if (this.autoplay) {
          this.loop()
        }
      })
    },
    jump(targetIndex) {
      if (this.index == targetIndex) return
      const pages = this.pages
      const currentIndex = this.index
      const nextIndex = targetIndex
      const direction = currentIndex > nextIndex ? 1 : -1
      this.stop()
      this.$emit('slide-start', { index: nextIndex })
      animate(pages, currentIndex, nextIndex, direction, () => {
        this.index = nextIndex
        this.$emit('slide-end', { index: nextIndex })

        if (this.autoplay) {
          this.loop()
        }
      })
    },

    loop() {
      const pages = this.pages
      if (pages.length <= 1) return
      clearTimeout(this._autoTimeout)
      this._autoTimeout = setTimeout(() => {
        const currentIndex = this.index
        const nextIndex = (this.index + 1) % pages.length
        this.$emit('slide-start', { index: nextIndex })
        animate(pages, currentIndex, nextIndex, -1, () => {
          this.index = nextIndex
          this.$emit('slide-end', { index: nextIndex })

          this.loop()
        })
      }, this.distance)
    },
    stop() {
      clearTimeout(this._autoTimeout)
    },

    touchStart(event) {
      this._startX = event.changedTouches[0].pageX
    },
    touchEnd(event) {
      let currentX = event.changedTouches[0].pageX
      if (currentX - this._startX > 20) {
        this.prev()
      } else {
        this.next()
      }
    },
    mouseover() {
      this.stop()
    },
    mouseleave() {
      if (this.autoplay) {
        this.loop()
      }
    },

