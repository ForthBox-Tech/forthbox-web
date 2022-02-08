<template>
  <Nav2></Nav2>
  <main class="page-recruit">
    <div class="main-wrap">
      <div class="title-wrap">
        <img class="m-v-hide" src="@/assets/page-recruit/top-pc.png" />
        <img class="pc-v-hide" src="@/assets/page-recruit/top-m.png" />
      </div>
      <div class="inner-wrap">
        <div class="question-wrap">
          <img src="@/assets/page-recruit/ready.png" />
        </div>
        <div class="position-wrap">
          <div class="title">{{ $t('Recruit.ProductManager') }}</div>
          <div class="cotent">{{ $t('Recruit.ProductManager1') }}</div>
          <div class="cotent">{{ $t('Recruit.ProductManager2') }}</div>
          <div class="cotent">{{ $t('Recruit.ProductManager3') }}</div>
          <div class="cotent">{{ $t('Recruit.ProductManager4') }}</div>
          <div class="cotent">{{ $t('Recruit.ProductManager5') }}</div>
          <div class="cotent">{{ $t('Recruit.ProductManager6') }}</div>
        </div>
        <div class="position-wrap">
          <div class="title">{{ $t('Recruit.UIDesigner') }}</div>
          <div class="cotent">{{ $t('Recruit.UIDesigner1') }}</div>
          <div class="cotent">{{ $t('Recruit.UIDesigner2') }}</div>
          <div class="cotent">{{ $t('Recruit.UIDesigner3') }}</div>
        </div>
        <section class="join-us">
          <div class="split"></div>
          <div class="text">{{ $t('Recruit.JoinUs') }}</div>
          <div class="split"></div>
        </section>
        <section class="email-wrap">
          {{ $t('Recruit.SendYourResumeToHr1') }}
          <span class="copy-wrap">
            <input class="copy-input" id="emailInput" type="text" value="hr@forthbox.io" />
            <span id="copy-email" class="copy-email" data-clipboard-target="#emailInput"></span>
          </span>
          {{ $t('Recruit.SendYourResumeToHr3') }}
        </section>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'
import Footer from '@/modules/Footer.vue'
import Clipboard from 'clipboard'

export default {
  name: 'Faq',
  components: {
    Nav2,
    Footer,
  },
  created() {
    new Clipboard('#copy-email')
  },
}
</script>

<style lang="scss">
.page-recruit {
  padding: 3.6rem 0 3.6rem;
  background-color: #0c0b2a;
  @media (max-width: 768.89px) {
    padding: 1.2rem 0 1rem;
  }
  .main-wrap {
    width: 50rem;
    margin: 0 auto;
    padding: 2rem 6rem 4.5rem;
    background-color: #191a34;
    border-radius: 1.6rem;
    @media (max-width: 768.89px) {
      width: 100%;
      padding: 0.5rem 0.75rem;
      background-color: #0c0d27;
      border-radius: 0;
      box-sizing: border-box;
    }
  }
  .title-wrap {
    img {
      width: 100%;
      margin: 0 auto 4.6rem;
      @media (max-width: 768.89px) {
        width: 16.4rem;
        height: 10.2rem;
        margin-bottom: 1rem;
      }
    }
  }
  .inner-wrap {
    @media (max-width: 768.89px) {
      padding: 1rem 0.75rem;
      background-color: #191a34;
      border-radius: 0.25rem;
    }
  }
  .question-wrap {
    img {
      width: 13.35rem;
      margin: 0 auto 2.4rem;
      @media (max-width: 768.89px) {
        width: 8rem;
        margin-bottom: 1.1rem;
      }
    }
  }
  .position-wrap {
