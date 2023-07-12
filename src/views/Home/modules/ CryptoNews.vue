<template>
  <section class="home-section home-news">
    <h2 class="title">Crypto news</h2>
    <ul class="list">
      <li class="item" v-for="item in news" :key="item">
        <div class="cover" :style="{ backgroundImage: `url(${item.image})` }"></div>
        <div class="info">
          <h3 class="topic">{{ item.title }}</h3>
          <p class="desc">{{ item.desc }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      news: [
        // {
        //   image: '',
        //   title: '',
        //   desc: '',
        // },
      ],
    }
  },
  methods: {
    async getNews() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/home/news/get_list`
      const res = await this.$axios.get(url)
      if (res.code != 200) {
        return
      }

      this.news = (res.data || [])
        .map((item) => ({
          image: item.ImageUrl || '',
          title: item.Title || '',
          desc: item.Description || '',
        }))
        .filter((item) => item.image && item.title && item.desc)
        .slice(0, 6)
    },
  },
  mounted() {
    this.getNews()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.home-news {
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin: 1.6rem auto 4rem;
    padding: 0 1.2rem;
    max-width: 65rem;
    text-align: left;
    @media (max-width: 768.89px) {
      margin: 0.8rem auto 1.2rem;
    }
    @media (max-width: 1024.89px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
      padding: 0 0.9rem;
    }
    @media (max-width: 540px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 0.7rem;
      padding: 0 0.7rem;
    }
  }
  .item {
    box-sizing: border-box;
    background-color: $color-white;
    border: 0.05rem solid $color-border;
    border-radius: 0.5rem;
    overflow: hidden;
    &:hover {
      box-shadow: 0 0.15rem 0.5rem 0.05rem rgba(12, 69, 126, 0.16);
      cursor: pointer;
    }
    .cover {
      position: relative;
      padding-top: 50%;
      background: $color-placeholder center center / cover no-repeat;
    }
    .info {
      padding: 0.9rem 1rem 1.1rem;
      @media (max-width: 768.89px) {
        padding: 0.6rem;
      }
    }
    .topic {
      @include ellipsis(1);
      margin-bottom: 0.4rem;
      line-height: 1.5;
      font-size: 1.3rem;
      font-size: 500;
      @media (max-width: 768.89px) {
        margin-bottom: 0.2rem;
        font-size: 1rem;
      }
    }
    .desc {
      @include ellipsis(4);
      font-size: 0.6rem;
      color: $color-secondary;
    }
  }
}
</style>
