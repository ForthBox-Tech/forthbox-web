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
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  watch: {
    reset() {
      this.resetData()
    },
  },
  methods: {
    onVerify() {
      if (this.disabled) return

      if (typeof this._gVerify != 'undefined') {
        window.grecaptcha.reset(this._gVerify)
        return
      }

      this._gVerify = window.grecaptcha.render('g-verify', {
        sitekey: '6LfgvHMeAAAAAMAFcPH4P9DyeXYHsuHSLdJeGenY',
        callback: (gToken = '') => {
          this.$emit('get-verify', {
            gToken,
            next: () => {
              this.disabled = true
              this.execTimer(TIMER)
            },
          })
        },
      })
    },

    resetData() {
      this.disabled = false
      this.timer = 0
    },
    execTimer(timer) {
      if (timer <= 0) {
        this.disabled = false
        return
      }

      this.timer = timer - 1

