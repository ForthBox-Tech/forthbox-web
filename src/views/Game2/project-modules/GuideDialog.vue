<template>
  <Dialog class="dialog-guide" :visible="visible" @hide="onHide">
    <main class="guide-main">
      <header class="guide-header">
        <div class="title">{{ $t('Games.Guide') }}</div>
        <a class="close" @click="onHide"></a>
      </header>
      <div class="guide-block">
        <div>
          {{ $t('Games.ToEncourageUsersParticipating') }}
        </div>
        <div>{{ $t('Games.TheRevenueFormula') }}</div>
      </div>
      <div class="guide-block">
        <table class="table">
          <thead>
            <th>{{ $t('Games.ITEM') }}</th>
            <th>{{ $t('Games.CONTENT') }}</th>
            <th>{{ $t('Games.DESCRIPTION') }}</th>
          </thead>
          <tbody>
            <tr>
              <td>{{ $t('Games.PrizeForComment') }}</td>
              <td>{{ $t('Games.FBXTokens') }}</td>
              <td></td>
            </tr>
            <tr>
              <td>{{ $t('Games.Formula') }}</td>
              <td>{{ $t('Games.IndividualHashrate') }}</td>
              <td>
                <div>{{ $t('Games.MStandsFor') }}</div>
                <div>{{ $t('Games.NStandsFor') }}</div>
              </td>
            </tr>
            <tr>
              <td>{{ $t('Games.ContractValidity') }}</td>
              <td>{{ $t('Games.1Month') }}</td>
              <td>{{ $t('Games.ExpiresAfter1Month') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="guide-block">
        {{ $t('Games.IfThereAreDeliberatelyMaliciousComments') }}
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'GuideDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    hide() {
      this.visible = false
    },
    show() {
      this.visible = true
    },

    onHide() {
      this.hide()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-guide {
  .guide-main {
    width: 32rem;
    padding: 0 1.5rem 0.5rem;
    text-align: left;
    background-color: $color-white;
    border-radius: 1rem;
  }
  .guide-header {
    display: flex;
    padding-top: 0.5rem;
    line-height: 3rem;
    font-size: 0.8rem;
    border-bottom: 0.05rem solid $color-border;
    .title {
      flex: 1;
      font-weight: 500;
    }
    .close {
      margin-right: -1rem;
      width: 3rem;
      height: 3rem;
      background: url('~@/assets/common/close.png') center center / 0.8rem no-repeat;
      cursor: pointer;
    }
  }
  .guide-block {
    margin: 1rem 0;
    line-height: 1.4;
  }
  .table {
    margin: 1.5rem 0;
    border-collapse: collapse;
    th,
    td {
      padding: 0.5rem 1rem;
      border: 0.05rem solid $color-border;
    }
  }
}
</style>

