<template>
  <Dialog class="timer" :visible="visible">
    <main class="main" @click="onMinting">
      <div class="time">
        <div class="number">{{ time[0] }}</div>
        <div class="split"></div>
        <div class="number">{{ time[1] }}</div>
        <div class="split"></div>
        <div class="number">{{ time[2] }}</div>
      </div>
      <a class="close" v-if="this.closeVisible" @click.stop="onClose"> </a>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { createCountdown } from '@/common/js/utils'
import { getLeftTime, isOpen } from '@/helpers/timer.helper'

export default {
  name: 'Countdown',
  components: {
    Dialog,
  },
  props: {
    forceVisible: {
      type: Boolean,
      default: true,
    },
    closeVisible: {
      type: Boolean,
      default: true,
    },
    jumpTo: String,
  },
  data() {
    return {
      visible: this.forceVisible,
      time: [],
    }
  },
  methods: {
    onMinting() {
      if (this.jumpTo) {
        this.$router.push(this.jumpTo)
      }
    },
    onClose() {
      this._stopTimer()
      this.visible = false
      this.$emit('close')
    },

    _stopTimer() {
      this._timer && this._timer.stop && this._timer.stop()
    },
  },
  mounted() {
    if (isOpen()) {
      this.onClose()
      return
    }

    const left = getLeftTime()
    this._timer = createCountdown(left, (time, leftTime) => {
      if (leftTime <= 0) {
        this.onClose()
        window.location.reload()
        return
      }
      this.time = [`0${parseInt(time[0]) * 24 + parseInt(time[1])}`.slice(-2), time[2], time[3]]
    })
  },
  unmounted() {
    this._stopTimer()
  },
}
