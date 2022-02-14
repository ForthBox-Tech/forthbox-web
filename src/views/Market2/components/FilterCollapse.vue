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

