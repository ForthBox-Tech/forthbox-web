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

.fbx-select {
  position: relative;
  box-sizing: border-box;
  height: 2.2rem;
  line-height: 2.1rem;
  font-size: 0.7rem;
  background-color: $color-white;
  border: 0.05rem solid $color-border;
  border-radius: 0.3rem;
  @media (max-width: 768.89px) {
    height: 2rem;
    line-height: 1.9rem;
    font-size: 0.65rem;
  }
  &:hover {
    border-color: $color-blue;
  }
  &.disabled {
    border-color: $color-border;
  }
  .select-inner {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .select-placeholder,
  .select-value {
    flex: 1;
    width: 0;
    padding: 0 0.1rem 0 0.75rem;
    @include ellipsis(1);
    @media (max-width: 768.89px) {
      padding: 0 0.1rem 0 0.5rem;
    }
  }
  .select-placeholder {
    color: $color-secondary;
    overflow: hidden;
  }
  .select-trigger {
    position: relative;
    width: 2rem;
    cursor: pointer;
    @media (max-width: 768.89px) {
      width: 1.4rem;
    }
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
      @media (max-width: 768.89px) {
        width: 0.3rem;
        height: 0.3rem;
        border-width: 0.05rem;
      }
    }
    &.active {
      &::before {
        transform: translate(-50%, -30%) rotate(-135deg);
      }
    }
  }
  &.disabled .select-trigger {
    cursor: initial;
    &::before {
      border-bottom-color: $color-border;
      border-right-color: $color-border;
    }
  }
  .select-dropdown {
    position: absolute;
    top: 110%;
    left: 0;
    z-index: 11;
    box-sizing: border-box;
    width: 100%;
    max-height: 10rem;
    line-height: 3;
    font-size: 0.9em;
    background-color: $color-white;
    border-radius: 0.3rem;
    box-shadow: 0 0.15rem 0.3rem 0.05rem rgba($color-black, 0.16);
    overflow: hidden auto;
    cursor: pointer;
  }
  .select-item {
    padding: 0 0.5rem;
    border-bottom: 0.05rem solid $color-border;
    &:last-child {
      border-bottom: 0 none;
    }
    &.selected {
      color: $color-blue;
      font-weight: 500;
    }
    &:hover {
      color: $color-white;
      background-color: $color-blue;
    }
  }
}
</style>

