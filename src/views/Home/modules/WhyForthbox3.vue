<template>
  <section class="section why-forthbox-3">
    <main class="main m-px-1">
      <div class="info pc-layout-flex-auto m-mr-0">
        <h3 class="title">{{ $t('Home.SocialFi.SocialFi') }}</h3>
        <div class="text">
          {{ $t('Home.SocialFi.ForthBoxIsCommitted') }}
        </div>
      </div>
      <div class="img-wrap">
        <img style="width: 30.41vw" src="@/assets/home/why3-bg2.png" />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: 'WhyForthbox3',}
</script>

<style lang="scss">
@import '../home.animate.scss';

.home {
  .why-forthbox-3 {
    position: relative;
    z-index: 0;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: #121536 url('~@/assets/home/why3-bg1.png') 14.5% center no-repeat;
      background-size: 35rem;
      clip-path: polygon(0 0, 0 88%, 50% 100%, 100% 88%, 100% 0, 50% 12%);
    }
    .main {
      display: flex;
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
        margin-right: 1.5rem;
        max-width: 30.6rem;
      }
      .text {
        margin-top: 1.5rem;
        line-height: 1.2;
        text-align: left;
      }
      .img-wrap {
        margin: -4rem 0 -2.5rem;
      }
    }
    @media (max-width: 768.89px) {
      &:after {
        background-color: #121536;
        clip-path: polygon(0 0, 0 97%, 50% 100%, 100% 97%, 100% 0, 50% 4%);
      }
      .main {
        display: block;
        padding-bottom: 0.2rem;
        .title {
          padding: 2.2rem 0 0;
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
        .img-wrap {
          margin: 0;
          height: 11rem;
          text-align: center;
          overflow: hidden;
          img {
            width: 9rem !important;
          }
        }
        .info {
          max-width: none;
        }
      }
    }
  }

  .why-forthbox-3 {
    .info,
    .img-wrap {
      opacity: 0;
    }
    .main {
      min-height: 25rem;
    }
    .main-animation {
      .info {
        animation: fadeInLeft 2s ease-in forwards;
      }
      .img-wrap {
        animation: fadeInBottom 2s ease-in forwards;
      }
    }
  }
}
</style>

