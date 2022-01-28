<template>
  <div :class="['number-input', disabled ? 'disabled' : '']">
    <a class="btn-minus" @click="onMinus"></a>
    <input
      class="input-value"
      type="text"
      v-model="value"
      :disabled="!!disabled"
      :placeholder="placeholder"
    />
    <a class="btn-add" @click="onAdd"></a>
    <a class="btn-max" @click="onMax">
      Max
      <small v-if="max > 0">({{ max }})</small>
    </a>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    max: Number,
    modelValue: String,
    disabled: Boolean,
    placeholder: String,
  },
  data() {
    return {
      value: this.modelValue || 1,
    }
  },
  watch: {
    modelValue(newVal) {
      this.value = newVal || ''
    },
    value(newVal, oldVal) {
      if (newVal !== '' && !/^\d*$/.test(`${newVal}`)) {
        this.value = parseFloat(oldVal) ? oldVal : 1
      } else {
        this.$emit('update:modelValue', `${newVal}`)
      }
    },
  },
  methods: {
    onMinus() {
      if (this.disabled) return
      const num = parseInt(this.value) || 0
      this.value = num > 1 ? num - 1 : 1
    },
    onAdd() {
      if (this.disabled) return
      const num = parseInt(this.value) || 0
      const max = parseInt(this.max) || Infinity
      this.value = num < max ? num + 1 : max
    },
    onMax() {
      if (this.disabled) return
      this.value = this.max
    },
  },
  created() {},
}
