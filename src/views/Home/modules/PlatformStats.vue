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
