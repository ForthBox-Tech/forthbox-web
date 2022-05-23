<template>
  <main class="games-home">
    <ul class="main">
      <li
        class="card"
        v-for="game in games"
        :key="game.type"
        :style="{
          backgroundImage: `url(${game.bgImage})`,
        }"
      >
        <div class="info">
          <p class="name">{{ game.name }}</p>
          <p class="user">37000</p>
        </div>
        <a class="btn-play" @click="onPlay(game)">
          <span class="text">Play now</span>
        </a>
      </li>
    </ul>
  </main>
</template>

<script>
const GAMES = [
  {
    type: 'casual',
    name: '休闲游戏',
    user: 37000,
    bgImage: require('@/assets/page-games/page-home/bg-casual.png'),
  },
  {
    type: 'premium',
    name: '优质游戏',
    user: 37000,
    bgImage: require('@/assets/page-games/page-home/bg-premium.png'),
  },
  {
    type: 'blockchain',
    name: '区块链游戏',
    user: 37000,
    bgImage: require('@/assets/page-games/page-home/bg-blockchain.png'),
  },
]

