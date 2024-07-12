<template>
  <section class="home-section home-stats">
    <h2 class="title">Platform stats</h2>
    <ul class="list" ref="statsData">
      <li class="item" v-for="item in stats" :key="item">
        <img class="image" :src="item.image" />
        <div class="value">{{ item.value }}</div>
        <div class="text">{{ item.text }}</div>
      </li>
    </ul>
  </section>
</template>

<script>
import { formatDigits } from '@/common/js/utils'

const COUNT = 100

export default {
  name: 'PlatformStats',
  data() {
    return {
      stats: [
        {
          image: require('@/assets/page-home/stats-nft.png'),
          text: 'NFT trading volume',
          value: '0',
          _value: 1147580,
        },
        {
          image: require('@/assets/page-home/stats-user.png'),
          text: 'Active users',
          value: '0',
          _value: 67168,
        },
        {
          image: require('@/assets/page-home/stats-game.png'),
          text: 'Games',
          value: '0',
          _value: 8,
        },
        {
          image: require('@/assets/page-home/stats-team.png'),
          text: 'Team members',
          value: '0',
          _value: 20,
        },
      ],
    }
  },
  methods: {
    _execAnimation(item, count = 1) {
      if (count < COUNT) {
        item.value = formatDigits(parseInt((item._value * count) / COUNT))
        setTimeout(() => {
          this._execAnimation(item, count + 1)
        }, Math.ceil(1000 / COUNT))
        return
      }
      item.value = formatDigits(item._value)
    },
    digitsAnimation() {
      this.stats.forEach((item) => {
        this._execAnimation(item)
      })
    },
  },
  mounted() {
    const options = {
      threshold: 0.4,
    }
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          this.digitsAnimation()
          observer.disconnect()
        }
      })
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.statsData)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.home-stats {
  background: url('~@/assets/page-home/bg1.png') center center / 100% 100% no-repeat;

