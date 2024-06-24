<template>
  <div class="fbx-pagination" v-if="total > size">
    <div class="item item-prev" @click="onPrev"></div>
    <div
      :class="{ item: true, active: current == order, more: order === 'more' }"
      v-for="order in list"
      :key="order"
      @click="onJump(order)"
    >
      {{ order === 'more' ? '...' : order }}
    </div>
    <div class="item item-next" @click="onNext"></div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 10,
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {}
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.size)
    },
    list() {
      const pages = this.pages
      const current = parseInt(this.current || 1)
      const list = []
      if (pages < 10) {
        for (let i = 1; i <= pages; i++) {
          list.push(i)
        }
      } else {
        if (current < 5) {
          for (let i = 1; i < 7; i++) {
            list.push(i)
          }
          list.push('more')
          list.push(pages)
        } else if (pages - current < 4) {
          list.push(1)
          list.push('more')
          for (let i = pages - 5; i <= pages; i++) {
            list.push(i)
          }
        } else {
          list.push(1)
          list.push('more')
          for (let i = current - 2; i <= current + 2; i++) {
            list.push(i)
          }
          list.push('more')
          list.push(pages)
        }
      }

      return list
    },
  },
  methods: {
    onPrev() {
      const current = parseInt(this.current) || 1
      if (current <= 1) return
      this.$emit('jump', current - 1)
    },
    onNext() {
      const current = parseInt(this.current) || 1
      if (current >= this.pages) return
      this.$emit('jump', current + 1)
    },
    onJump(order) {
      if (isNaN(order)) return
      this.$emit('jump', order)
    },
  },
}
</script>

<style lang="scss">
.fbx-pagination {
  display: inline-block;
  white-space: nowrap;
  .item {
    display: inline-block;
    margin: 0 0.3rem;
    box-sizing: border-box;
    padding: 0 0.4rem;
    min-width: 1.5rem;
    height: 1.5rem;
    line-height: 1.4rem;
    text-align: center;
    border: 0.05rem solid #5a5c66;
    border-radius: 0.1rem;
    font-size: 0.8rem;
    color: #fff;
    user-select: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &.active {
      opacity: 1;
      background-color: #efb35c;
      border-color: #efb35c;
      color: #000;
    }
  }
  .item-prev::before,
  .item-next::before {
    content: '';
    display: inline-block;
    width: 0.35rem;
    height: 0.35rem;
    vertical-align: 0.05rem;
  }
  .item-prev::before {
    border-top: 0.05rem solid #5a5c66;
    border-left: 0.05rem solid #5a5c66;
    transform: rotate(-45deg);
    margin-right: -0.1rem;
  }
  .item-next::before {
    border-top: 0.05rem solid #5a5c66;
    border-right: 0.05rem solid #5a5c66;
    transform: rotate(45deg);
    margin-left: -0.1rem;
  }
  .more {
    border: 0 none;
  }

  @media (max-width: 768.89px) {
    .item {
      margin: 0 0.2rem;
      padding: 0 0.15rem;
      min-width: 1.1rem;
      height: 1.1rem;
      line-height: 1rem;
      font-size: 0.6rem;
    }
    .item-prev::before,
    .item-next::before {
      width: 0.25rem;
      height: 0.25rem;
    }
  }
}
</style>

