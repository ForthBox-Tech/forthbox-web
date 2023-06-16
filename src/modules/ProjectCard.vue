<template>
  <div class="project-card">
    <div class="header">
      <div class="name">
        <div class="image" :style="{ backgroundImage: `url('${project.LogoUrl}')` }"></div>
        <span class="text">{{ project.Name }}</span>
      </div>
      <img v-if="project.VerifyStatus" class="cert" src="@/assets/common/icon-cert.png" />
    </div>
    <div class="main">
      <div
        :class="['image', false ? 'new' : '']"
        :style="{ backgroundImage: `url('${project.CoverUrl}')` }"
      ></div>
      <div class="info">
        <div class="score">
          <template v-if="project.IsGame">
            <Stars class="stars" :score="project.CommentScore"></Stars>
            <span class="text">{{ parseFloat(project.CommentScore).toFixed(1) }}</span>
          </template>
          <div class="chain">
            <img class="icon" :src="getChainLogo(project.Chain)" />
          </div>
        </div>
        <div class="user-info">
          <div class="online" v-if="project.IsGame">
            <span class="label">{{ $t('Market2.ActivePlayers') }}:</span>
            <span class="num">{{ project.PlayerCount }}</span>
          </div>
          <div class="like" @click.stop="onFav">
            <i :class="['icon', isFav ? 'self' : '']"></i>
            <span class="count">{{ favCount }}</span>
          </div>
        </div>
      </div>

      <div class="explain">
        <p class="text">
          {{ project.Brief }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from '@/modules/Stars.vue'
import { favProject, unfavProject } from '@/models/market2.model'
import { getChainLogo } from '@/helpers/logo.helper'

export default {
  name: 'ProjectCard',
  components: {
    Stars,
  },
  props: {
    project: Object,
  },
  data() {
    const project = this.project || {}

    return {
      isFav: !!project.IsFavorite,
      favCount: project.FavCount || 0,
    }
  },
  watch: {
    project(project = {}) {
      this.isFav = !!project.IsFavorite
      this.favCount = project.FavCount || 0
    },
  },
  methods: {
    getChainLogo,

    async onFav() {
      if (!this.$root.token) {
        this.$root.connectWallet()
        return
      }

      if (this.isFav) {
        const res = await unfavProject(this.project.ID)
        if (res.code != 200) {
          this.$modal.toast(res.msg)
          return
        }
        this.isFav = false
        this.favCount -= 1
      } else {
        const res = await favProject(this.project.ID)
        if (res.code != 200) {
          this.$modal.toast(res.msg)
          return
        }
        this.isFav = true
        this.favCount += 1
      }
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 0.1rem solid $color-purple;
  border-radius: 0.5rem;
  background-color: lighten($color-purple, 24.5%);
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 768.89px) {
    border-width: 0.05rem;
    border-radius: 0.3rem;
  }
  .header {
    display: flex;
    align-items: center;
    padding: 0 0.65rem;
    height: 2.7rem;
    line-height: 2.7rem;
    font-size: 0.9rem;
    @media (max-width: 768.89px) {
      padding: 0 0.35rem;
      height: 1.7rem;
      line-height: 1.7rem;
      font-size: 0.65rem;
    }
    .name {
      flex: 1;
      display: flex;
      align-items: center;
      height: inherit;
      .image {
        position: relative;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        background: center center / contain no-repeat;
        @media (max-width: 768.89px) {
          width: 1.6em;
          height: 1.6em;
        }
      }
      .text {
        flex: 1;
        width: 0;
        margin: 0 0.5em;
        @include ellipsis(1);
      }
    }
    .cert {
      height: 1.39em;
      @media (max-width: 768.89px) {
        height: 1.1em;
      }
    }
  }
  .main {
    flex: 1;
    position: relative;
    padding: 0 0.65rem;
    @media (max-width: 768.89px) {
      padding: 0 0.35rem;
    }
    .image {
      position: relative;
      padding-top: 88%;
      background: center center / contain no-repeat;
      overflow: hidden;
      &.new::before {
        content: 'NEW';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        padding: 3.6em 1.5em 0;
        line-height: 1.2;
        font-size: 0.6rem;
        font-weight: 500;
        color: $color-primary;
        background-color: $color-purple;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
    .info {
      position: relative;
      padding: 0.5em 0 0.68em;
      line-height: 1.2;
      font-size: 1rem;
      @media (max-width: 768.89px) {
        padding: 0.4em 0 0.54em;
        font-size: 0.8rem;
      }
      .score {
        display: flex;
        align-items: center;
        margin-bottom: 0.6em;
        font-weight: 500;
        color: $color-gray;
        @media (max-width: 768.89px) {
          margin-bottom: 0.4em;
