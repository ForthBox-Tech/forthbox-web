<template>
  <div class="settings-manage-gamecenter">
    <div class="settings-col" style="flex: 1.5">
      <FormItem label="项目介绍">
        <Textarea v-model="introduce" placeholder="请输入项目介绍"></Textarea>
      </FormItem>
      <FormItem label="项目排行榜API URL">
        <Input
          v-model="url"
          placeholder="请输入API地址"
          :icon="require('@/assets/page-settings/page-game/input-url.png')"
        >
          <a :class="['btn-input', 'btn-verify', false ? 'disabled' : '']">验证</a>
        </Input>
      </FormItem>
      <FormItem label="NFT合约">
        <Input
          v-model="url"
          placeholder="请输入API地址"
          :icon="require('@/assets/page-settings/page-game/input-nft.png')"
        >
          <a :class="['btn-input', 'btn-generate', false ? 'disabled' : '']">生成</a>
        </Input>
      </FormItem>
    </div>
    <div class="settings-col"></div>
  </div>
</template>

<script>
import FormItem from '@/components/FormItem.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'

export default {
  name: 'ManageGameCenter',
  components: {
    FormItem,
    Input,
    Textarea,
  },
  props: {},
  data() {
    return {
      introduce: '',
      url: '',
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-manage-gamecenter {
  display: flex;
  .btn-input {
    &.btn-verify {
      color: $color-blue;
      &::before {
        background-image: url('~@/assets/page-settings/page-game/input-verify.png');
      }
      &.disabled {
        color: #bcbcbc;
      }
    }
    &.btn-generate {
      color: $color-blue;
      &::before {
        background-image: url('~@/assets/page-settings/page-game/input-gen.png');
      }
      &.disabled {
        color: #bcbcbc;
      }
    }
  }
}
</style>

