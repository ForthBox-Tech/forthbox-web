<template>
  <label :class="['fbx-input', disabled ? 'disabled' : '']">
    <img v-if="icon" class="input-icon" :src="icon" />
    <input
      class="input-value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput"
      @keyup.enter="onEnter"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    icon: String,
    modelValue: [String, Number],
    placeholder: String,
    disabled: Boolean,
  },
  methods: {
    onInput(evt) {
      this.$emit('update:modelValue', evt.target.value)
      this.$emit('change', evt.target.value)
    },
    onEnter(evt) {
      this.$emit('enter', evt.target.value)
    },
  },
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

