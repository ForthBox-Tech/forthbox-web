<template>
  <div class="page-invite">
    <Nav2></Nav2>
    <main class="main">
      <div class="wrap">
        <img class="image" />
        <div>
          <div class="link">邀请链接：{{ link }}</div>
        </div>
        <Button class="btn-invite">下载邀请海报</Button>
      </div>
    </main>
  </div>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'Invite',
  components: {
    Nav2,
    Button,
  },
  data() {
    return {
      link: window.location.href,
    }
  },
  methods: {},
  created() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.page-invite {
  .main {
    position: relative;
    margin: 4rem auto;
    width: 50rem;
    height: 30rem;
    background: url('~@/assets/page-invite/invite-bg.png') center center / contain no-repeat;
    &::before,
    &::after {
      content: '';
      display: table;
      clear: both;
    }
    @media (max-width: 768.89px) {
      margin: 0;
      width: auto;
      min-height: 100vh;
      background-image: url('~@/assets/page-invite/invite-bg-m.png');
    }
  }
  .wrap {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 2rem;
    @media (max-width: 768.89px) {
      padding-bottom: 1rem;
    }
  }
  .image {
    display: block;
    margin: 0 auto 0;
    width: 5rem;
    height: 5rem;
    background-color: $color-placeholder;
  }
  .link {
    margin: 1.5rem 0;
    display: inline-block;
    padding: 0 0.5rem;
    line-height: 1.2rem;
    font-size: 0.7rem;
    color: $color-primary;
    background-color: #f6f6f6;
    @media (max-width: 768.89px) {
      margin: 0.7rem 0;
      background-color: rgba(#f6f6f6, 0.5);
    }
  }
  .btn-invite {
    @include btn-fill-color();
    padding: 0 2rem;
    line-height: 2rem;
  }
}
</style>

