<template>
  <div class="verify-input" v-bind="$attrs">
    <Input
      class="verify-value"
      v-model="value"
      :placeholder="placeholder || 'Please enter the verification code'"
    ></Input>
    <Button class="verify-btn" :disabled="disabled" @click="onVerify">
      {{ timer > 0 ? timer : $t('Settings.Send') }}
    </Button>
  </div>
  <div id="g-verify" class="g-verify"></div>
</template>

<script>
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

const TIMER = 60

export default {
  name: 'VerifyCodeInput',
  components: {
    Input,
    Button,
  },
  props: {
    placeholder: String,
    modelValue: String,
    reset: {
      default: '',
    },
  },
  data() {
    return {
      disabled: false,
      timer: 0,
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
