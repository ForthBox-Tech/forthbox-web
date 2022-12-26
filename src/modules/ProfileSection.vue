<template>
  <section class="comp-profile">
    <section class="banners">
      <ImageUploader
        class="banner"
        :image="$root.user.banner"
        :progress="bannerUploadProgress"
        :upload="onUploadBanner"
        @success="onUpdateSuccess"
      ></ImageUploader>
    </section>
    <section class="detail main-wrap2">
      <div class="info">
        <div class="avatar">
          <ImageUploader
            class="image"
            :image="$root.user.avatar"
            :progress="avatarUploadProgress"
            :upload="onUploadAvatar"
            @success="onUpdateSuccess"
          ></ImageUploader>
          <!-- <img class="icon" src="@/assets/common/icon-cert2.png" /> -->
        </div>
        <div class="user">
          <span class="label">{{ $root.user.name }}</span>
          <span class="value">{{ $root.vUserWallet }}</span>
          <Tooltip trigger="manual" ref="tooltip" :text="$t('Footer.Copied')">
            <span ref="copyTrigger" class="icon" :data-clipboard-text="$root.userWallet"></span>
          </Tooltip>
        </div>
        <div class="desc" v-if="$root.user.introduce">
          <span class="text">
            {{ $root.user.introduce }}
          </span>
          <!-- <a class="trigger">展开</a> -->
        </div>
      </div>
      <div class="aside">
        <Social :social="$root.user"></Social>
      </div>
    </section>
  </section>
</template>

<script>
import Social from './Social.vue'
import Tooltip from '@/components/Tooltip.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import { uploadImage } from '@/models/settings.model'
import emitter from '@/common/js/emitter'
import Clipboard from 'clipboard'

export default {
  name: 'ProfileSection',
  components: {
    Social,
    Tooltip,
    ImageUploader,
  },
  data() {
    return {
      avatarUploadProgress: 0,
      bannerUploadProgress: 0,
    }
  },
  methods: {
    async onUploadAvatar(image) {
      return await uploadImage(image, 'avatar', (evt) => {
        const progress = (evt.loaded || 0) / evt.total
        this.avatarUploadProgress = parseInt(progress * 100)
      })
    },
    async onUploadBanner(image) {
      return await uploadImage(image, 'userBanner', (evt) => {
        const progress = (evt.loaded || 0) / evt.total
        this.bannerUploadProgress = parseInt(progress * 100)
      })
    },
    async onUpdateSuccess(result) {
      if (result) {
        emitter.emit('user-update')
      }
    },
  },
  mounted() {
    this._clipboard = new Clipboard(this.$refs.copyTrigger)
    this._clipboard.on('success', () => {
      this.$refs.tooltip.toast()
    })
  },
  unmounted() {
    this._clipboard && this._clipboard.destroy()
  },
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

