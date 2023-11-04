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

.fbx-input {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 2.2rem;
  font-size: 0.7rem;
  background-color: $color-white;
  border: 0.05rem solid $color-border;
  border-radius: 0.3rem;
  @media (max-width: 768.89px) {
    height: 2rem;
    font-size: 0.65rem;
  }
  &:hover {
    border-color: $color-blue;
  }
  &.disabled {
    border-color: $color-border;
  }
  .input-icon {
    display: block;
    margin-left: 0.75rem;
    width: 0.8rem;
    height: 0.8rem;
    @media (max-width: 768.89px) {
      margin-left: 0.6rem;
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  .input-value {
    display: block;
    flex: 1;
    box-sizing: border-box;
    width: 0;
    height: inherit;
    padding: 0 0.75rem;
    border: 0 none;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    text-align: inherit;
    @media (max-width: 768.89px) {
      padding: 0 0.5rem;
    }
    &::placeholder {
      color: $color-gray;
    }
  }
}
</style>

