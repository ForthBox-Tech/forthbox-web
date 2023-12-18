<template>
  <div class="settings-manage-baseinfo">
    <div class="settings-col" style="flex: 1.5">
      <FormItem :label="$t('MyGames.ProjectName')">
        <Input v-model="name" :placeholder="$t('MyGames.PleaseEnterTheNameOfYourProject')"></Input>
      </FormItem>
      <FormItem :label="$t('Game2.ProjectOverview')">
        <Textarea
          v-model="introduce"
          :placeholder="$t('MyGames.PleaseEnterAnIntroductionOfYourProject')"
        ></Textarea>
      </FormItem>
      <FormItem label="轮播视频">
        <div class="video-update">
          <div class="cover">
            <div>将视频拖到此处，或<a class="link">点击上传</a></div>
          </div>
        </div>
      </FormItem>
      <FormItem label="轮播图片">
        <ul class="banner-update">
          <li class="item">
            <img class="img" />
          </li>
        </ul>
      </FormItem>
      <div class="settings-line"></div>
      <FormItem label="社交账户">
        <Input
          class="form-mb-1"
          :icon="require('@/assets/page-settings/page-game/input-twitter.png')"
          placeholder="请输入Twitter链接"
        ></Input>
        <Input
          class="form-mb-1"
          :icon="require('@/assets/page-settings/page-game/input-discord.png')"
          placeholder="请输入Discord链接"
        ></Input>
        <Input
          class="form-mb-1"
          :icon="require('@/assets/page-settings/page-game/input-telegram.png')"
          placeholder="请输入Telegram链接"
        ></Input>
        <Input
          :icon="require('@/assets/page-settings/page-game/input-instagram.png')"
          placeholder="请输入Instagram链接"
        ></Input>
      </FormItem>
      <div class="settings-line"></div>
      <FormItem :label="$t('MyGames.PersonalWebsite')">
        <Input
          :icon="require('@/assets/page-settings/page-account/user-network.png')"
          :placeholder="$t('MyGames.PleaseEnterAWebsite')"
        ></Input>
      </FormItem>
      <div class="settings-line"></div>
      <div class="settings-btns">
        <Button class="btn-save">{{ $t('MyGames.Save') }}</Button>
      </div>
    </div>
    <div class="settings-col">
      <FormItem
        label="LOGO"
        :tips="$t('MyGames.PleaseUploadImage', { size: '160x160', max: '2MB' })"
      >
        <div class="logo-update">
          <img class="img" src="" />
          <div class="cover"></div>
        </div>
      </FormItem>
    </div>
  </div>
</template>

<script>
import FormItem from '@/components/FormItem.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Textarea from '@/components/Textarea.vue'

export default {
  components: {
    FormItem,
    Input,
    Button,
    Textarea,
  },
  props: {},
  data() {
    return {
      name: '',
      introduce: '',
    }
  },
  methods: {},
  created() {
    console.log('8888888888')
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-manage-baseinfo {
  display: flex;
  .video-update {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
    border: 0.1rem dashed $color-border;
    border-radius: 0.4rem;
    cursor: pointer;
    .cover {
      text-align: center;
      font-size: 0.7rem;
      color: #b4b9be;
      &::before {
        content: '';
        margin: 0 auto 1.6rem;
        display: block;
        width: 6rem;
        height: 4.5rem;
        background: url('~@/assets/page-settings/page-game/video-update.png') center center /
          contain no-repeat;
      }
      .link {
        color: $color-blue;
      }
    }
    &:hover {
      .cover {
        &::before {
          background-image: url('~@/assets/page-settings/page-game/video-update-a.png');
        }
      }
    }
  }
  .banner-update {
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: 6.8rem;
      border: 0.1rem dashed $color-border;
      border-radius: 0.4rem;
      background: url('~@/assets/page-settings/page-game/banner-update.png') center center / 2.5rem
        no-repeat;
      cursor: pointer;
      &:hover {
        background-image: url('~@/assets/page-settings/page-game/banner-update-a.png');
      }
    }
  }
  .logo-update {
    margin: 1rem 0 1.5rem;
    position: relative;
    width: 7rem;
    height: 7rem;
    line-height: 7rem;
    text-align: center;
    vertical-align: middle;
    background-color: #f7fafd;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    .img {
      max-width: 100%;
      max-height: 100%;
    }
    .cover {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba($color-black, 0.2)
        url('~@/assets/page-settings/page-account/user-update.png') center center / 1.5rem no-repeat;
    }
    &:hover {
      .cover {
        display: block;
      }
    }
  }
}
</style>
