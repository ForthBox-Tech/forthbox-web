<template>
  <section class="section why-forthbox-4 m-pb-1">
    <main class="main pc-layout-flex m-px-1">
      <div class="m-v-hide">
        <img class="m-w-100" src="@/assets/home/why4-1.png" />
      </div>
      <div class="info pc-layout-flex-auto m-ml-0 m-mt-2">
        <h3 class="title">{{ $t('Home.Innovated.Innovation') }}</h3>
        <div class="text">
          {{ $t('Home.Innovated.PlayersCanTrulyOwnTheirLootInGames') }}
        </div>
        <img class="pc-v-hide" src="@/assets/home/why4-1.png" />
      </div>
    </main>
    <img class="why4-bg m-v-hide" src="@/assets/home/why4-2.png" />
  </section>
</template>

<script>
export default {
  name: 'WhyForthbox4',}
</script>

<style lang="scss">
.home {
  .why-forthbox-4 {
    position: relative;
    padding: 0 0 6rem 0;
    .main {
      align-items: center;
      .title {
        line-height: 1.2;
        font-size: 1.2rem;
        font-weight: normal;
        &:after {
          content: '';
          display: block;
          margin: 0.4rem 0 0;
          width: 2.9rem;
          height: 0.2rem;
          border-radius: 0.1rem;
          background: linear-gradient(90deg, #0078ff, #ae00ff);
        }
      }
      .info {
        margin: 6rem 0 0 3rem;
        max-width: 30.6rem;
      }
      .text {
        margin-top: 1.5rem;
        line-height: 1.2;
        text-align: left;
      }
    }
    .why4-bg {
      position: absolute;
      top: 0;
      right: -12rem;
    }
    @media (max-width: 768.89px) {
      .main {
        .title {
          width: 12.5rem;
          margin: 0 auto;
          font-size: 0.8rem;
          text-align: center;
          &:after {
            margin: 0.4rem auto 0;
            width: 1.4rem;
            height: 0.1rem;
          }
        }
        .text {
          margin-top: 1rem;
          line-height: 1.2rem;
          text-align: center;
          font-size: 0.7rem;
          color: #c6c7e3;
        }
        .info {
          max-width: none;
          text-align: center;
          img {
            width: 10rem;
            margin-top: -2rem;
          }
        }
      }
    }
  }

  .why-forthbox-4 {
    .m-v-hide,
    .info {
      opacity: 0;
    }
    .main-animation {
      .info {
        animation: fadeInRight 2s ease-in forwards;
      }
      .m-v-hide {
        animation: blurFadeIn 1s ease-in forwards;
      }
    }
  }
  @media (min-width: 768.89px) {
    .why-forthbox-4 {
      .m-v-hide {
        animation: blurFadeIn 1s ease-in forwards;
      }
    }
  }
}
</style>

