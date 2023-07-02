<template>
  <section class="section forthbox-society m-py-0">
    <header class="header">
      <h1 class="title">{{ $t('Home.SocialSystem.SocialSystem') }}</h1>
      <div class="title-content">{{ $t('Home.SocialSystem.SocialSystem') }}</div>
    </header>
    <main class="main m-mx-1">
      <div class="text">
        {{ $t('Home.SocialSystem.ForthBoxIsCommitted') }}
      </div>
      <div class="banner">
        <img src="https://static.forthbox.io/image/gif/card2.gif" />
      </div>
      <img class="img-bg" src="@/assets/home/forthbox-society-bg1.png" />
    </main>
  </section>
</template>

<script>
export default {
  name: 'SocialFi',}
</script>

<style lang="scss">
@import '../home.animate.scss';

.home {
  .forthbox-society {
    position: relative;
    z-index: 1;
    padding: 4.5rem 0 4rem;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: #121536;
      clip-path: polygon(0 0, 0 88%, 50% 100%, 100% 88%, 100% 0, 50% 12%);
    }
    .text {
      padding: 1.5rem 0 2rem;
    }
    .banner {
      margin: 0 1rem 2.5rem;
      img {
        width: 100%;
      }
