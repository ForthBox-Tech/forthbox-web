<template>
  <div class="digital-input">
    <a class="btn-minus" @click="onMinus">-</a>
    <input class="num-input" type="text" v-model="value" />
    <a class="btn-add" @click="onAdd">+</a>
    <a class="btn-max" @click="onMax">Max</a>
  </div>
</template>

<script>
export default {
  name: 'DigitalInput',
  props: {
    max: {
      type: Number,
      default: Infinity,
    },
    modelValue: Number,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: this.modelValue,
    }
  },
  watch: {
    value(newVal, oldVal) {
      const value = Number(newVal)
      if ((newVal !== '' && (!/^\d*$/.test(`${newVal}`) || value > this.max)) || value < 0) {
        this.value = oldVal
      } else {
        this.$emit('update:modelValue', value)
      }
    },
    modelValue(newVal) {
      if (this.value != newVal) {
        this.value = newVal
      }
    },
  },
  methods: {
    onMinus() {
      this.value = Math.max(parseInt(this.value) - 1, 0)
    },
    onAdd() {
      this.value = Math.min(parseInt(this.value) + 1, this.max)
    },
    onMax() {
      this.value = this.max
    },
  },
}
</script>

<style lang="scss">
.digital-input {
  font-size: 0.7rem;
  @mixin btn() {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border: 1px solid #5a5c66;
    border-radius: 0.1rem;
    text-align: center;
    font-size: inherit;
    color: #e6e6e6;
    cursor: pointer;
    user-select: none;
  }
  .btn-minus {
    @include btn();
    font-family: 'Courier New', Courier, monospace;
  }
  .btn-add {
    @include btn();
  }
  .btn-max {
    @include btn();
    margin-left: 1rem;
    padding: 0 0.5rem;
    width: auto;
  }
  .num-input {
    outline: none;
    margin: 0;
    border: 0 none;
    padding: 0;
    width: 4rem;
    height: 1.5rem;
    text-align: center;
    font-size: inherit;
    color: #efb35c;
    background: transparent;
  }
}
</style>

