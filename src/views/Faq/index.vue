<template>
  <Nav2></Nav2>
  <div class="page-faq">
    <div class="main">
      <div class="top-wrap">
        <img src="@/assets/page-faq/top.png" />
        <div class="text-wrap">
          <div>{{ $t('FAQ.ForthboxAnswerCenter') }}</div>
          <div class="text-small">{{ $t('FAQ.NeedHelp') }}</div>
        </div>
      </div>
      <div class="content-wrap">
        <div class="title title-basics">{{ $t('FAQ.General') }}</div>
        <Content>
          <template v-slot:question>
            <div>{{ $t('FAQ.WhatForthBox') }}</div>
          </template>
          <template v-slot:answer>
            <div>{{ $t('FAQ.WhatForthBoxAnswer1') }}</div>
          </template>
        </Content>
        <Content>
          <template v-slot:question>
            <div>{{ $t('FAQ.DevelopmentTeam') }}</div>
          </template>
          <template v-slot:answer>
            <div>{{ $t('FAQ.DevelopmentTeamAnswer') }}</div>
          </template>
        </Content>
        <Content>
          <template v-slot:question>
            <div>{{ $t('FAQ.IsForthBoxAGame') }}</div>
          </template>
          <template v-slot:answer>
            <div>{{ $t('FAQ.IsForthBoxAGameAnswer') }}</div>
          </template>
        </Content>
        <Content>
          <template v-slot:question>
            <div>{{ $t('FAQ.IsForthBoxMetaverse') }}</div>
          </template>
          <template v-slot:answer>
            <div>{{ $t('FAQ.IsForthBoxMetaverseAnswer1') }}</div>
          </template>
        </Content>
        <Content>
          <template v-slot:question>
            <div>{{ $t('FAQ.WhatIsMetaverse') }}</div>
          </template>
          <template v-slot:answer>
            <div>{{ $t('FAQ.WhatIsMetaverseAnswer') }}</div>
          </template>
        </Content>
      </div>
    </div>
    <p class="bottom-content">
      {{ $t('FAQ.SendAnEmailToSupport1') }}
      <span class="copy-wrap">
        <input class="copy-input" id="emailInput" type="text" value="support@forthbox.io" />
        <span id="copy-email" class="copy-email" data-clipboard-target="#emailInput"></span>
      </span>
      {{ $t('FAQ.SendAnEmailToSupport3') }}
    </p>
  </div>
  <Footer></Footer>
</template>

<script>
import Nav2 from '@/modules/Nav2.vue'
import Footer from '@/modules/Footer.vue'
import Content from './Content.vue'
import Clipboard from 'clipboard'

export default {
  name: 'Faq',
  components: {
    Nav2,
    Footer,
    Content,
  },
  created() {
    new Clipboard('#copy-email')
  },
}
</script>

<style lang="scss">
.page-faq {
  position: relative;
  padding: 4.7rem;
  background-color: #0c0d27;
  @media (max-width: 768.89px) {
    padding: 1.25rem 0.75rem;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 17.4rem;
    right: 4.35rem;
    width: 12.4rem;
    height: 20.9rem;
    background: url('~@/assets/page-faq/bg-a.png') no-repeat;
    background-size: 100%;
    @media (max-width: 768.89px) {
      display: none;
    }
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 4.55rem;
    bottom: 4.35rem;
    width: 12.3rem;
    height: 20.5rem;
    background: url('~@/assets/page-faq/bg-q.png') no-repeat;
    background-size: 100%;
    @media (max-width: 768.89px) {
      display: none;
    }
  }
  .main {
    position: relative;
    margin: 3.4rem auto 0;
    width: 52.85rem;
    @media (max-width: 768.89px) {
      width: 100%;
    }
    .top-wrap {
      img {
        width: 24.3rem;
        @media (max-width: 768.89px) {
          width: 11rem;
          height: 3.8rem;
        }
      }
      .text-wrap {
        margin-top: -3rem;
        font-size: 2.25rem;
        color: #fff;
        @media (max-width: 768.89px) {
          margin: -1rem 0 1.1rem;
          font-size: 1rem;
        }
        .text-small {
          font-size: 0.9rem;
          color: #c6c7e3;
          @media (max-width: 768.89px) {
            font-size: 0.6rem;
          }
        }
      }
    }
    .content-wrap {
      margin: 2.2rem 2.2rem 0;
      padding: 2.85rem 2.65rem;
      text-align: left;
      color: #fff;
      border-radius: 0.5rem;
      background: rgba(25, 26, 52, 0.5) url('~@/assets/minting/main-bg.png') right bottom no-repeat;
      background-size: 10.3rem 11.5rem;
      @media (max-width: 768.89px) {
        margin: 0 0 0.75rem 0;
        padding: 1rem 0.2rem 1.3rem;
        border-radius: 0.25rem;
        background-size: 4rem 3.8rem;
      }
      .title {
        margin-bottom: 1.3rem;
        font-size: 0.9rem;
        color: #ab48ff;
        @media (max-width: 768.89px) {
          margin-bottom: 1rem;
          font-size: 0.7rem;
        }
        &:before {
          content: '';
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.35rem;
          vertical-align: top;
          background-size: 100%;
          @media (max-width: 768.89px) {
            width: 0.7rem;
            height: 0.7rem;
          }
        }
      }
      .title-basics {
        color: #ab48ff;
        &:before {
          background-image: url('~@/assets/page-faq/title-basic.png');
        }
      }
      .title-connection {
        color: #e9674b;
        &:before {
          background-image: url('~@/assets/page-faq/title-connection.png');
        }
      }
      .title-account {
        color: #c8f4a8;
        &:before {
          background-image: url('~@/assets/page-faq/title-account.png');
        }
      }
    }
  }
  .bottom-content {
    padding-top: 1.1rem;
    text-align: center;
    font-size: 0.9rem;
    color: #c6c7e3;
    @media (max-width: 768.89px) {
      font-size: 0.6rem;
    }
    .copy-wrap {
      position: relative;
      cursor: pointer;
      .copy-input {
        width: 8.5rem;
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 0.9rem;
        font-style: italic;
        color: #c6c7e3;
        background: transparent;
        border: 0 none;
        outline: none;
        @media (max-width: 768.89px) {
          width: 5.5rem;
          font-size: 0.6rem;
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
