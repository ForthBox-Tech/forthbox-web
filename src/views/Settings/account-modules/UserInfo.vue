<template>
  <div class="settings-userinfo settings-content">
    <div class="settings-col" style="flex: 1.5">
      <FormItem :label="$t('Settings.WalletAddress')">
        <Input v-model="wallet" disabled>
          <!-- <a class="btn-input btn-bind">绑定</a> -->
        </Input>
      </FormItem>
      <FormItem :label="$t('MyGames.Username')" :tips="$t('Settings.UserTips')">
        <Input v-model="username" :placeholder="$t('Settings.UserLimitTips')">
          <!-- <a class="btn-input btn-create">创建</a> -->
        </Input>
      </FormItem>
      <FormItem :label="$t('Settings.PersonalIntroduction')">
        <Textarea
          v-model="introduce"
          :placeholder="$t('Settings.PleaseEnterABriefIntroduction')"
        ></Textarea>
      </FormItem>
      <FormItem :label="$t('Settings.EmailAddress')">
        <Input
          class="form-mb-1"
          v-model="email"
          :placeholder="$t('Settings.PleaseEnterYourEmailAddress')"
        ></Input>
        <template v-if="!(email == emailDefault && emailIsVerify)">
          <VerifyCodeInput
            v-model="verifyCode"
            @get-verify="onVerifyEmail"
            :placeholder="$t('Settings.PleaseEnterTheVerificationCode')"
          ></VerifyCodeInput>
        </template>
      </FormItem>
      <div class="settings-line"></div>
      <FormItem
        :label="$t('Settings.ConnectSocialMedia')"
        :tips="$t('Settings.AllowCollectorsToVerifyYourAccount')"
      >
        <Input
          class="form-mb-1"
          v-model="twitter"
          :icon="require('@/assets/comp-social/social-twitter.png')"
          :placeholder="$t('MyGames.PleaseEnterTheTwitterLink')"
        ></Input>
        <Input
          class="form-mb-1"
          v-model="instagram"
          :icon="require('@/assets/comp-social/social-instagram.png')"
          :placeholder="$t('MyGames.PleaseEnterTheInstagramLink')"
        ></Input>
        <Input
          v-model="facebook"
          :icon="require('@/assets/comp-social/social-facebook.png')"
          :placeholder="$t('MyGames.PleaseEnterTheFacebookLink')"
        ></Input>
      </FormItem>
      <div class="settings-line"></div>
      <FormItem :label="$t('MyGames.PersonalWebsite')">
        <Input
          v-model="website"
          :icon="require('@/assets/page-settings/page-account/user-network.png')"
          :placeholder="$t('MyGames.PleaseEnterAWebsite')"
        ></Input>
      </FormItem>
      <div class="settings-line"></div>
      <div class="settings-btns">
        <Button class="btn-save" loader :handler="onSave">
          {{ $t('MyGames.Save') }}
        </Button>
      </div>
    </div>
    <div class="settings-col">
      <FormItem
        :label="$t('Settings.ProfilePicture')"
        :tips="$t('MyGames.PleaseUploadImage', { size: '160x160', max: '2MB' })"
      >
        <ImageUploader
          class="uploader-image"
          :image="avatar"
          :progress="avatarUploadProgress"
          :upload="onUploadAvatar"
          @success="onUpdateSuccess"
        ></ImageUploader>
      </FormItem>
      <FormItem
        :label="$t('Settings.Background')"
        :tips="$t('MyGames.PleaseUploadImage', { size: '1920x300', max: '2MB' })"
      >
        <ImageUploader
          class="uploader-image uploader-banner"
          :image="banner"
          :progress="bannerUploadProgress"
          :upload="onUploadBanner"
          @success="onUpdateSuccess"
        ></ImageUploader>
      </FormItem>
    </div>
  </div>
</template>

<script>
import FormItem from '@/components/FormItem.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Textarea from '@/components/Textarea.vue'
import VerifyCodeInput from '../components/VerifyCodeInput.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import emitter from '@/common/js/emitter'
import RULE from '../common/verify-rules'
import { uploadImage } from '@/models/settings.model'

const formRuleMap = {
  username: RULE.USERNAME,
}

export default {
  components: {
    FormItem,
    Input,
    Button,
    Textarea,
    VerifyCodeInput,
    ImageUploader,
  },
  data() {
    return {
      wallet: '',
      username: '',
      introduce: '',

      avatar: '',
      avatarUploadProgress: 0,

      banner: '',
      bannerUploadProgress: 0,

      email: '',
      emailDefault: '',
      emailIsVerify: false,
      verifyCode: '',

      twitter: '',
      instagram: '',
      facebook: '',
      discord: '',
      telegram: '',

      website: '',

      error: {},
    }
  },
  mixins: [initTriggerMixin()],
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

    async onVerifyEmail({ gToken, next }) {
      const result = await this._verifyEmail(gToken)
      if (result) {
        next()
      }
    },
    async onSave() {
      // if (!this._checkForm()) return

      const result = await this._updateProfile()
      this.onUpdateSuccess(result)
    },
    _checkForm() {
      const error = this.$validate(this, formRuleMap)
      this.error = error
      return !error.name
    },

    async _verifyEmail(gToken) {
      const email = (this.email || '').trim()
      if (!email) return

      const url = `${process.env.VUE_APP_API_FBOX2}/web/users/send_bind_email_code`
      const params = new URLSearchParams()
      params.append('email', email)
      params.append('gToken', gToken)

      const res = await this.$axios.post(url, params)
      if (res.code != 200) {
        this.$modal.toast(res.msg)
        return false
      }

      return true
    },
    async _updateProfile() {
      const _params = {
        UserName: (this.username || '').trim(),
        Email: (this.email || '').trim(),
        verifyCode: (this.verifyCode || '').trim(),
        Introduce: (this.introduce || '').trim(),
        WebsiteUrl: (this.website || '').trim(),
        TwitterUrl: (this.twitter || '').trim(),
        InstagramUrl: (this.instagram || '').trim(),
        FacebookUrl: (this.facebook || '').trim(),
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/users/update_profile`
      const params = new URLSearchParams()
      Object.keys(_params).forEach((key) => {
        params.append(key, _params[key])
      })

      const res = await this.$axios.post(url, params)
      if (res.code != 200) {
        this.$modal.toast(res.msg)
        return false
      }

      this.$modal.toast('success')
      return true
    },
    async _getProfile() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/users/my_profile`
      const params = {}

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        console.warn(res.msg)
        return
      }

      const user = res.data?.user || {}

      this.wallet = user.UserAddr || ''
      this.username = user.UserName || ''
      this.introduce = user.Introduce || ''

      this.avatar = user.Avatar || ''
      this.banner = user.BannerUrl || ''

      this.email = user.Email || ''
      this.emailDefault = this.email
      this.emailIsVerify = !!user.EmailIsVerify

      this.twitter = user.TwitterUrl || ''
      this.instagram = user.InstagramUrl || ''
      this.facebook = user.FacebookUrl || ''
      this.discord = user.DiscordUrl || ''
      this.telegram = user.TelegramUrl || ''

      this.website = user.WebsiteUrl || ''
    },

    async init() {
      await this._getProfile()
    },
  },
  created() {
    emitter.on('user-update', this._getProfile)
  },
  unmounted() {
    emitter.off('user-update', this._getProfile)
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-userinfo {
  display: flex;
  @media (max-width: 768.89px) {
    display: block;
    padding: 0;
  }
  .btn-input {
    &.btn-bind {
      &::before {
        background-image: url('~@/assets/page-settings/page-account/user-bind.png');
      }
      &:hover {
        &::before {
          background-image: url('~@/assets/page-settings/page-account/user-bind2.png');
        }
      }
    }
    &.btn-create {
      color: $color-blue;
      &::before {
        background-image: url('~@/assets/page-settings/page-account/user-create.png');
      }
      &::after {
        display: none;
      }
    }
  }
  .uploader-image {
    margin: 1rem 0 1.5rem;
    width: 7rem;
    height: 7rem;
    line-height: 7rem;
    background-color: #f7fafd;
    &.uploader-banner {
      width: 100%;
      border-radius: 0.5rem;
    }
  }
}
</style>
