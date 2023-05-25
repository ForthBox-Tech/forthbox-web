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
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.number-input {
  display: flex;
  align-items: center;

  .btn-minus,
  .btn-add {
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    background: center center / 0.8rem no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      width: 1.4rem;
    }
  }
  .btn-minus {
    background-image: url('~@/assets/page-market2/comp-number-input/btn-minus.png');
    &:hover {
      background-image: url('~@/assets/page-market2/comp-number-input/btn-minus-a.png');
    }
  }
  .btn-add {
    background-image: url('~@/assets/page-market2/comp-number-input/btn-add.png');
    &:hover {
      background-image: url('~@/assets/page-market2/comp-number-input/btn-add-a.png');
    }
  }
  .input-value {
    margin: 0 0.3rem;
    padding: 0 0.5rem;
    width: 3rem;
    height: 1.5rem;
    text-align: center;
    border: 0.05rem solid $color-border;
    border-radius: 0.2rem;
    outline: none;
    @media (max-width: 768.89px) {
      margin: 0 0.2rem;
      padding: 0 0.3rem;
      width: 2rem;
    }
    &:hover {
