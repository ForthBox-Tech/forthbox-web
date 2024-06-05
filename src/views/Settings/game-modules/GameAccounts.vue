<template>
  <div class="settings-game-accounts settings-content">
    <div>
      <Button class="btn-add" @click="onAdd">
        <img class="icon" src="@/assets/page-settings/page-game/btn-add.png" />
        <span>{{ $t('MyGames.Add') }}</span>
      </Button>
      <!-- <Button class="btn-import" @click="onImport">
        <img class="icon" src="@/assets/page-settings/page-game/btn-import.png" />
        <span>{{ $t('MyGames.BulkImport') }}</span>
      </Button>
      <Button class="btn-excel" @click="onImportMulti">
        <img class="icon" src="@/assets/page-settings/page-game/btn-excel.png" />
        <span>{{ $t('MyGames.BulkImportTemplate') }}</span>
      </Button> -->
      <!-- <Button class="btn-export" @click="onExport">
        <span>{{ $t('MyGames.Export') }}</span>
      </Button> -->
    </div>
    <div class="table-wrap">
      <table class="table">
        <tr>
          <th>{{ $t('MyGames.OwnerAddress') }}</th>
          <th>{{ $t('MyGames.Username') }}</th>
          <th>{{ $t('MyGames.Password') }}</th>
          <th>{{ $t('MyGames.OwnerPercentage') }}</th>
          <th>{{ $t('MyGames.ScholarAddress') }}</th>
          <th>{{ $t('MyGames.ScholarPercentage') }}</th>
          <th>{{ $t('MyGames.Status') }}</th>
          <th>{{ $t('MyGames.Actions') }}</th>
        </tr>
        <tr v-for="item in list" :key="item">
          <td>
            <Input class="table-input" v-model="item.ownerAddr" :disabled="!item.isEdit"></Input>
          </td>
          <td>
            <Input class="table-input" v-model="item.userName" :disabled="!item.isEdit"></Input>
          </td>
          <td>
            <Input class="table-input" v-model="item.password" :disabled="!item.isEdit"></Input>
          </td>
          <td>
            <Input class="table-input ratio" v-model="item.ownerRatio" :disabled="true"></Input>
            %
          </td>
          <td>
            <Input class="table-input" v-model="item.scholarAddr" :disabled="!item.isEdit"></Input>
          </td>
          <td>
            <Input
              class="table-input ratio"
              v-model="item.scholarRatio"
              :disabled="!item.isEdit"
              @change="onRatioChange(item, 'scholarRatio')"
            ></Input>
            %
          </td>
          <td>
            <span v-if="item.isEdit">-</span>
            <a class="verify" v-else-if="!item.status" :href="item.authLink">
              {{ $t('MyGames.Unverified') }}
            </a>
            <span class="done" v-else>{{ $t('MyGames.Verified') }}</span>
          </td>
          <td>
            <template v-if="item.loading"> Loading </template>
            <template v-else-if="item.isEdit">
              <a class="btn-text btn-cancel" v-if="item.userId" @click="onCancel(item)">
                {{ $t('MyGames.Cancel') }}
              </a>
              <a class="btn-text btn-save" @click="onSave(item)">
                {{ $t('MyGames.Save') }}
              </a>
              <a class="btn-text btn-delete" v-if="!item.userId" @click="onDelete(item)">
                {{ $t('MyGames.Delete') }}
              </a>
            </template>
            <template v-else>
              <a class="btn-text btn-edit" @click="onEdit(item)">
                {{ $t('MyGames.Edit') }}
              </a>
              <a class="btn-text btn-delete" @click="onDelete(item)">
                {{ $t('MyGames.Delete') }}
              </a>
            </template>
          </td>
        </tr>
      </table>
    </div>
    <div class="pagination-wrap" v-if="total > pageSize">
      <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Pagination from '@/components/Pagination.vue'
import { getAuthLink } from '@/helpers/ucenter.helper'
import initTriggerMixin from '@/mixins/init-trigger'

const formRuleMap = {
  userName: [{ type: 'required', message: 'username is required' }],
  password: [{ type: 'required', message: 'password is required' }],
  ownerAddr: [{ type: 'required', message: 'owner address is required' }],
  // scholarAddr: [{ type: 'required', message: 'scholar address is required' }],
}

export default {
  components: {
    Button,
    Input,
    Pagination,
  },
  props: {
    game: Object,
  },
  data() {
    return {
      total: 0,
      pageSize: 12,
      pageNo: 1,

      list: [],
    }
  },
  watch: {
    game(newVal) {
      this.init(newVal)
    },
  },
  mixins: [initTriggerMixin()],
  methods: {
    onAdd() {
      this.list.unshift({
        userId: '',
        userName: '',
        password: '',
        ownerAddr: '',
        ownerRatio: 100,
        scholarAddr: '',
        scholarRatio: 0,
        status: '',
        verifyCode: '',
        isEdit: true,
        loading: false,
      })
    },
    onImport() {
      console.log('---onImport')
    },
    onImportMulti() {
      console.log('---onImportMulti')
    },
    onExport() {
      this._export()
    },

    async _export() {
      const _params = {
        symbol: this.game?.Symbol || '',
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/game_sub_user/export`
      const params = new URLSearchParams()
      Object.keys(_params).forEach((key) => {
        params.append(key, _params[key])
      })

      const res = await this.$axios.post(url, params, { responseType: 'blob' })
      const blob = new Blob([res])
      const blobUrl = window.URL.createObjectURL(blob)
      const filename = `game-account.xlsx`
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(blobUrl)
    },

    onRatioChange(item, key) {
      const newVal = item[key]
      const oldVal = item[`_${key}`] || ''
      if (newVal !== '' && (!/^\d*$/.test(`${newVal}`) || parseFloat(newVal) > 100)) {
        item[key] = parseFloat(oldVal) ? oldVal : ''
        return
      }

      item[`_${key}`] = newVal

      const eKey = key == 'ownerRatio' ? 'scholarRatio' : 'ownerRatio'
      const eVal = 100 - newVal
      item[eKey] = eVal
      item[`_${eKey}`] = eVal
    },

    async onSave(item) {
      if (!this._checkForm(item)) return

      let result = false

      item.loading = true
      if (item.userId) {
        result = await this._editAccount(item)
      } else {
        result = await this._addAccount(item)
      }
      item.loading = false

      if (!result) return

      item.isEdit = false
      this._getList()
    },
    onEdit(item) {
      item._backup = { ...item, _backup: null }

      item.isEdit = true
    },
    async onDelete(item) {
      if (item.userId) {
        item.loading = true
        await this._delAccount(item)
        item.loading = false

        this._getList()
      } else {
        const index = this.list.findIndex((_item) => _item == item)
        this.list.splice(index, 1)
      }
    },
    onCancel(item) {
      Object.assign(item, item._backup)

      item.isEdit = false
    },

    onJump(pageNo) {
      this.pageNo = pageNo
      this._getList()
    },

    _checkForm(item) {
      const error = this.$validate(item, formRuleMap)
      if (error && error.name) {
        this.$modal.toast(error.message)
        return false
      }

      if (item.scholarRatio > 0 && !item.scholarAddr) {
        this.$modal.toast('scholar address is required')
        return false
      }

      return true
    },
    async _addAccount(item) {
      const _params = {
        userName: item.userName,
        passwd: item.password,
        ownerAddr: item.ownerAddr,
        splitAddr: item.scholarAddr,
        splitRadio: item.scholarRatio / 100,
        symbol: this.game?.Symbol || '',
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/game_sub_user/create`
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
    async _editAccount(item) {
      const _params = {
        subUserId: item.userId,
        userName: item.userName,
        passwd: item.password,
        ownerAddr: item.ownerAddr,
        splitAddr: item.scholarAddr,
        splitRadio: item.scholarRatio / 100,
        symbol: this.game?.Symbol || '',
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/game_sub_user/edit`
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
    async _delAccount(item) {
      const _params = {
        subUserId: item.userId,
        symbol: this.game?.Symbol || '',
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/game_sub_user/del`
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
    async _getList() {
      const symbol = this.game?.Symbol || ''
      if (!symbol) {
        this.total = 0
        this.list = []
        return
      }

      const url = `${process.env.VUE_APP_API_FBOX2}/web/game_sub_user/list/get`
      const params = {
        symbol,
      }

      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        this.total = 0
        this.list = []
        console.warn(res.msg)
        return
      }

      const data = res.data || {}
      this.list = Object.keys(data).map((key) => {
        const item = data[key]
        const result = {
          userId: item.SubUserId,
          userName: item.UserName,
          password: item.Passwd,
          ownerAddr: item.OwnerAddr,
          ownerRatio: item.OwnerRadio * 100,
          scholarAddr: item.SplitAddr,
          scholarRatio: item.SplitRadio * 100,
          status: item.Status,
          verifyCode: item.VerifyCode,
          authLink: '',
          isEdit: false,
          loading: false,
        }

        result.authLink = getAuthLink({
          verifyCode: result.verifyCode,
          username: result.userName,
          walletAddr: result.ownerAddr,
          scholarAddr: result.scholarAddr,
          scholarRatio: result.scholarRatio,
        })

        return result
      })
    },

    async init() {
      this.total = 0
      this.pageNo = 1
      await this._getList()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-game-accounts {
  @media (max-width: 768.89px) {
    display: block;
    padding: 0;
  }
  .fbx-btn {
    margin-right: 1.5rem;
    min-width: 4rem;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    @media (max-width: 768.89px) {
      margin: 0 0.4rem 0.4rem 0;
      line-height: 1.6rem;
      font-size: 0.65rem;
      min-width: 2.5rem;
    }
    .icon {
      margin-right: 0.5rem;
      width: 0.8rem;
      vertical-align: -0.1rem;
      @media (max-width: 768.89px) {
        margin-right: 0.3rem;
        width: 0.6rem;
        vertical-align: -0.1rem;
      }
    }

    &.btn-add {
      @include btn-fill-pure($color-blue);
      @media (max-width: 768.89px) {
        padding: 0 0.5rem;
      }
    }
    &.btn-import {
      @include btn-fill-pure(lighten($color-blue, 10));
      @media (max-width: 768.89px) {
        padding: 0 0.5rem;
      }
    }
    &.btn-excel {
      @include btn-fill-pure($color-purple);
      @media (max-width: 768.89px) {
        padding: 0 0.5rem;
      }
    }
    &.btn-export {
      @include btn-fill-pure(#18d607);
      @media (max-width: 768.89px) {
        padding: 0 0.5rem;
      }
    }
  }
  .table-wrap {
    margin-top: 1.5rem;
    overflow: auto;
    @media (max-width: 768.89px) {
      margin-top: 0.5rem;
    }
  }
  .table {
    text-align: center;
    th {
      padding: 0.75rem 0.5rem;
      border: 0.05rem solid $color-border;
    }
    td {
      padding: 0.15rem 0;
      border: 0.05rem solid $color-border;
    }
    .table-input {
      margin: 0 0.5rem;
      width: auto;
      text-align: center;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      &.disabled {
        border: 0 none;
      }
      &.ratio {
        display: inline-flex;
        width: 4rem;
      }
    }
    .done {
      color: $color-gray;
    }
    .verify {
      color: $color-blue;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .btn-text {
      padding: 0.2rem 0.3rem;
      white-space: nowrap;
      color: $color-blue;
      cursor: pointer;
    }
    .btn-cancel {
      color: $color-gray;
    }
    .btn-delete {
      color: $color-red;
    }
  }
}
</style>
