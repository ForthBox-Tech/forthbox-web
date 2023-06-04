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
    padding: 0 1.6rem;
    margin-bottom: 4rem;
    @media (max-width: 768.89px) {
      padding: 0;
      margin-bottom: 2.4rem;
    }
    .title {
      margin-bottom: 1.15rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #fffefe;
      text-align: left;
      @media (max-width: 768.89px) {
        margin-bottom: 0.6rem;
        font-size: 0.75rem;
      }
      &::after {
        content: '';
        display: block;
        margin-top: -1rem;
        width: 20.85rem;
        height: 1.1rem;
        background: url('~@/assets/page-recruit/title-bg.png') center center no-repeat;
        background-size: 100%;
        @media (max-width: 768.89px) {
          width: 10.1rem;
          margin-top: -0.7rem;
        }
      }
    }
    .cotent {
      margin-bottom: 1rem;
      font-size: 0.9rem;
      line-height: 1.5rem;
      color: #d9daf9;
      text-align: left;
      @media (max-width: 768.89px) {
        line-height: 0.9rem;
        font-size: 0.7rem;
      }
      &::before {
        content: '';
        display: inline-block;
        margin-right: 0.25rem;
        width: 0.45rem;
        height: 0.45rem;
        vertical-align: 1px;
        background-image: linear-gradient(90deg, #c937f6, #1669ff);
        border-radius: 0.45rem;
        @media (max-width: 768.89px) {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 0.4rem;
        }
      }
    }
  }
  .join-us {
    display: flex;
    align-items: center;
    padding: 0 1.6rem;
    .split {
      flex: 1;
      height: 0.01rem;
      background-color: #607d83;
    }
    .text {
      margin: 0 2rem;
      font-size: 1.2rem;
      color: #afe0e5;
      @media (max-width: 768.89px) {
        font-size: 0.75rem;
      }
    }
  }
  .email-wrap {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.9rem;
    color: #afe0e5;
    @media (max-width: 768.89px) {
      font-size: 0.7rem;
    }
    .copy-wrap {
      position: relative;
      cursor: pointer;
      .copy-input {
        width: 6rem;
        margin: 0;
        padding: 0;
        text-align: center;
        font-style: italic;
        font-size: 0.9rem;
        color: #afe0e5;
        background: transparent;
        border: 0 none;
        outline: none;
        @media (max-width: 768.89px) {
          width: 4rem;
          font-size: 0.7rem;
        }
      }
      .copy-email {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>
