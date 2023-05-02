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

