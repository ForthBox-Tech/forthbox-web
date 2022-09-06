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

