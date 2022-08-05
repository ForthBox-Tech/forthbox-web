<template>
  <div class="fb-coming-soon">
    <img class="img1" src="@/assets/comp-page/coming-soon-1.png" />
    <img class="img2" src="@/assets/comp-page/coming-soon-2.png" />
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',}
</script>

<style lang="scss">
.fb-coming-soon {
  img {
    display: block;
    margin: 2rem auto;
  }
  .img1 {
    margin-top: 6rem;
  }
  .img2 {
    margin-bottom: 3rem;
  }
  @media (max-width: 768.89px) {
    .img1 {
      width: 72vw;
    }
    .img2 {
      width: 10vw;
    }
  }
}
</style>

