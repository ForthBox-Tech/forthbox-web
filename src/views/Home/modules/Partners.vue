<template>
  <section class="home-section home-partners">
    <h2 class="title">Partners</h2>
    <ul class="list">
      <li class="item" v-for="(image, index) in partners" :key="image">
        <img :class="[`image-${index + 1}`]" :src="image" />
      </li>
    </ul>
  </section>
</template>

<script>
const PARTNERS = [
  require('@/assets/page-home/partners-1.png'),
  require('@/assets/page-home/partners-2.png'),
  require('@/assets/page-home/partners-3.png'),
  require('@/assets/page-home/partners-4.png'),
  require('@/assets/page-home/partners-5.png'),
  require('@/assets/page-home/partners-6.png'),
  require('@/assets/page-home/partners-7.png'),
  require('@/assets/page-home/partners-8.png'),
  require('@/assets/page-home/partners-9.png'),
  require('@/assets/page-home/partners-10.png'),
  require('@/assets/page-home/partners-11.png'),
  require('@/assets/page-home/partners-12.png'),
  require('@/assets/page-home/partners-13.png'),
  require('@/assets/page-home/partners-14.png'),
  require('@/assets/page-home/partners-15.png'),
  require('@/assets/page-home/partners-16.png'),
  require('@/assets/page-home/partners-17.png'),
  require('@/assets/page-home/partners-18.png'),
  require('@/assets/page-home/partners-19.png'),
  require('@/assets/page-home/partners-20.png'),
]

export default {
  name: 'Partners',
  data() {
    return {
      partners: PARTNERS,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.home-partners {
  color: $color-white;
  background-image: linear-gradient(90deg, #03a9ff 0%, #df01ff 100%);

  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 1.2rem auto 2rem;
    max-width: 72rem;
    text-align: center;
    @media (max-width: 768.89px) {
      margin: 0.4rem auto 1rem;
    }
  }
  .item {
    margin: 1.2rem 0;
    width: 25%;
    @media (max-width: 768.89px) {
      margin: 0.7rem 0;
      width: 50%;
    }
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .image-1 {
    width: 74.1666%;
  }
  .image-2 {
    width: 57.222%;
  }
  .image-3 {
    width: 62.777%;
  }
  .image-4 {
    width: 67.222%;
  }
  .image-5 {
    width: 30.833%;
  }
  .image-6 {
    width: 63.888%;
  }
  .image-7 {
    width: 51.805%;
  }
  .image-8 {
    width: 27.777%;
  }
  .image-9 {
    width: 16.388%;
  }
  .image-10 {
    width: 65%;
  }
  .image-11 {
    width: 57.777%;
  }
  .image-12 {
    width: 49.583%;
  }
  .image-13 {
    width: 45.555%;
  }
  .image-14 {
    width: 63.75%;
  }
  .image-15 {
    width: 61.388%;
  }
  .image-16 {
    width: 24.583%;
  }
  .image-17 {
    width: 49.722%;
  }
  .image-18 {
    width: 55.833%;
  }
  .image-19 {
    width: 64.722%;
  }
  .image-20 {
    width: 69.444%;
  }
}
</style>

