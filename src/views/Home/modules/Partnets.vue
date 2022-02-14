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
