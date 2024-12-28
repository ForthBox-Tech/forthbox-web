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

.comp-profile {
  .banners {
    height: 15rem;
    background: $color-placeholder center center / cover no-repeat;
    @media (max-width: 768.89px) {
      height: 7.5rem;
    }
    .banner {
      position: relative;
      height: 100%;
      width: 100%;
      border-radius: 0;
      .uploader-image {
        max-width: none;
        max-height: none;
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .detail {
    display: flex;
    margin-top: -5rem;
    @media (max-width: 768.89px) {
      display: block;
      margin-top: -2.5rem;
      margin-bottom: 7.5%;
    }
    .info {
      flex: 1;
    }
    .avatar {
      position: relative;
      z-index: 10;
      display: block;
      box-sizing: border-box;
      padding: 0.25rem;
      width: 8rem;
      height: 8rem;
      background-color: $color-white;
      border-radius: 8rem;
      box-shadow: 0px 0.15rem 0.3rem 0.05rem rgba(0, 0, 0, 0.16);
      @media (max-width: 768.89px) {
        padding: 0.125rem;
        width: 4rem;
        height: 4rem;
        .uploader-cover {
          background-size: 25%;
        }
      }
      .image {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .icon {
        position: absolute;
        bottom: 0.15rem;
        right: 0.9rem;
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        @media (max-width: 768.89px) {
          bottom: 0.075rem;
          right: 0.45rem;
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }
    .user {
      margin-top: 1.5rem;
      display: inline-flex;
      line-height: 1.8rem;
      font-size: 0.8rem;
      background-color: $color-white;
      box-shadow: 0 0 0.6rem 0.05rem rgba(91, 92, 97, 0.16);
      border-radius: 1.8rem;
      @media (max-width: 768.89px) {
        margin-top: 1rem;
        line-height: 1.3rem;
        font-size: 0.6rem;
      }
      .label {
        display: block;
        padding: 0 1rem;
        color: $color-white;
        background-color: $color-black;
        border-radius: 1.8rem;
        @media (max-width: 768.89px) {
          padding: 0 0.6rem;
        }
      }
      .value {
        flex: 1;
        display: block;
        padding: 0 0.2rem 0 0.5rem;
        color: $color-primary;
      }
      .icon {
        width: 1.8rem;
        background: url('~@/assets/comp-user-modal/icon-copy.png') 40% center / 40% no-repeat;
        cursor: pointer;
        @media (max-width: 768.89px) {
          width: 1.3rem;
        }
        &:hover {
          background-image: url('~@/assets/comp-user-modal/icon-copy-a.png');
        }
      }
    }
    .desc {
      margin-top: 1rem;
      font-size: 0.7rem;
      word-break: break-word;
      @media (max-width: 768.89px) {
        margin-top: 0.7rem;
        font-size: 0.6rem;
      }
      .trigger {
        color: $color-blue;
        &::after {
          content: '';
          margin-left: 0.2rem;
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-right: 0.05rem solid $color-blue;
          border-bottom: 0.05rem solid $color-blue;
          transform: rotate(45deg);
          vertical-align: 0.15rem;
        }
      }
    }
    .aside {
      padding-top: 6rem;
      @media (max-width: 768.89px) {
        padding-top: 1rem;
      }
    }
  }
}
</style>

