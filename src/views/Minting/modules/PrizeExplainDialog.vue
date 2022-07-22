<template>
  <TipsDialog class="prize-explain-dialog" :visible="visible" @hide="onHide">
    <template v-slot:title>{{ $t('Dapp.RulesofNFTAirdrop') }}</template>
    <template v-slot:content>
      <p>1、{{ $t('Dapp.PrizeDialog.TheNFTAirdropReward') }}</p>
      <p>2、{{ $t('Dapp.PrizeDialog.WhenYouFeedHam') }}</p>
      <p>3、{{ $t('Dapp.PrizeDialog.RulesAboutRelationship') }}</p>
      <table class="table">
        <tr>
          <th>{{ $t('Dapp.PrizeDialog.Level') }}</th>
          <th>{{ $t('Dapp.PrizeDialog.Type') }}</th>
          <th>{{ $t('Dapp.PrizeDialog.GameLevel') }}</th>
        </tr>
        <tr>
          <td>3-1</td>
          <td>{{ $t('Dapp.PrizeDialog.MachineGun') }}</td>
          <td>1</td>
        </tr>
        <tr>
          <td>6-1</td>
          <td>{{ $t('Dapp.PrizeDialog.Frozen') }}</td>
          <td>1</td>
        </tr>
        <tr>
          <td>9-1</td>
          <td>{{ $t('Dapp.PrizeDialog.Fire') }}</td>
          <td>1</td>
        </tr>
        <tr>
          <td>11-1</td>
          <td>{{ $t('Dapp.PrizeDialog.Laser') }}</td>
          <td>1</td>
        </tr>
        <tr>
          <td>12-1</td>
          <td>{{ $t('Dapp.PrizeDialog.Railgun') }}</td>
          <td>1</td>
        </tr>
        <tr>
          <td>13-1</td>
          <td>{{ $t('Dapp.PrizeDialog.Missile') }}</td>
          <td>1</td>
        </tr>
      </table>
      <p>{{ $t('Dapp.PrizeDialog.Note') }}</p>
    </template>
  </TipsDialog>
</template>

<script>
import TipsDialog from '@/modules/TipsDialog.vue'

export default {
  name: 'PrizeExplainDialog',
  components: {
    TipsDialog,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    onHide() {
      this.hide()
    },

    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss">
.prize-explain-dialog {
  .table {
    margin: 0.5rem 0;
    border-collapse: collapse;
    caption {
      padding: 0.4rem 0;
      line-height: 1.5;
      border: 1px solid #fff;
      border-bottom: 0 none;
    }
    th,
    td {
      width: 10rem;
      padding: 0.3rem 0.5rem;
      line-height: 1.2;
      border: 1px solid #fff;
    }
    .aside {
      padding: 0.5rem;
      line-height: 1.5;
    }
  }
}
</style>

