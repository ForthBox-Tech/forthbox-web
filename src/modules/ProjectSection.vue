<template>
  <section class="comp-project main-wrap2">
    <Preview class="preview" :list="banners"></Preview>
    <div :class="['info', !project.IsGame ? 'pure-project' : '']">
      <div class="profile">
        <div :class="['basic', !project.IsGame ? 'align-center' : '']">
          <img class="cover" :src="project.LogoUrl" />
          <div class="name">
            <span :class="['text', false ? 'cert' : '']">{{ project.Name }}</span>
          </div>
          <div class="provider" v-if="project.Provider">
            By <span :class="['text', false ? 'cert' : '']">{{ project.Provider }}</span>
          </div>
        </div>
        <div class="more" v-if="project.IsGame">
          <div class="score">
            <div class="num">{{ parseFloat(project.CommentScore).toFixed(1) || '5.0' }}</div>
            <div class="aside">
              <Stars class="stars" :score="project.CommentScore || 5"></Stars>
              <div class="rater">
                {{ project.CommentUserCount || 0 }} {{ $t('Game2.XxxComments') }}
              </div>
            </div>
          </div>
          <div class="player">
            <div class="col">
              <div class="label">{{ $t('Market2.ActivePlayers') }}</div>
              <div class="value">{{ project.PlayerCount || 0 }}</div>
            </div>
            <div class="col">
              <div class="label">{{ $t('Game2.OnlinePlayers') }}</div>
              <div class="value">{{ project.OnlineUserCount || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btns-wrap">
        <Button
          :class="[
            'btn-pure',
            project.IsFavorite ? 'color-gray' : '',
            !project.IsGame ? 'width-full' : '',
          ]"
          loader
          :handler="onFav"
        >
          <img class="icon" src="@/assets/page-market2/page-marketplace/icon-fav.png" />
          <span>{{
            project.IsFavorite ? $t('Game2.AddedToFavorite') : $t('Game2.AddToFavorite')
          }}</span>
        </Button>
        <Button v-if="project.IsGame" :class="['btn-pure']" :handler="onComment">
          <img class="icon" src="@/assets/page-market2/page-marketplace/icon-comment.png" />
          <span>{{ $t('Game2.CommentToEarn') }}</span>
        </Button>
        <Button
          v-if="project.IsGame"
          class="btn-color"
          :disabled="!project.PlayUrl"
          :handler="onPlay"
        >
          {{ $t('Games.PlayNow') }}
        </Button>
      </div>
      <div class="social-wrap">
        <Social :social="social"></Social>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '@/components/Button.vue'
import Preview from '@/modules/Preview.vue'
import Social from '@/modules/Social.vue'
import Stars from '@/modules/Stars.vue'
import { favProject, unfavProject } from '@/models/market2.model'
import initTriggerMixin from '@/mixins/init-trigger'

export default {
  name: 'ProjectSection',
  components: {
    Button,
    Preview,
    Social,
    Stars,
  },
  props: {
    projectId: String,
  },
  data() {
    return {
      banners: [],
      project: {},
      social: {},
    }
  },
  mixins: [initTriggerMixin()],
  methods: {
    async onFav() {
      const project = this.project || {}
      if (project.IsFavorite) {
        const res = await unfavProject(this.projectId)
        if (res.code != 200) {
          this.$modal.toast(res.msg)
          return
        }
        project.IsFavorite = false
        project.FavCount -= 1
      } else {
        const res = await favProject(this.projectId)
        if (res.code != 200) {
          this.$modal.toast(res.msg)
          return
        }
        project.IsFavorite = true
        project.FavCount += 1
      }
    },
    onComment() {
      this.$router.push({
        path: '/game2/project',
        query: {
          id: this.projectId,
          code: this.project.Symbol,
          tab: 'comment',
        },
      })
    },
    onPlay() {
      if (this.project.PlayUrl) {
        window.open(this.project.PlayUrl)
      }
    },

    async _getDetail() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/collections/detail`
      const params = {
        id: this.projectId,
      }

      const res = await this.$axios.get(url, { params })
      if (!res || res.code != 200) {
        console.warn(res.msg)
        return
      }

      const data = res.data || {}

      const banners = []
      const media = {}
      ;(data.banners || []).forEach((item) => {
        if (item.MediaType == 'image') {
          banners.push({
            image: item.MediaUrl || '',
            video: '',
          })
        } else if (item.MediaType == 'videocover') {
          media.image = item.MediaUrl || ''
        } else if (item.MediaType == 'video') {
          media.video = item.MediaUrl || ''
        }
      })
      if (media.video && media.image) {
        banners.unshift(media)
      }
      this.banners = banners

      const project = data.collection || {}
      this.project = project
      this.social = {
        website: project.WebsiteUrl || '',
        twitter: project.TwitterUrl || '',
        discord: project.DiscordUrl || '',
        telegram: project.TelegramUrl || '',
        instagram: project.InstagramUrl || '',
      }

      this.$emit('init', project)
    },
    async init() {
      await this._getDetail()
    },
  },
}
