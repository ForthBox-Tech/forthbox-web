<template>
  <div class="comp-social" v-if="iSocial.length">
    <a class="item" v-for="item in iSocial" :key="item.icon" :href="item.link" target="_blank">
      <img class="icon" :src="item.icon" />
    </a>
    <!-- <i class="line" v-if="iSocial.length"></i>
    <a class="item">
      <img class="icon" src="@/assets/comp-social/social-fav.png" />
    </a>
    <a class="item">
      <img class="icon" src="@/assets/comp-social/social-link.png" />
    </a> -->
  </div>
</template>

<script>
const SOCIAL = [
  {
    type: 'twitter',
    link: '',
    icon: require('@/assets/comp-social/social-twitter.png'),
  },
  {
    type: 'discord',
    link: '',
    icon: require('@/assets/comp-social/social-discord.png'),
  },
  {
    type: 'telegram',
    link: '',
    icon: require('@/assets/comp-social/social-telegram.png'),
  },
  {
    type: 'facebook',
    link: '',
    icon: require('@/assets/comp-social/social-facebook.png'),
  },
  {
    type: 'instagram',
    link: '',
    icon: require('@/assets/comp-social/social-instagram.png'),
  },
  {
    type: 'website',
    link: '',
    icon: require('@/assets/comp-social/social-website.png'),
  },
]

export default {
  name: 'Social',
  props: {
    social: Object,
  },
  data() {
    return {}
  },
  computed: {
    iSocial() {
      const data = this.social || {}

      return SOCIAL.map((item) => {
        item.link = data[`${item.type}`] || ''
        return item
      }).filter((item) => item && item.link)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-social {
  display: inline-flex;
  padding: 0 0.25rem;
  border: 0.05rem solid $color-border;
  border-radius: 0.4rem;
  background-color: $color-white;
  .item {
    margin: 0.7rem 0.5rem;
    width: 1.5rem;
    cursor: pointer;
    @media (max-width: 768.89px) {
      margin: 0.5rem 0.4rem;
      width: 1.1rem;
    }
    .icon {
      display: block;
      width: 100%;
    }
    &:hover {
      opacity: 0.9;
    }
  }
  .line {
    margin: 0.75rem 0.5rem;
    border-left: 0.05rem solid $color-border;
  }
}
</style>

