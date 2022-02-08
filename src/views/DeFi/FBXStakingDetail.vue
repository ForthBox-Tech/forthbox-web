<template>
  <div class="fbx-staking-detail-page" v-bind="$attrs">
    <div class="detail-main">
      <DetailImage
        class="cover"
        :image="require('@/assets/page-defi/forthbox-big.png')"
      ></DetailImage>
      <DetailBoard class="info" :name="contract.name">
        <div class="detail-tips">{{ $t('DeFi.Earn') }} FBX</div>
        <div class="detail-box">
          <div class="overview">
            <div>
              {{ $t('DeFi.Total: ') }}{{ defiInfo.totalNum }}
              |
              {{ $t('DeFi.Last: ') }}{{ lastNum }}
            </div>
            <div class="balance">{{ $t('DeFi.Balance: ') }}{{ balance }}</div>
          </div>
          <input class="amount" v-model="contract.amount" />
          <div class="lock-time">
            {{ $t('DeFi.Lock-up period') }}:
            {{ $t('DeFi.Duration', { time: contract.duration }) }}
          </div>
          <div class="btn-wrap">
            <Button
              v-if="approveOrStake == approveStatus"
              :disabled="lastNum <= 10000.0"
              loader
              :handler="onApprove"
            >
              {{ $t('DeFi.Approve') }}
            </Button>
            <Button
              v-if="approveOrStake == stakeStatus"
              :disabled="lastNum <= 10000.0"
              loader
              :handler="onStake"
            >
              {{ $t('DeFi.Staking') }}
            </Button>
            <Button
              :disabled="approveOrStake == approveStatus || stakeList.length == 0"
              loader
              :handler="onShowRedeemDetail"
            >
              {{ $t('DeFi.Redeem') }}
            </Button>
          </div>
        </div>
      </DetailBoard>
    </div>
    <div class="dashboard">
      <div class="data-wrap">
        <div class="block">
          <div class="value">
            <span class="blue">{{ contract.duration }}</span>
            <small class="small">Days</small>
          </div>
          <div>{{ $t('DeFi.Lock-up period') }}</div>
        </div>
        <div class="block">
          <div class="value pink">{{ defiInfo.fullBackPro }}%</div>
          <div>APR</div>
        </div>
        <div class="block">
          <div class="value purple">{{ contract.totalNum }}</div>
          <div>{{ $t('DeFi.Total amount') }}</div>
        </div>
        <div class="block">
          <div class="value blue2">
            {{ defiInfo.halfBackPro ? defiInfo.halfBackPro + '%' : '--' }}
          </div>
          <div>{{ $t('DeFi.Unstaking Yield') }}</div>
        </div>
      </div>
      <div class="gift-wrap">
        <img class="gift" src="https://static.forthbox.io/image/nft/ham-fantasy/Missile.png" />
        <div class="text">
          {{ (contract.AdditionalReward && contract.AdditionalReward.text) || '--' }}
        </div>
      </div>
    </div>
    <div class="detail-note">
      <div class="title">{{ $t('DeFi.Notes') }}</div>
      <ul class="content">
        <li v-for="text in contract.texts" :key="text">
          {{ $t(text) }}
        </li>
      </ul>
    </div>
  </div>

  <Dialog class="dialog dialog-redeem" :visible="visibleRedeemAdvance" @hide="onHideRedeemAdvance">
    <main class="main">
      <a class="close" @click="onHideRedeemAdvance"></a>
      <div class="content">
        <div>{{ $t('DeFi.Unstaking') }}</div>
        <img class="img-warn" src="@/assets/page-defi/warn.png" />
        <div class="red">
          {{ $t('DeFi.The staking is not expired yet') }}
          {{ defiInfo.halfBackPro }}%
        </div>
        <div class="data-wrap">{{ $t('DeFi.principle reward') }}</div>
        <div class="data-wrap margin-top-ctl">
          <img src="@/assets/page-defi/logo.png" />{{
            parseFloat(
              parseFloat(stakeList[redeemKey].StakeAmount) +
                parseFloat(stakeList[redeemKey].profitHalf)
            ).toFixed(2)
          }}
        </div>
        <div class="btn-wrap">
          <Button :handler="onHideRedeemAdvance">
            {{ $t('DeFi.Return') }}
          </Button>
          <Button loader :handler="onHalfRedeem" class="confirm-btn">
            {{ $t('DeFi.Confirm and redeem') }}
          </Button>
        </div>
      </div>
    </main>
  </Dialog>

  <Dialog class="dialog dialog-redeem" :visible="visibleRedeem" @hide="onHideRedeem">
    <main class="main">
      <a class="close" @click="onHideRedeem"></a>
      <div class="content">
        <div class="title">{{ $t('DeFi.Redeem') }}</div>
        <div>
          {{ $t('DeFi.TheStakingIsExpired') }}
        </div>
        <div class="data-wrap">
          <img src="@/assets/page-defi/logo.png" />{{
            parseFloat(
              parseFloat(stakeList[redeemKey].StakeAmount) + parseFloat(stakeList[redeemKey].profit)
            ).toFixed(2)
          }}
        </div>
        <div class="btn-wrap">
          <Button :handler="onHideRedeem"> {{ $t('DeFi.Return') }} </Button>
          <Button loader :handler="onRedeem" class="confirm-btn">
            {{ $t('DeFi.Confirm and redeem') }}
          </Button>
        </div>
      </div>
    </main>
  </Dialog>

  <Dialog
    class="dialog dialog-redeem-detail"
    :visible="visibleRedeemDetail"
    @hide="onHideRedeemDetail"
  >
    <main class="main">
      <div class="title">{{ $t('DeFi.Staking records') }}</div>
      <a class="close" @click="onHideRedeemDetail"></a>
      <div class="content-block">
        <table>
          <thead>
            <th>{{ $t('DeFi.Staked amount') }}</th>
            <th>{{ $t('DeFi.Staking date') }}</th>
            <th>{{ $t('DeFi.Expiring date') }}</th>
            <th>{{ $t('DeFi.Estimated earning') }}</th>
            <th>{{ $t('DeFi.Action') }}</th>
          </thead>
          <tbody>
            <tr v-for="(stake, key) in stakeList" :key="key">
              <td>
                <img src="@/assets/page-defi/logo.png" />{{
                  parseFloat(stake.StakeAmount).toFixed(2)
                }}
              </td>
              <td>{{ showDateTime(stake.startTime) }}</td>
              <td>{{ showDateTime(stake.endTime) }}</td>
              <td>
                <img src="@/assets/page-defi/logo.png" />{{
                  parseFloat(parseFloat(stake.profit) + parseFloat(stake.StakeAmount)).toFixed(2)
                }}
              </td>
              <td>
                <Button v-if="redeemStatus(key) == 4" class="redeem-btn disabled">
                  {{ $t('DeFi.Redeemed') }}
                </Button>
                <Button
                  v-if="redeemStatus(key) == 1"
                  :handler="() => onShowRedeem(key)"
                  class="redeem-btn"
                >
                  {{ $t('DeFi.Redeem') }}
                </Button>
                <Button v-if="redeemStatus(key) == 2" class="redeem-btn disabled">
                  {{ $t('DeFi.Not expired yet') }}
                </Button>
                <Button
                  v-if="redeemStatus(key) == 3"
                  :handler="() => onShowRedeemAdvance(key)"
                  class="redeem-btn"
                >
                  {{ $t('DeFi.Redeem in advance') }}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'
import DetailImage from '@/views/Market2/components/DetailImage.vue'
import DetailBoard from '@/views/Market2/components/DetailBoard.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { STAKING } from '@/models/single-defi.model'
import ERC20 from '@/web3/ERC20'
import ERC20LockDefi from '@/web3/ERC20LockDefi'

export default {
  name: 'FBXStakingDetail',
  components: {
    Button,
    Dialog,
    DetailImage,
    DetailBoard,
  },
  data() {
    return {
      approveStatus: 'approve',
      stakeStatus: 'stake',
      approveOrStake: 'approve',

      rewardText: this.$t('DeFi.Redeem'),

      balance: 0.0,

      contract: {},
      stakeList: [],
      redeemKey: -1,

      lastNum: 0,
      tokenContract: null,
      defiContract: null,
      defiInfo: {
        fullBackPro: 0,
        halfBackPro: 0,
      },
      visibleRedeemAdvance: false,
      visibleRedeem: false,
      visibleRedeemDetail: false,
    }
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    showDateTime(timestamp) {
      timestamp = timestamp * 1000
      let date
      if (timestamp == 0) {
        date = new Date()
      } else {
        date = new Date(timestamp)
      }
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return Y + M + D + h + m
    },
    onShowRedeemAdvance(key) {
      this.redeemKey = key
      this.visibleRedeemAdvance = true
    },
    onHideRedeemAdvance() {
      this.redeemKey = -1
      this.visibleRedeemAdvance = false
    },
    onShowRedeem(key) {
      this.redeemKey = key
      this.visibleRedeem = true
    },
    onHideRedeem() {
      this.redeemKey = -1
      this.visibleRedeem = false
    },
    async onShowRedeemDetail() {
      await this.getStakeList()
      this.visibleRedeemDetail = true
    },
    onHideRedeemDetail() {
      this.visibleRedeemDetail = false
    },
    // 获取质押记录并展示列表
    async getStakeList() {
      this.stakeList = await this.defiContract.getStakeData()
      console.log(this.stakeList)
    },
    // 时间计算
    redeemStatus(key) {
      const nowTime = Date.now()
      // 1-赎回;2-未到期;3-提前赎回;4-已经赎回
      if (this.stakeList[key].bExit == 1) {
        return 4
      }
      if (nowTime - this.stakeList[key].endHalfTime * 1000 < 0) {
        return 2
      }
      if (nowTime - this.stakeList[key].endTime * 1000 >= 0) {
        return 1
      }
      return 3
    },
    // 赎回
    async onRedeem() {
      try {
        await this.defiContract.exit(this.redeemKey)
        await this.getStakeList()
        await this.getDefiInfo()
        await this.getBalance()
      } catch (err) {
        console.error(err)
        alert('Failed')
      }
      this.onHideRedeem()
      this.redeemKey = -1
    },
    // 提前赎回
    async onHalfRedeem() {
      try {
        await this.defiContract.exitHalf(this.redeemKey)
        await this.getStakeList()
        await this.getDefiInfo()
        await this.getBalance()
      } catch (err) {
        console.error(err)
        alert('Failed')
      }
      this.onHideRedeemAdvance()
      this.redeemKey = -1
    },
    // 获取fbx余额
    async getBalance() {
      let balance = 0
      try {
        balance = await this.tokenContract.balanceof()
      } catch (err) {
        console.warn(err)
      }
      this.balance = parseFloat(balance).toFixed(2)
    },
    // 获取授权状态
    async getApprove() {
      let result = 0
      try {
        result = await this.tokenContract.allowance(
          cWebModel.mAccount,
          this.defiContract._contractAddress
        )
      } catch (err) {
        console.warn(err)
      }
      this.approveOrStake = parseInt(result) > 10000 ? this.stakeStatus : this.approveStatus
    },
    // 授权
    async onApprove() {
      if (this.approveOrStake == this.stakeStatus) {
        return
      }
      try {
        await this.tokenContract.approve(this.defiContract._contractAddress, 10000000)
        this.approveOrStake = this.stakeStatus
        await this.getStakeList()
      } catch {
        this.approveOrStake = this.approveStatus
      }
    },
    // 质押
    async onStake() {
      if (this.approveOrStake == this.approveStatus) {
        return
      }
      if (this.lastNum <= 10000.0) {
        alert('sold out')
        return
      }
      if (this.defiInfo === null) {
        return
      }
      this.contract.amount = parseFloat(this.contract.amount)
      if (this.contract.amount < 10000.0) {
        alert('Failed')
      }
      try {
        await this.defiContract.stake(this.contract.amount)
        await this.getDefiInfo()
        await this.getStakeList()
        await this.getBalance()
        alert('Success')
      } catch (err) {
        console.error(err)
        alert('Failed')
      }
    },
    //获取质押信息
    async getDefiInfo() {
      try {
        const defiInfo = await this.defiContract.getParameters()
        if (['fbx90_2', 'fbx90'].indexOf(this.$route.query.id) > -1) {
          defiInfo.halfBackPro = 0
        }
        this.defiInfo = defiInfo
        console.log(defiInfo)

