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

