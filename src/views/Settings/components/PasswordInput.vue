<template>
  <Input class="pwd-input" :type="type" v-model="value">
    <a :class="['btn-eye', type == 'password' ? 'close' : '']" @click="onToggle"></a>
  </Input>
</template>

<script>
import Input from '@/components/Input.vue'

export default {
  name: 'PasswordInput',
  components: {
    Input,
  },
  props: {
    modelValue: String,
  },
  data() {
    return {
      type: 'password',
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  methods: {
    onToggle() {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
  },
}
</script>

<style lang="scss">
.pwd-input {
  .btn-eye {
    display: block;
    width: 2.5rem;
    height: 100%;
    background: url('~@/assets/page-settings/comp-input/eye-open.png') center center / 0.8rem
      no-repeat;
    cursor: pointer;
    &:hover {
      background-image: url('~@/assets/page-settings/comp-input/eye-open2.png');
    }
    &.close {
      background-image: url('~@/assets/page-settings/comp-input/eye-close.png');
      &:hover {
        background-image: url('~@/assets/page-settings/comp-input/eye-close2.png');
      }
    }
  }
}
</style>

