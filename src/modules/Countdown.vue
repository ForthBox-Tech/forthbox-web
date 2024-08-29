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
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

@function transform($width, $scale) {
  @return calc($width * $scale / 1920);
}
@mixin timer-style($screen-width) {
  .main {
    position: relative;
    margin-top: -120px;
    width: transform(800px, $screen-width);
    height: transform(281px, $screen-width);
    background: url('~@/assets/dialog-countdown/bg.png') 0 0 no-repeat;
    background-size: 100%;
  }
  .time {
    position: absolute;
    left: 52%;
    bottom: 0%;
    white-space: nowrap;
    .split {
      display: inline-block;
      width: transform(10px, $screen-width);
      vertical-align: middle;
      &::before,
      &::after {
        content: '';
        display: block;
        margin: transform(10px, $screen-width) auto;
        width: transform(10px, $screen-width);
        height: transform(10px, $screen-width);
        background-color: $color-white;
        border-radius: 50%;
      }
    }
    .number {
      display: inline-block;
      margin: 0 transform(15px, $screen-width);
      width: transform(63px, $screen-width);
      line-height: transform(61px, $screen-width);
      font-size: transform(36px, $screen-width);
      font-weight: bold;
      color: #ab32f6;
      background-color: $color-white;
      border-radius: transform(10px, $screen-width);
      vertical-align: middle;
    }
  }
  .close {
    position: absolute;
    top: 0;
    right: transform(-48px, $screen-width);
    display: inline-block;
    width: transform(48px, $screen-width);
    height: transform(48px, $screen-width);
    background: url('~@/assets/dialog-countdown/close.png') center center / 50% no-repeat;
    cursor: pointer;
  }
}
.timer {
  @include timer-style(1920);
  @media (max-width: 768.89px) {
    @include timer-style(600);
  }
}
</style>

