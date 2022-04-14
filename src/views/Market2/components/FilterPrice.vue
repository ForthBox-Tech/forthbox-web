<template>
  <div class="filter-price">
    <div class="label">{{ $t('CompFilter.Price') }}</div>
    <div class="value">
      <Input class="input" type="text" v-model="min" placeholder="FBX"></Input>
      <span class="line">~</span>
      <Input class="input" type="text" v-model="max" placeholder="FBX"></Input>
      <Select class="select" v-model="unit" :list="TOKENS"></Select>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import { TOKENS } from '@/models/market2.model'

export default {
  name: 'FilterPrice',
  components: {
    Input,
    Select,
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      TOKENS,

      unit: TOKENS[0],
      min: '',
      max: '',
    }
  },
  watch: {
    modelValue(newVal) {
      this.min = newVal[0] || ''
      this.max = newVal[1] || ''
      this.unit = newVal[2] || TOKENS[0]
    },
    min() {
      this._change()
    },
    max() {
      this._change()
    },
    unit() {
      this._change()
    },
  },
  methods: {
    _change() {
      const data = [this.min, this.max, this.unit]
      this.$emit('update:modelValue', data)
      this.$emit('change', data)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.filter-price {
  padding: 1rem 0;
  border-bottom: 0.05rem solid $color-border;
  .label {
    margin-bottom: 0.8rem;
    line-height: 1.5;
    font-size: 0.7rem;
  }
  .value {
    display: flex;
    align-items: center;
  }
  .line {
    margin: 0 0.4rem;
  }
  .input {
    flex: 1;
  }
  .select {
    margin-left: 0.6rem;
    flex: 1.5;
    @media (max-width: 768.89px) {
      margin-left: 0.5rem;
    }
  }
}
</style>

