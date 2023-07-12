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

.marketplace-preview {
  width: 37.6rem;
  .display {
    position: relative;
    padding-top: 56.25%;
    height: 0;
    background-color: $color-placeholder6;
    .image,
    .video {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .prev,
    .next {
      position: absolute;
      top: 50%;
      width: 2rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      font-size: 0;
      background-color: rgba($color-white, 0.5);
      transform: translateY(-50%);
      @media (max-width: 768.89px) {
        width: 1.2rem;
        height: 1.8rem;
        line-height: 1.8rem;
      }
      &::before {
        content: '';
        display: inline-block;
        width: 40%;
        padding-top: 40%;
        vertical-align: middle;
      }
      &:hover {
        opacity: 0.93;
        cursor: pointer;
      }
    }
    .prev {
      left: 0;
      &::before {
        margin-left: 20%;
        border-top: 0.1rem solid $color-white;
        border-left: 0.1rem solid $color-white;
        transform: rotate(-45deg);
      }
    }
    .next {
      right: 0;
      &::before {
        margin-right: 20%;
        border-top: 0.1rem solid $color-white;
        border-right: 0.1rem solid $color-white;
        transform: rotate(45deg);
      }
    }
  }
  .thumbnails {
    margin-top: -1.34%;
    padding: 1.34% 0.67% 0;
    white-space: nowrap;
    font-size: 0;
    overflow-x: scroll;
    .item {
      position: relative;
      padding: 1.34% 0.67%;
      display: inline-block;
      width: 25%;
      cursor: pointer;
      .image {
        width: 100%;
        padding-top: 56.25%;
        background: $color-placeholder6 0 0 / cover no-repeat;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          top: -0.4rem;
          left: 50%;
          z-index: 10;
          display: block;
          width: 0;
          height: 0;
          border: 0.4rem solid transparent;
          border-bottom-color: $color-white;
          border-top: 0 none;
          @media (max-width: 768.89px) {
            top: -0.19rem;
            border-width: 0.22rem;
          }
        }
      }
    }
  }
}
</style>

