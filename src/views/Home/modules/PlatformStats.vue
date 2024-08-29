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

  .list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin: 1rem auto 3rem;
    max-width: 65rem;
    text-align: center;
    @media (max-width: 768.89px) {
      margin: 0.5rem auto 1.2rem;
      padding: 0 0.4rem;
    }
  }
  .item {
    width: 46.5%;
    box-sizing: border-box;
    padding: 2rem 1rem;
    margin: 1.2rem 0.6rem;
    background-color: #f8f8ff;
    border-radius: 0.5rem;
    @media (max-width: 768.89px) {
      width: 47%;
      padding: 1.2rem 0.6rem;
      margin: 0.3rem 0;
    }
    &:hover {
      box-shadow: 0 0.15rem 0.5rem 0.05rem rgba(12, 69, 126, 0.16);
    }
    .image {
      display: block;
      margin: 0 auto 0.8rem;
      width: 40%;
      max-width: 4.5rem;
      @media (max-width: 768.89px) {
        margin-bottom: 0.5rem;
      }
    }
    .value {
      line-height: 1.5;
      font-size: 2.1rem;
      font-weight: bold;
      @media (max-width: 768.89px) {
        font-size: 1.2rem;
      }
    }
    .text {
      font-size: 1rem;
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
      }
    }
  }
}
</style>

