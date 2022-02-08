<template>
  <div class="refresh-wrap">
    <div class="refresh">
      <a class="icon" @click="onRefresh"></a>
      <span>{{ $t('Market2.UpdatedXxxAgo', { time: updateTimer }) }}</span>
    </div>
    <div class="count">{{ total >= 0 ? total : 0 }} {{ $t('Market2.Items') }}</div>
  </div>
</template>

<script>
import { createTimer } from '../common/helper'

export default {
  name: 'RefreshBar',
  props: {
    total: Number,
  },
  data() {
    return {
      updateTimer: '0s',
    }
  },
  methods: {
    onRefresh() {
      this.$emit('refresh')
    },

    createTimer() {
      this.updateTimer = '0s'
      this._updateTimer?.stop()
      this._updateTimer = createTimer((seconds, sTimer) => {
        this.updateTimer = sTimer
      })
    },
  },
  created() {},
  unmounted() {
    this._updateTimer?.stop()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.refresh-wrap {
  display: flex;
  align-items: center;
  margin: 1.5rem 0 1.1rem;
  @media (max-width: 768.89px) {
    margin: 0.6rem 0 0.5rem;
  }
  .refresh {
    flex: 1;
    line-height: 1rem;
    font-size: 0.6rem;
    color: $color-secondary;
    .icon {
      margin-right: 0.4rem;
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      background: url('~@/assets/page-market2/page-profile/icon-refresh.png') center center / 85%
        no-repeat;
      border-radius: 50%;
      vertical-align: middle;
      opacity: 0.85;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 0 0.1rem 0.05rem rgba(91, 92, 97, 0.16);
      }
    }
  }
  .count {
    font-size: 0.7rem;
    color: $color-primary;
  }
}
</style>

