<template>
  <section class="section why-forthbox-1 m-pb-0">
    <header class="header">
      <h1 class="title">{{ $t('Home.GameFi.WhyForthBox') }}</h1>
      <div class="title-content">{{ $t('Home.GameFi.WhyForthBox') }}</div>
    </header>
    <main class="main m-px-1">
      <h3 class="title">{{ $t('Home.GameFi.GameAggregation') }}</h3>
      <div class="text">
        {{ $t('Home.GameFi.ForthBoxHasMoreThen') }}
      </div>
      <ul class="tags m-my-2 m-w-auto">
        <li class="tag">
          <img src="@/assets/home/why1-tag1.png" />
          <div class="tag-text">{{ $t('Home.GameFi.Independent') }}</div>
        </li>
        <li class="tag tag2">
          <img src="@/assets/home/why1-tag2.png" />
          <div class="tag-text">{{ $t('Home.GameFi.GameIncubation') }}</div>
        </li>
        <li class="tag tag3">
          <img src="@/assets/home/why1-tag3.png" />
          <div class="tag-text">{{ $t('Home.GameFi.ThirdPartyGames') }}</div>
        </li>
      </ul>
    </main>
  </section>
</template>

<script>
export default {
  name: 'WhyForthbox1',}
</script>

<style lang="scss">
.home {
  .why-forthbox-1 {
    position: relative;
    z-index: 1;
    padding: 0 0 1rem;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: #121536 url('~@/assets/home/why1-bg.png') center right no-repeat;
      background-size: 89.375%;
      clip-path: polygon(0 0, 0 90%, 50% 100%, 100% 90%, 100% 0);
    }
    .main {
      max-width: 51rem;
      border-radius: 0.9rem;
      overflow: hidden;
      .title {
        line-height: 1.2;
        font-size: 1.5rem;
        font-weight: normal;
        text-align: center;
        &:after {
          content: '';
          display: block;
          margin: 1rem auto 0;
          width: 2.9rem;
          height: 0.2rem;
          border-radius: 0.1rem;
          background: linear-gradient(90deg, #0078ff, #ae00ff);
        }
      }
      .text {
        margin-top: 1.5rem;
        font-size: 18px;
      }
      .tags {
        display: flex;
        justify-content: center;
        margin: 4rem 0 4rem;
        padding-bottom: 0.5rem;
        white-space: nowrap;
        text-align: center;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .tag {
          flex: 1;
          margin: 0 1.3rem;
          padding: 0 0 2.5rem 0;
          max-width: 9rem;
          font-size: 0.9rem;
          color: #fff;
          text-align: center;
          background: linear-gradient(0deg, rgba(38, 46, 130, 0.64), rgba(12, 13, 39, 0.64));
          border: 1px solid rgba(68, 68, 120, 0.64);
          border-radius: 1.1rem;
          img {
            display: block;
            margin: 1.6rem 2.2rem;
            width: 4.5rem;
          }
          .tag-text {
            line-height: 1.5;
            padding: 0 1.2rem;
            white-space: normal;
          }
        }
      }
    }
    @media (max-width: 768.89px) {
      &:after {
        background: #121536 url(/img/home-why1-bg.a7cb4b2e.png) top left no-repeat;
        background-size: 145%;
        -webkit-clip-path: polygon(0 0, 0 95%, 50% 100%, 100% 95%, 100% 0);
        clip-path: polygon(0 0, 0 95%, 50% 100%, 100% 95%, 100% 0);
      }
      .main {
        .title {
          width: 10.5rem;
          margin: 0 auto;
          font-size: 0.8rem;
          text-align: center;
          &:after {
            content: '';
            display: block;
            margin: 0.4rem auto 0;
            width: 1.6rem;
            height: 0.1rem;
            border-radius: 0.1rem;
            background: linear-gradient(90deg, #0078ff, #ae00ff);
          }
        }
        .text {
          margin-top: 0.6rem;
          line-height: 1rem;
          font-size: 0.7rem;
          color: #c6c7e3;
        }
        .tags {
          .tag {
            margin: 0 0.3rem;
            padding: 0 0 0.8rem 0;
            max-width: 6rem;
            font-size: 0.6rem;
            img {
              margin: 0.4rem auto;
              width: 2.5rem;
            }
            .tag-text {
              padding: 0 3vw;
            }
          }
        }
      }
    }
  }

  .why-forthbox-1 {
    .header {
      opacity: 0;
      &.main-animation {
        opacity: 1;
        .title,
        .title-content {
          animation: blurFadeIn 1s ease-in forwards;
        }
      }
    }
    .main {
      .title,
      .text,
      .tag {
        opacity: 0;
      }
      &.main-animation {
        .title {
          animation: blurFadeIn 0.8s ease-in forwards;
        }
        .text {
          animation: blurFadeIn 1s ease-in forwards;
        }
        .tag {
          animation: flip 1s ease-in forwards;
        }
        .tag2 {
          animation-delay: 1s;
        }
        .tag3 {
          animation-delay: 2s;
        }
      }
    }
  }
}
</style>

