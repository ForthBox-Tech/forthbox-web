<template>
  <Dialog class="dialog-metabull dialog-invite-record" :visible="visible" @hide="onHide">
    <main class="main">
      <a class="close" @click="onHide"></a>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>My invited friend</th>
              <th>Number of Votes</th>
              <th>Hashrate increased</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item">
              <td>{{ index + 1 }}</td>
              <td>{{ item.friend }}</td>
              <td>{{ item.votes }}</td>
              <td>{{ item.hashrate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { PROMO_METABULL } from '@/web3/contract.constant'
import FBXMetaBullOnLineHelp from '@/web3/FBXMetaBullOnLineHelp'

export default {
  name: 'InviteRecordDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,

      data: [],
    }
  },
  methods: {
    show() {
      this.visible = true

      this._getData()
    },
    hide() {
      this.visible = false
    },

    onHide() {
      this.hide()
    },

    async _getData() {
      const contract = new FBXMetaBullOnLineHelp(PROMO_METABULL)
      this.data = await contract.getInvitersAndHelpNum()
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-invite-record {
  .main {
    padding: 0;
    width: 40rem;
    text-align: center;
    border: 0.05rem solid #ec68ff;
    @media (max-width: 768.89px) {
      width: 15rem;
    }
  }
}
</style>

