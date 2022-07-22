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

        const lastNum = parseFloat(defiInfo.totalNum) - (parseFloat(defiInfo.alreadyStakeNum) || 0)
        this.lastNum = lastNum.toFixed(2)
      } catch (err) {
        console.warn(err)
      }
    },
    // 初始化
    init() {
      try {
        const contract = STAKING[this.$route.query.id]
        const additionalReward = contract.AdditionalReward
        additionalReward.text = additionalReward.template
          ? this.$t(additionalReward.template, additionalReward.params)
          : '--'
        this.contract = contract || {}
        this.tokenContract = new ERC20(contract.token)
        this.defiContract = new ERC20LockDefi(contract.defi)

        this.getApprove()
        this.getBalance()
        this.getDefiInfo()
        this.getStakeList()
      } catch (err) {
        console.warn(err)
      }
    },
    _stopTimer() {
      this._timer && this._timer.stop && this._timer.stop()
    },
  },
  unmounted() {
    this._stopTimer()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.fbx-staking-detail-page {
  margin-top: 2rem;
  @media (max-width: 768.89px) {
    margin-top: 1rem;
  }
  .dashboard {
    display: flex;
    align-items: center;
    margin-top: 1.6rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    @media (max-width: 768.89px) {
      display: block;
      margin-top: 1rem;
      background-color: $color-placeholder6;
    }
  }
  .data-wrap {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 768.89px) {
      padding: 1rem 0 0.3rem;
    }

    .block {
      flex: 1;
      padding: 0 0.5rem;
      font-size: 0.7rem;
      color: $color-secondary;
      @media (max-width: 768.89px) {
        margin-bottom: 0.7rem;
        min-width: 40%;
        text-align: center;
        font-size: 0.6rem;
      }
      .value {
        font-size: 1.86em;
        font-weight: bold;
        .small {
          margin-left: 0.5em;
          font-size: 0.54em;
          font-weight: normal;
        }
      }
      .blue2 {
        color: #5d64ff;
      }
      .pink {
        color: #df01ff;
      }
      .purple {
        color: $color-purple;
      }
      .blue {
        color: $color-blue;
      }
    }
  }
  .gift-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    padding: 0.5rem 2rem;
    background-color: #fbfdff;
    border: 0.05rem solid #f4f5f7;
    border-radius: 0.4rem;
    @media (max-width: 768.89px) {
      width: auto;
      padding: 0.5rem 1rem;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .gift {
      width: 4rem;
      @media (max-width: 768.89px) {
        width: 3rem;
      }
    }
    .text {
      color: $color-blue;
      font-size: 0.8rem;
      @media (max-width: 768.89px) {
        margin-left: 0.8rem;
        font-size: 0.6rem;
      }
    }
  }
}
.dialog-redeem {
  z-index: 1001;
  font-size: 0.85rem;
  .main {
    position: relative;
    padding: 1.3rem 1.5rem 1.8rem;
    background-color: $color-white;
    border-radius: 0.5rem;
    border: 0.05rem solid $color-border;
    text-align: center;
    @media (max-width: 768.89px) {
      max-width: 15rem;
      padding: 1rem;
    }
  }
  .close {
    position: absolute;
    right: 0.8rem;
    top: 0.8rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url('~@/assets/common/close.png') center center / 70% no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      right: 0.5rem;
      top: 0.5rem;
    }
  }
  .content {
    padding: 0 2.1rem;
    @media (max-width: 768.89px) {
      padding: 0 0.8rem;
    }
    .title {
      margin-bottom: 1.8rem;
    }
  }
  .img-warn {
    width: 1.3rem;
    margin: 0.8rem 0;
  }
  .red {
    color: #ff6363;
  }
  .data-wrap {
    margin-top: 0.8rem;
    img {
      width: 0.8rem;
      margin-right: 0.42rem;
    }
  }
  .btn-wrap {
    margin-top: 1.5rem;
    .fbx-btn {
      box-sizing: border-box;
      line-height: 2rem;
      color: #efb35c;
      border: 0.05rem solid #efb35c;
      border-radius: 2rem;
      @media (max-width: 768.89px) {
        padding: 0 0.8rem;
        line-height: 1.6rem;
        font-size: 0.65rem;
      }
    }
    .confirm-btn {
      margin-left: 0.6rem;
      color: $color-white;
      background-color: #efb35c;
    }
  }
}
.dialog-redeem-detail {
  font-size: 0.8rem;
  .main {
    position: relative;
    padding: 1.3rem 1.5rem 1.8rem;
    background-color: $color-white;
    border-radius: 0.5rem;
    border: 0.05rem solid $color-border;
    @media (max-width: 768.89px) {
      max-width: 15rem;
      padding: 1rem;
    }
  }
  .close {
    position: absolute;
    right: 0.8rem;
    top: 0.8rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url('~@/assets/common/close.png') center center / 70% no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      right: 0.5rem;
      top: 0.5rem;
    }
  }
  .title {
    font-size: 0.9rem;
    text-align: left;
    padding-bottom: 1rem;
    @media (max-width: 768.89px) {
      font-size: 0.7rem;
      padding-bottom: 0.5rem;
    }
  }
  .content-block {
    border-radius: 0.35rem;
    overflow-y: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 0.35rem;
    tr:nth-child(2n + 1) {
      td {
        background-color: $color-placeholder;
      }
    }
    th,
    td {
      padding: 0.65rem;
      white-space: nowrap;
      @media (max-width: 768.89px) {
        font-size: 0.4rem;
        padding: 0.4rem;
      }
      img {
        width: 0.7rem;
        margin-right: 0.2rem;
        vertical-align: middle;
      }
      .redeem-btn {
        line-height: 1.5rem;
        font-size: 0.65rem;
        color: #25262f;
        background-color: #efb35c;
        border-radius: 0.8rem;
        box-sizing: border-box;
        @media (max-width: 768.89px) {
          width: 4rem;
          line-height: 1.2rem;
          font-size: 0.6rem;
        }
      }
    }
  }
}
</style>

