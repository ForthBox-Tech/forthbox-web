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
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.comp-project {
  display: flex;
  align-items: center;
  border: 0.05rem solid $color-border;
  border-radius: 0.5rem;
  overflow: hidden;
  color: $color-primary;
  text-align: left;
  @media (max-width: 768.89px) {
    display: block;
    border: 0 none;
    border-radius: 0;
  }
  .preview {
    width: 56%;
    min-width: 37.6rem;
    @media (max-width: 768.89px) {
      width: 100%;
      min-width: auto;
    }
  }
  .info {
    flex: 1;
    margin: 0 auto;
    max-width: 25rem;
    padding: 1.5rem 2.5%;
    @media (max-width: 768.89px) {
      max-width: none;
      padding: 1rem 0;
    }
  }
  .profile {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .basic {
      flex: 1;
      width: 5rem;
      &.align-center {
        text-align: center;
        .cover {
          margin: 0 auto;
        }
      }
    }
    .cover {
      display: block;
      max-width: 10rem;
      height: 4.5rem;
    }
    .text {
      @include ellipsis(1);
      @include text-with-cert(0.2rem, 0.7rem, 0.7rem);
      line-height: 1.5;
      font-size: inherit;
      font-weight: inherit;
      vertical-align: middle;
    }
    .name {
      margin: 0.5rem 0 0.1rem 0;
      font-size: 1.2rem;
      font-weight: 500;
      @media (max-width: 768.89px) {
        margin: 0.2rem 0 0.1rem 0;
        font-size: 1rem;
      }
    }
    .provider {
      font-size: 0.8rem;
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
      }
      .text {
        max-width: 90%;
      }
    }
    .more {
    }
    .score {
      display: flex;
      padding: 0 0.2rem;
      border-bottom: 0.05rem solid $color-blue;
      .num {
        font-size: 2.5rem;
        font-weight: 500;
        color: $color-blue;
      }
      .aside {
        flex: 1;
        margin-left: 0.45rem;
        text-align: right;
      }
      .rater {
        margin-top: 0.3rem;
        text-align: right;
        font-size: 0.8rem;
        color: $color-black;
        @media (max-width: 768.89px) {
          font-size: 0.7rem;
        }
      }
    }
    .player {
      display: flex;
      line-height: 1.5;
      font-size: 1.5rem;
      @media (max-width: 768.89px) {
        font-size: 1rem;
      }
      .col {
        flex: 1;
        padding: 0.5rem 0.2rem 0 0.2rem;
        text-align: center;
      }
      .label {
        white-space: nowrap;
        font-size: 0.7rem;
      }
      .value {
        white-space: nowrap;
      }
    }
  }
  .btns-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 12%;
    padding: 12% 0 8%;
    border-top: 0.05rem solid $color-border;
    @media (max-width: 768.89px) {
      margin-top: 4.5%;
      padding: 4.5% 0;
    }
    .btn-pure {
      @include btn-fill-pure();
      box-sizing: border-box;
      padding: 0.8rem 0.3rem;
      width: 48%;
      line-height: 1rem;
      @media (max-width: 768.89px) {
        padding: 0.65rem 0.3rem;
        width: 48.5%;
      }
      &.color-gray {
        background-color: $color-gray;
      }
      &.width-full {
        width: 100%;
      }
    }
    .btn-color {
      @include btn-fill-color();
      margin-top: 1rem;
      box-sizing: border-box;
      width: 100%;
      line-height: 2.7rem;
      @media (max-width: 768.89px) {
        margin-top: 0.5rem;
        line-height: 2.5rem;
      }
    }
    .icon {
      display: inline-block;
      margin-right: 0.5rem;
      width: 0.9rem;
      vertical-align: -0.1rem;
      @media (max-width: 768.89px) {
        margin-right: 0.3rem;
      }
    }
  }
  .social-wrap {
    text-align: center;
  }
}
</style>

