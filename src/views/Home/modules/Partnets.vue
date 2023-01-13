<template>
  <section class="section partners">
    <header class="header">
      <h1 class="title">{{ $t('Home.Partners.Partners') }}</h1>
      <div class="title-content">{{ $t('Home.Partners.Partners') }}</div>
    </header>
    <h2 class="sub-title">Investors</h2>
    <main class="main">
      <div class="partner partner-1"></div>
      <div class="partner partner-2"></div>
      <div class="partner partner-3"></div>
      <div class="partner partner-4"></div>
      <div class="partner partner-17"></div>
    </main>
    <h2 class="sub-title">Partners</h2>
    <main class="main">
      <div class="partner partner-5"></div>
      <div class="partner partner-6"></div>
      <div class="partner partner-7"></div>
      <div class="partner partner-8"></div>
      <div class="partner partner-9"></div>
      <div class="partner partner-10"></div>
      <div class="partner partner-11"></div>
      <div class="partner partner-12"></div>
      <div class="partner partner-13"></div>
      <div class="partner partner-14"></div>
      <div class="partner partner-15"></div>
      <div class="partner partner-16"></div>
    </main>
  </section>
</template>

<script>
export default {
  name: 'Partnets',}
</script>

<style lang="scss">
.home {
  .partners {
    position: relative;
    z-index: 1;
    margin: 3rem 0 0;
    padding: 3rem 1rem 3rem;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: #121536;
      clip-path: polygon(0 0, 0 100%, 50% 100%, 100% 100%, 100% 0, 50% 12%);
    }
    .sub-title {
      margin-bottom: 1.5rem;
      font-size: 1.6rem;
      @media (max-width: 768.89px) {
        font-size: 0.9rem;
      }
    }
    .main {
      margin-bottom: 3rem !important;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      background: url('~@/assets/home/partnets-bg.png') center center no-repeat;
      background-size: auto 100%;
      @media (max-width: 768.89px) {
        background-size: 100% auto;
      }
    }
    .partner {
      margin: 0.4rem 0;
      padding-top: 8%;
      width: 25%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100%;
      @media (max-width: 768.89px) {
        padding-top: 18%;
        width: 50%;
      }
      &.partner-1 {
        background-image: url('~@/assets/home/partnets-1.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-1a.png');
        }
      }
      &.partner-2 {
        background-image: url('~@/assets/home/partnets-2.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-2a.png');
        }
      }
      &.partner-3 {
        background-image: url('~@/assets/home/partnets-3.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-3a.png');
        }
      }
      &.partner-4 {
        background-image: url('~@/assets/home/partnets-4.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-4a.png');
        }
      }
      &.partner-5 {
        background-image: url('~@/assets/home/partnets-5.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-5a.png');
        }
      }
      &.partner-6 {
        background-image: url('~@/assets/home/partnets-6.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-6a.png');
        }
      }
      &.partner-7 {
        background-image: url('~@/assets/home/partnets-7.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-7a.png');
        }
      }
      &.partner-8 {
        background-image: url('~@/assets/home/partnets-8.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-8a.png');
        }
      }
      &.partner-9 {
        background-image: url('~@/assets/home/partnets-9.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-9a.png');
        }
      }
      &.partner-10 {
        background-image: url('~@/assets/home/partnets-10.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-10a.png');
        }
      }
      &.partner-11 {
        background-image: url('~@/assets/home/partnets-11.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-11a.png');
        }
      }
      &.partner-12 {
        background-image: url('~@/assets/home/partnets-12.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-12a.png');
        }
      }
      &.partner-13 {
        background-image: url('~@/assets/home/partnets-13.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-13a.png');
        }
      }
      &.partner-14 {
        background-image: url('~@/assets/home/partnets-14.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-14a.png');
        }
      }
      &.partner-15 {
        background-image: url('~@/assets/home/partnets-15.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-15a.png');
        }
      }
      &.partner-16 {
        background-image: url('~@/assets/home/partnets-16.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-16a.png');
        }
      }
      &.partner-17 {
        background-image: url('~@/assets/home/partnets-17.png');
        &:hover {
          background-image: url('~@/assets/home/partnets-17a.png');
        }
      }
    }
  }
}
</style>

