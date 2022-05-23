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

