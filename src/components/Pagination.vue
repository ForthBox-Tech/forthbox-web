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
