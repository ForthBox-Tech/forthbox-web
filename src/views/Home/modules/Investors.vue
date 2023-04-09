<template>
  <section class="home-section home-investors">
    <h2 class="title">Investors</h2>
    <ul class="list">
      <li class="item"><img class="image-1" src="@/assets/page-home/investors-1.png" /></li>
      <li class="item"><img class="image-2" src="@/assets/page-home/investors-2.png" /></li>
      <li class="item"><img class="image-3" src="@/assets/page-home/investors-3.png" /></li>
      <li class="item"><img class="image-4" src="@/assets/page-home/investors-4.png" /></li>
      <li class="item"><img class="image-5" src="@/assets/page-home/investors-5.png" /></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Investors',}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.home-investors {
  background: url('~@/assets/page-home/bg2.png') center center / 100% 100% no-repeat;

  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 1.5rem auto 2rem;
    max-width: 60rem;
    text-align: center;
    @media (max-width: 768.89px) {
      margin: 0.75rem auto 1rem;
    }
  }
  .item {
    margin: 2rem 0;
    width: 33.333%;
    @media (max-width: 768.89px) {
      margin: 1rem 0;
      width: 50%;
    }
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .image-1 {
    width: 47.5%;
  }
  .image-2 {
    width: 73%;
  }
  .image-3 {
    width: 42%;
  }
  .image-4 {
    width: 47.25%;
  }
  .image-5 {
    width: 27.25%;
  }
}
</style>

