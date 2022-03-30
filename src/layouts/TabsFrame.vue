<template>
  <section class="tabs-frame">
    <nav class="tabs">
      <a
        v-for="tab in iTabs"
        :key="tab"
        :class="['item', current == tab ? 'active' : '']"
        @click="onTab(tab)"
      >
        {{ tab.text }}
      </a>
    </nav>
    <slot :name="current.name"></slot>
  </section>
</template>

<script>
import { type } from '@/common/js/utils'

export default {
  props: {
    tabs: Array,
    modelValue: String,
  },
  data() {
    const { current, iTabs } = this._calcTabs()
    this.current = current
    this.$emit('tab-change', current)

    return {
      iTabs,
      current,
    }
  },
  watch: {
    tabs() {
      const { current, iTabs } = this._calcTabs()
      this.iTabs = iTabs
      this.current = current
    },
    modelValue(value) {
      const index = this.iTabs.findIndex((item) => item.name === value)
      this.current = this.iTabs[index]
    },
  },
  methods: {
    onTab(tab) {
      this.current = tab
      this.$emit('tab-change', tab)
      this.$emit('update:modelValue', tab.name)
    },

    _calcTabs() {
      let currentIndex = 0
      const iTabs = (this.tabs || []).map((tab, index) => {
        let temp = tab
        if (type(temp) === 'object') {
          temp.name = temp.name || (temp.text || '').replace(/\s+/g, '')
        } else {
          temp = {
            text: tab,
            name: tab.replace(/\s+/g, ''),
          }
        }

        if (temp.name === this.modelValue) {
          currentIndex = index
        }

        return temp
      })

      const current = iTabs[currentIndex]

      return {
        iTabs,
        current,
      }
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.tabs-frame {
  flex: 1;
  @media (max-width: 768.89px) {
    margin-top: 1.5rem;
  }
  .tabs {
    text-align: left;
    font-size: 0;
    white-space: nowrap;
    overflow: auto hidden;
    border-bottom: 0.05rem solid $color-border;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      display: inline-block;
      margin: 0 1.5rem -0.1rem 0;
      font-size: 0.9rem;
      color: $color-primary;
      line-height: 1.6rem;
      padding-bottom: 0.6rem;
      border-bottom: 0.15rem solid transparent;
      cursor: pointer;
      @media (max-width: 768.89px) {
        margin: 0 1rem -0.1rem 0;
        padding-bottom: 0.3rem;
        font-size: 0.8rem;
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: lighten($color-primary, 20);
      }
      &.active {
        color: $color-primary;
        font-weight: 500;
        border-bottom-color: $color-black;
      }
    }
  }
}
</style>
