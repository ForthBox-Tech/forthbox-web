<template>
  <section class="section gamefi-center m-pb-0">
    <header class="header">
      <h1 class="title">{{ $t('Home.GameCenter.GameCenter') }}</h1>
      <div class="title-content">{{ $t('Home.GameCenter.GameCenter') }}</div>
    </header>
    <main class="main m-mx-1">
      <div class="text-wrap pc-layout-flex">
        <div class="pc-mr-5v">
          {{ $t('Home.GameCenter.ForthBoxHasMoreThan') }}
        </div>
        <div class="m-mt-1">
          <router-link class="btn-more" to="/game2">
            <span class="inner">{{ $t('Home.GameCenter.More') }}</span>
          </router-link>
        </div>
      </div>
      <div class="games-wrap">
        <div class="left m-v-hide">
          <img src="@/assets/home/gamefi-slider-left.png" />
        </div>
        <div class="games-list">
          <div class="game-item">
            <router-link
              :to="{
                path: '/game2',
              }"
            >
              <img class="game-banner" src="@/assets/home/gamefi-slider-1.jpg" />
            </router-link>
          </div>
          <div class="game-item">
            <img class="game-banner" src="@/assets/home/gamefi-slider-2.jpg" />
          </div>
          <div class="game-item">
            <img class="game-banner" src="@/assets/home/gamefi-slider-3.jpg" />
          </div>
          <div class="game-item">
            <img class="game-banner" src="@/assets/home/gamefi-slider-0.png" />
          </div>
        </div>
        <div class="right m-v-hide">
          <img src="@/assets/home/gamefi-slider-right.png" />
        </div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: 'GameCenter',
  methods: {
    onGamesLeft() {},
    onGamesRight() {},
  },
}
</script>

<style lang="scss">
.home {
  .gamefi-center {
    padding: 0 0 4rem 0;
    .main {
      font-size: 0.9rem;
    }
    .btn-more {
      display: block;
      width: 4.4rem;
      height: 1.6rem;
      margin-top: -0.15rem;
      padding: 0.05rem;
      font-size: 0.8rem;
      text-align: center;
      color: #fff;
      border-radius: 1rem;
      background: linear-gradient(90deg, #0078ff, #ae00ff);
      .inner {
        display: block;
        padding: 0 0.4rem 0 0.7rem;
        line-height: 1.6rem;
        border-radius: 1rem;
        background-color: #0c0d27;
        &::after {
          content: '';
          margin-left: 0.2rem;
          display: inline-block;
          width: 0.7rem;
          height: 0.7rem;
          background: url('~@/assets/home/gamefi-more.png') 0 0 no-repeat;
          background-size: 100%;
          vertical-align: -0.1rem;
        }
      }
    }
    .games-wrap {
      display: flex;
      align-items: center;
      margin: 2.5rem 0 0;

      .left {
        flex: 1;
        width: 1.2rem;
        text-align: left;
      }
      .right {
        flex: 1;
        width: 1.2rem;
        text-align: right;
      }
      .games-list {
        width: 53.1rem;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .game-item {
        position: relative;
        display: inline-block;
        margin-right: 0.76rem;
        width: 17.15rem;
        height: 9.5rem;
        border-radius: 0.7rem;
        background-color: #808080;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
      .game-banner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    @media (max-width: 768.89px) {
      .header {
        margin-top: 1rem;
      }
      .main {
        .text-wrap {
          line-height: 1.2rem;
          text-align: left;
          font-size: 0.7rem;
          color: #c6c7e3;
        }
        .btn-more {
          border-radius: 0.25rem;
          .inner {
            border-radius: 0.25rem;
          }
        }
      }
    }
  }
}
</style>

