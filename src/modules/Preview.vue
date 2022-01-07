<template>
  <div class="marketplace-preview">
    <div class="display">
      <img class="image" v-if="focusItem.image" :src="focusItem.image" />
      <video class="video" v-if="focusItem.video" :src="focusItem.video" controls></video>

      <a class="prev" @click="onPrev"></a>
      <a class="next" @click="onNext"></a>
    </div>
    <div class="thumbnails">
      <div
        v-for="(item, index) in list"
        :key="item"
        :id="`thumb-${index}`"
        :class="['item', current === index ? 'active' : '']"
        @click="onItem(index)"
      >
        <div
          class="image"
          :style="{
            backgroundImage: item.image ? `url('${item.image}')` : '',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    /**
     * @type {{ image: string, video: string }[]}
     */
    list: Array,
  },
  data() {
    return {
      current: 0,
    }
  },
  computed: {
    focusItem() {
      return this.list[this.current] || {}
    },
  },
  methods: {
    onPrev() {
      const current = this.current
      const min = 0
      this.current = current > min ? current - 1 : 0
      this._scrollIntoView(this.current)
    },
    onNext() {
      const current = this.current
      const max = this.list.length - 1
      this.current = current < max ? current + 1 : max
      this._scrollIntoView(this.current)
    },
    onItem(index) {
      this.current = index
      this._scrollIntoView(this.current)
    },

    _scrollIntoView(index) {
      const elem = document.querySelector(`.marketplace-preview #thumb-${index}`)
      elem.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
    },
  },
  created() {
    this.current = 0
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

