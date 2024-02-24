<template>
  <div class="filter-collapse" v-if="vList.length">
    <div class="header" @click="onToggle">
      <span class="title">{{ title }}</span>
      <span :class="['trigger', visible ? 'active' : '']"></span>
    </div>
    <ul class="list" v-if="visible">
      <li
        v-for="item in vList"
        :key="item.text"
        :class="['item', item.active ? 'active' : '']"
        @click="onSelect(item)"
      >
        <span class="text">{{ item.text }}</span>
        <span class="radio"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilterCollapse',
  props: {
    type: {
      /**
       * @type {'radio' | 'checkbox'}
       */
      type: String,
      default: 'radio',
    },
    title: String,
    /**
     * @type {string[] | { text: string, value: string }[]}
     */
    list: Array,
    /**
     * @type {string[]}
     */
    modelValue: Array,
    defaultUnfold: Boolean,
  },
  data() {
    return {
      visible: this.defaultUnfold || false,
      vList: [],
    }
  },
  watch: {
    list(list) {
      this._init(list)
    },
    modelValue(value) {
      this.vList.forEach((item) => {
        item.active = value.indexOf(item.value) > -1 || (!value.length && !item.value)
      })
    },
  },
  methods: {
    onToggle() {
      this.visible = !this.visible
    },
    onSelect(item) {
      let data = []

      if (this.type === 'radio') {
        data = this._radioHandler(item)
      } else {
        data = this._checkboxHandler(item)
      }

      this.$emit('update:modelValue', data)
      this.$emit('change', data)
    },

    _radioHandler(item) {
      const data = []

      this.vList.forEach((_item) => {
        if (_item.text == item.text) {
          _item.active = !_item.active
        } else {
          _item.active = false
        }

        if (_item.active) {
          data.push(_item.value)
        }
      })

      return data
    },
    _checkboxHandler(item) {
      item.active = !item.active

      const data = []
      this.vList.forEach((_item) => {
        if (_item.active) {
          data.push(_item.value)
        }
      })

      return data
    },

    _init(list) {
      const modelValue = this.modelValue || []

      this.vList = (list || []).map((item) => {
        const text = item && item.text !== undefined ? item.text : item
        const value = item && item.value !== undefined ? item.value : text
        return {
          text,
          value,
          active: modelValue.indexOf(value) > -1 || (!modelValue.length && !value),
        }
      })
    },
  },
  created() {
    this._init(this.list)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.filter-collapse {
  padding: 0.5rem 0;
  line-height: 1.8rem;
  font-size: 0.7rem;
  border-bottom: 0.05rem solid $color-border;
  .header {
    display: flex;
    .title {
      flex: 1;
    }
    .trigger {
      position: relative;
      width: 2rem;
      cursor: pointer;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%) rotate(45deg);
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        border-bottom: 0.1rem solid $color-secondary;
        border-right: 0.1rem solid $color-secondary;
      }
      &.active {
        &::before {
          transform: translate(-50%, -30%) rotate(-135deg);
        }
      }
    }
  }
  .list {
    max-height: 15rem;
    overflow: hidden auto;
    .item {
      display: flex;
      width: 100%;
      cursor: pointer;
      &:hover {
        color: lighten($color-primary, 30);
      }
      .text {
        flex: 1;
      }
      .radio {
        width: 2rem;
        background: url('~@/assets/page-market2/comp-filter/radio-normal.png') center center / 1rem
          no-repeat;
      }
      &.active {
        .radio {
          background-image: url('~@/assets/page-market2/comp-filter/radio-checked.png');
        }
      }
    }
  }
}
</style>

