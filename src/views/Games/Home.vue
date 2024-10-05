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

export default {
  components: {},
  data() {
    return {
      games: GAMES,
    }
  },
  methods: {
    onPlay(game) {
      this.$router.push({
        path: '/games/collections',
        query: {
          type: game.type,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.games-home {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/page-games/page-home/bg.png') center center / cover no-repeat,
    rgba($color-black, 0.9);
  overflow: auto;
  @media (max-width: 768.89px) {
    display: block;
  }
  .main {
    margin: var(--nav2-height) 0;
  }
  .card {
    position: relative;
    display: inline-block;
    margin: 1.75em;
    width: 14em;
    height: 17.5em;
    font-size: 1rem;
    color: $color-white;
    background: 0 0 / 100% auto no-repeat;
    transition: transform 0.3s;
    @media (max-width: 768.89px) {
      font-size: 0.9rem;
    }
    &:hover {
      transform: translateY(-2.5%);
    }
    .info {
      margin: 86% 12% 0;
      line-height: 1.8;
      text-align: left;
    }
    .name {
      font-size: 1.2em;
      font-weight: bold;
    }
    .user {
      font-size: 0.8em;
      font-weight: 400;
      color: #2cf0ff;
    }
    .btn-play {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      display: inline-block;
      width: 65%;
      line-height: 2.86;
      text-align: center;
      text-transform: uppercase;
      font-size: 0.7em;
      font-weight: bold;
      color: $color-primary;
      background-color: #ffe603;
      border-radius: 3em;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 1.1em 0 #ffe603;
      }
      .text {
        position: relative;
        margin-right: 1em;
        &::after {
          content: '';
          position: absolute;
          right: -2.7em;
          top: 50%;
          transform: translate(-50%, -57%);
          display: inline-block;
          width: 1.4em;
          height: 0.5em;
          background: url('~@/assets/page-games/page-home/btn-arrow.png') center center / 100% auto
            no-repeat;
        }
      }
    }
  }
}
</style>
