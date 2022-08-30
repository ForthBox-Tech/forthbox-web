<template>
  <div :class="['fbx-select', iDisabled ? 'disabled' : '']" ref="Select">
    <div class="select-inner" @click.stop="onToggle">
      <span v-if="!modelValue && placeholder" class="select-placeholder">{{ placeholder }}</span>
      <span v-else class="select-value">{{ (modelValue && modelValue.text) || modelValue }}</span>
      <span :class="['select-trigger', visible ? 'active' : '']"></span>
    </div>
    <ul class="select-dropdown" v-if="visible">
      <li
        :class="['select-item', modelValue == item ? 'selected' : '']"
        v-for="item in list"
        :key="item"
        @click="onSelect(item)"
      >
        {{ (item && item.text) || item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    /**
     * @type {string[] | { text: string, ... }[]}
     */
    list: Array,
    /**
     * @type {string | { text: string, ... }}
     */
    modelValue: [String, Object],
    disabled: Boolean,
    placeholder: String,
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    iDisabled() {
      return this.disabled || !this.list || !this.list.length
    },
  },
  methods: {
    _hide() {
      this.visible = false
    },

    onToggle() {
      if (this.iDisabled) return
      this.visible = !this.visible
    },
    onSelect(item) {
      this.$emit('update:modelValue', item)
      this.$emit('change', item)
    },
  },
  created() {
    document.addEventListener('click', this._hide)
  },
  unmounted() {
    document.removeEventListener('click', this._hide)
  },
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

