<template>
  <textarea
    class="fbx-textarea"
    :rows="rows || 5"
    v-model="value"
    :placeholder="placeholder"
    :disabled="disabled"
  ></textarea>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    modelValue: String,
    placeholder: String,
    disabled: Boolean,
    rows: Number,
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

.fbx-textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 0.05rem solid $color-border;
  border-radius: 0.3rem;
  outline: none;
  resize: none;
  color: inherit;
  font-family: inherit;
  font-size: 0.75rem;
  @media (max-width: 768.89px) {
    padding: 0.45rem 0.5rem;
  }
  &:hover {
    border-color: $color-blue;
  }
  &::placeholder {
    color: $color-gray;
  }
}
</style>

