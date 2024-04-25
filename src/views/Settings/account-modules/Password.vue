<template>
  <div class="settings-password settings-content">
    <div class="settings-col" style="flex: 1.5">
      <FormItem label="输入新密码">
        <PasswordInput v-model="password" placeholder="请输入新密码"></PasswordInput>
      </FormItem>
      <FormItem label="确认新密码">
        <PasswordInput v-model="password2" placeholder="请确认新密码"></PasswordInput>
      </FormItem>
      <div class="identify">
        <div class="col">
          <div class="inner placeholder" @click="onWalletVerify">
            <div>
              <img class="icon" src="@/assets/page-settings/page-account/pwd-wallet.png" />
              <div class="text">钱包认证</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="inner placeholder" v-if="!isActiveEmailVerify" @click="onActiveEmailVerify">
            <div>
              <img class="icon" src="@/assets/page-settings/page-account/pwd-email.png" />
              <div class="text">邮箱认证</div>
            </div>
          </div>
          <div class="inner" v-if="isActiveEmailVerify">
            <div class="label">请查阅当前邮箱发送的验证码</div>
            <div class="value">837234214@qq.com</div>
            <div class="input-wrap">
              <VerifyCodeInput v-model="verifyCode"></VerifyCodeInput>
            </div>
            <div>
              <Button class="btn-verify" :disabled="!verifyCode" @click="onVerify">确认</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="settings-col"></div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import FormItem from '@/components/FormItem.vue'
import PasswordInput from '../components/PasswordInput.vue'
import VerifyCodeInput from '../components/VerifyCodeInput.vue'

export default {
  name: 'Password',
  components: {
    Button,
    FormItem,
    PasswordInput,
    VerifyCodeInput,
  },
  data() {
    return {
      password: '',
      password2: '',

      verifyCode: '',
      isActiveEmailVerify: false,
    }
  },
  methods: {
    onWalletVerify() {
      console.log('---onWalletVerify')
    },
    onActiveEmailVerify() {
      this.isActiveEmailVerify = true
    },

    onVerify() {
      console.log('---onVerify')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-password {
  display: flex;
  .identify {
    margin: 1.5rem 0;
    display: flex;
    .col {
      position: relative;
      flex: 1;
      margin-right: 1rem;
      min-height: 13rem;
      border: 0.05rem solid $color-border;
      border-radius: 0.5rem;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      .inner {
        box-sizing: border-box;
        padding: 1rem;
        height: 100%;
        line-height: 1.5;
      }
      .label {
        font-size: 0.6rem;
        color: #84879d;
      }
      .value {
        font-size: 0.9rem;
        font-weight: 500;
      }
      .input-wrap {
        margin: 0.75rem 0;
      }
      .btn-verify {
        box-sizing: border-box;
        width: 100%;
        color: $color-white;
        background-color: $color-blue;
        border-radius: 0.5rem;
      }
      .placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 0.7rem;
        font-weight: 500;
        color: #b9bfc5;
        &:hover {
          background-color: #f7fafd;
        }
        .icon {
          margin-bottom: 0.5rem;
          display: flex;
          width: 3.5rem;
        }
      }
    }
  }
}
</style>

