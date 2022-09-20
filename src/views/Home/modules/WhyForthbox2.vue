<template>
  <section class="section why-forthbox-2 m-my-0">
    <main class="main m-px-1">
      <h3 class="title">
        <i class="left m-v-hide"></i>
        {{ $t('Home.NFT.NFTAssetAggregationStandards') }}
        <i class="right m-v-hide"></i>
      </h3>
      <div class="imgs">
        <img src="@/assets/home/why2-1.png" />
        <img class="img2" src="@/assets/home/why2-2.png" />
        <img class="img3" src="@/assets/home/why2-3.png" />
        <img class="img4" src="@/assets/home/why2-4.png" />
        <img class="img5" src="@/assets/home/why2-5.png" />
        <img class="img6" src="@/assets/home/why2-6.png" />
      </div>
      <div class="text-wrap">
        <img src="@/assets/home/why2-7.png" />
        <div class="text m-ml-0">
          {{ $t('Home.NFT.TheNFTInThePlatform') }}
        </div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: 'WhyForthbox2',}
</script>

<style lang="scss">
@import '../home.animate.scss';

.home {
  .why-forthbox-2 {
    margin: 5rem 0 7rem;
    overflow: hidden;
    .main {
      position: relative;
      padding: 0 4.1rem 3.5rem;
      background: url('~@/assets/home/why2-bg1.png') center center no-repeat,
        url('~@/assets/home/why2-bg2.png') center center no-repeat;
      background-size: 100% 100%, 35.067%;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        margin-top: -6.625rem;
        width: 6.65rem;
        height: 13.25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      &::before {
        background-image: url('~@/assets/home/why2-bg3.png');
        left: -7rem;
      }
      &::after {
        background-image: url('~@/assets/home/why2-bg4.png');
        right: -7rem;
      }
      .title {
        padding: 2rem 0;
        line-height: 1.2;
        font-size: 1.5rem;
        font-weight: normal;
        text-align: center;
        i {
          content: '';
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100%;
        }
        i.left {
          margin-right: 1rem;
          background-image: url('~@/assets/home/why2-title1.png');
        }
        i.right {
          margin-left: 1rem;
          background-image: url('~@/assets/home/why2-title2.png');
        }
      }
      .imgs {
        text-align: center;
        white-space: nowrap;
        overflow: auto;
        img {
          margin: 0 0.35rem;
