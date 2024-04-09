<template>
  <footer class="comp-footer">
    <main class="main">
      <section class="layout">
        <div class="col infos">
          <img class="logo" src="@/assets/common/logo.png" />
          <div class="support">
            <span class="label">{{ $t('Footer.Email') }}</span>
            <input class="input" id="email" type="text" value="support@forthbox.io" />
            <Button
              class="btn-copy"
              id="btnCopy"
              data-clipboard-target="#email"
              :disabled="btnDisabled.email"
              @click="onCopy('email')"
            >
              {{ btnText.email }}
            </Button>
          </div>
          <p class="text">
            {{ $t('Footer.TheContentInThisArticle') }}
          </p>
          <p class="text">
            <span>{{ $t('Footer.ReadMore1') }}</span>
            <a
              class="link"
              target="_blank"
              href="https://static.forthbox.io/document/Terms-of-Service.pdf"
            >
              {{ $t('Footer.ReadMore2') }}
            </a>
            <span>{{ $t('Footer.ReadMore3') }}</span>
          </p>
        </div>
        <div class="col more">
          <div class="links">
            <div class="part">
              <h2 class="title">{{ $t('Footer.ForthBox') }}</h2>
              <router-link class="link" to="/">{{ $t('Footer.Home') }}</router-link>
              <router-link class="link" to="/minting">{{ $t('Footer.HamMinting') }}</router-link>
              <router-link class="link" to="/game2">{{ $t('Footer.Games') }}</router-link>
              <!-- <router-link class="link" to="/socialfi">{{ $t('Footer.Social') }}</router-link> -->
              <router-link class="link" to="/market2">{{ $t('Footer.Market') }}</router-link>
              <router-link class="link" to="/faq">{{ $t('Footer.FAQ') }}</router-link>
              <router-link class="link" to="/recruit">{{ $t('Footer.JoinUs') }}</router-link>
            </div>
            <div class="part">
              <h2 class="title">{{ $t('Footer.Developers') }}</h2>
              <a class="link" @click="onShowContractDialog">{{ $t('Footer.Contract') }}</a>
              <a class="link" target="_blank" href="https://forthbox.gitbook.io/whitepaper/">
                {{ $t('Footer.Whitepaper') }}
              </a>
              <a class="link" target="_blank" href="https://www.certik.com/projects/forthbox">
                {{ $t('Footer.SecurityAudits') }}
              </a>
              <router-link class="link" to="/#roadmap">{{ $t('Footer.Roadmap') }}</router-link>
              <a class="link" target="_blank" href="https://github.com/Forthbox/">
                {{ $t('Footer.GitHub') }}
              </a>
            </div>
          </div>
          <div class="social">
            <h2 class="title">{{ $t('Footer.Community') }}</h2>
            <template v-for="social in socials" :key="social">
              <a v-if="social.text == 'Footer.Email'" class="item" @click="onShowEmailDialog">
                <img class="icon" :src="social.icon" />
              </a>
              <a v-else class="item" target="_blank" :href="social.link">
                <img class="icon" :src="social.icon" />
              </a>
            </template>
          </div>
        </div>
      </section>
      <aside class="aside">
        <p class="copyright">{{ $t('Footer.Copyright') }}</p>
      </aside>
    </main>
  </footer>
  <Dialog class="dialog-email dialog-footer" :visible="emailDialog.visible">
    <main class="footer-main">
      <a class="close" @click="onHideEmailDialog"></a>
      <div class="title">{{ $t('Footer.Email') }}</div>
      <div class="line">
        <input class="input" id="emailInput1" type="text" value="support@forthbox.io" />
        <Button
          class="btn-copy"
          id="emailCopy1"
          data-clipboard-target="#emailInput1"
          :disabled="btnDisabled.email1"
          @click="onCopy('email1')"
        >
          {{ btnText.email1 }}
        </Button>
      </div>
      <div class="line">
        <input class="input" id="emailInput2" type="text" value="business@forthbox.io" />
        <Button
          class="btn-copy"
          id="emailCopy2"
          data-clipboard-target="#emailInput2"
          :disabled="btnDisabled.email2"
          @click="onCopy('email2')"
        >
          {{ btnText.email2 }}
        </Button>
      </div>
      <div class="line">
        <input class="input" id="emailInput3" type="text" value="hr@forthbox.io" />
        <Button
          class="btn-copy"
          id="emailCopy3"
          data-clipboard-target="#emailInput3"
          :disabled="btnDisabled.email3"
          @click="onCopy('email3')"
        >
          {{ btnText.email3 }}
        </Button>
      </div>
    </main>
  </Dialog>
  <Dialog class="dialog-contract dialog-footer" :visible="contractDialog.visible">
    <main class="footer-main">
      <a class="close" @click="onHideContractDialog"></a>
      <div class="title">{{ $t('Footer.Contract') }}</div>
      <div class="list">
        <table class="table">
          <tr>
            <th>Smart contract</th>
            <th>Address</th>
          </tr>
          <tr v-for="item in contractDialog.list" :key="item.address">
            <td>{{ item.name }}</td>
            <td>
              <a target="_blank" :href="item.url">{{ item.address }}</a>
            </td>
          </tr>
        </table>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Clipboard from 'clipboard'
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import { CONTRACTS, SOCIALS } from '@/models/footer.model'

const socials = [
  {
    icon: require('@/assets/comp-footer/medium.png'),
    link: SOCIALS.Medium,
    text: 'Footer.Medium',
  },
  {
    icon: require('@/assets/comp-footer/twitter.png'),
    link: SOCIALS.Twitter,
    text: 'Footer.Twitter',
  },
  {
    icon: require('@/assets/comp-footer/youtube.png'),
    link: SOCIALS.YouTube,
    text: 'Footer.YouTube',
  },
  {
    icon: require('@/assets/comp-footer/telegram.png'),
    link: SOCIALS.Telegram,
    text: 'Footer.Telegram',
  },
  {
    icon: require('@/assets/comp-footer/facebook.png'),
    link: SOCIALS.Facebook,
    text: 'Footer.FaceBook',
  },
  {
    icon: require('@/assets/comp-footer/instagram.png'),
    link: SOCIALS.Instagram,
    text: 'Footer.Instagram',
  },
  {
    icon: require('@/assets/comp-footer/discord.png'),
    link: SOCIALS.Discord,
    text: 'Footer.Discord',
  },
  {
    icon: require('@/assets/comp-footer/email.png'),
    link: '',
    text: 'Footer.Email',
  },
]

export default {
  name: 'Footer',
  components: {
    Dialog,
    Button,
  },
  data() {
    return {
      btnText: {
        email: this.$t('Footer.Copy'),
        email1: this.$t('Footer.Copy'),
        email2: this.$t('Footer.Copy'),
        email3: this.$t('Footer.Copy'),
      },
      btnDisabled: {
        email: false,
        email1: false,
        email2: false,
        email3: false,
      },

      emailDialog: {
        visible: false,
      },
      contractDialog: {
        visible: false,
        list: CONTRACTS,
      },

      socials,
    }
  },
  methods: {
    onCopy(id) {
      for (let key in this.btnText) {
        if (key === id) {
          this.btnText[id] = this.$t('Footer.Copied')
          this.btnDisabled[id] = true
        } else {
          this.btnText[key] = this.$t('Footer.Copy')
          this.btnDisabled[key] = false
        }
      }
    },
    onShowEmailDialog() {
      this.emailDialog.visible = true
    },
    onHideEmailDialog() {
      this.onCopy()
      this.emailDialog.visible = false
    },

    onShowContractDialog() {
      this.contractDialog.visible = true
    },
    onHideContractDialog() {
      this.contractDialog.visible = false
    },
  },
  created() {
    new Clipboard('#btnCopy')
    new Clipboard('#emailCopy1')
    new Clipboard('#emailCopy2')
    new Clipboard('#emailCopy3')
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-footer {
  line-height: 1.5;
  text-align: left;
  font-size: 0.8rem;
  color: $color-secondary;
  background-color: #f8f8ff;
  @media (max-width: 768.89px) {
    font-size: 0.6rem;
  }
  .main {
    margin: 0 auto;
    max-width: 72rem;
    padding: 2.8rem 2rem 0;
    @media (max-width: 768.89px) {
      padding: 1.6rem 1rem 0;
    }
  }
  .layout {
    display: flex;
    @media (max-width: 768.89px) {
      display: block;
    }
    .col {
      flex: 1;
    }
  }
  .infos {
    .logo {
      display: block;
      width: 9.5rem;
      @media (max-width: 768.89px) {
        margin: 0 auto;
      }
    }
    .support {
      margin: 2rem 0 4rem;
      max-width: 22rem;
      display: flex;
      align-items: center;
      background-color: rgba($color-purple, 0.1);
      border-radius: 2rem;
      overflow: hidden;
      @media (max-width: 768.89px) {
        margin: 1.2rem 0 1.8rem;
        max-width: none;
        font-size: 1.1em;
      }
      .label {
        padding: 0 0.8em 0 1.6em;
        color: $color-primary;
      }
      .input {
        flex: 1;
        width: 3rem;
        padding: 0 0.8em;
        line-height: 2.5;
        font-size: inherit;
        color: inherit;
        background: transparent;
        border: 0 none;
        outline: none;
      }
      .btn-copy {
        @include btn-fill-pure($color-purple);
        box-sizing: border-box;
        width: 5rem;
        line-height: 2rem;
        border-radius: 2rem;
        @media (max-width: 768.89px) {
          width: 4.2rem;
          border-radius: 2rem;
          font-size: 1.2em;
        }
      }
    }
    .text {
      max-width: 25rem;
      margin: 1em 0;
      font-size: 1.125em;
      color: $color-primary;
      @media (max-width: 768.89px) {
        max-width: none;
      }
      .link {
        margin: 0 0 0 0.3em;
        color: $color-blue;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .more {
    @media (max-width: 768.89px) {
      margin-top: 1rem;
    }
    .links {
      display: flex;
      justify-content: flex-end;
      @media (max-width: 768.89px) {
        justify-content: space-between;
      }
      .part {
        margin-left: 4rem;
        line-height: 1.7;
        font-weight: 500;
        @media (max-width: 768.89px) {
          margin-left: 0;
        }
      }
      .title {
        margin-bottom: 0.2em;
        font-size: 1.25em;
        opacity: 0.85;
      }
      .link {
        display: block;
        color: $color-blue;
        white-space: nowrap;
        cursor: pointer;
        opacity: 0.65;
        &::before {
          content: '';
          margin-right: 0.5em;
          display: inline-block;
          width: 0.3em;
          height: 0.3em;
          border-top: 0.05rem solid $color-blue;
          border-right: 0.05rem solid $color-blue;
          transform: rotate(45deg);
          vertical-align: 0.15em;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
    .social {
      margin-top: 2rem;
      text-align: right;
      @media (max-width: 768.89px) {
        margin-top: 1rem;
        text-align: left;
      }
      .title {
        margin-bottom: 1.12em;
        font-size: 0.9em;
        opacity: 0.7;
      }
      .item {
        margin-left: 1rem;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        @media (max-width: 768.89px) {
          margin: 0 0.5rem 0 0;
        }
      }
      .icon {
        display: block;
        width: 1.5rem;
        @media (max-width: 768.89px) {
          width: 1.25rem;
        }
      }
    }
  }
  .aside {
    margin-top: 1rem;
    border-top: 0.05rem solid $color-border;
    padding: 1.45em 0 2em;
    display: block;
    text-align: center;
    font-size: 0.7rem;
    @media (max-width: 768.89px) {
      font-size: 0.6rem;
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  .footer-main {
    padding: 1.2rem 2.2rem 1.8rem;
    background-color: $color-white;
    font-size: 0.8rem;
    color: $color-primary;
    border: 0.05rem solid $color-border;
    border-radius: 0.8rem;
    @media (max-width: 768.89px) {
      padding: 0.7rem 1rem 1.2rem;
      border-radius: 0.5rem;
      font-size: 0.65rem;
    }
  }
  .close {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    background: url('~@/assets/common/close.png') center center / 60% no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      top: 0.4rem;
      right: 0.4rem;
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .title {
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.5em;
    @media (max-width: 768.89px) {
      margin: 0 0 0.8rem;
    }
  }
}
.dialog-email {
  .line {
    margin-bottom: 0.65rem;
    @media (max-width: 768.89px) {
      margin-bottom: 0.5rem;
    }
    .input {
      font-size: 1.2em;
      background: transparent;
      border: 0 none;
      outline: none;
    }
    .btn-copy {
      @include btn-fill-pure($color-purple);
      padding: 0;
      margin-left: 5rem;
      width: 5.15rem;
      line-height: 1.6rem;
      font-size: inherit;
      border-radius: 1.6rem;
      @media (max-width: 768.89px) {
        width: 3rem;
        margin-left: 2rem;
        line-height: 1.2rem;
        border-radius: 1.6rem;
      }
    }
  }
}
.dialog-contract {
  .list {
    margin: -1.2rem -2rem 0;
    padding: 0 2rem;
    max-height: 18.5rem;
    overflow-y: auto;
    @media (max-width: 768.89px) {
      margin: -0.6rem -1rem 0;
      padding: 0 1rem;
    }
  }
  .table {
    line-height: 1.4;
    text-align: left;
    th {
      padding: 0.2rem 0.3rem;
    }
    td {
      padding: 0.2rem 0.3rem;
      @media (max-width: 768.89px) {
        max-width: 6.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    a {
      color: $color-blue;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

