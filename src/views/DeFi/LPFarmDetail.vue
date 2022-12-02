<template>
  <div class="lpfarm-detail-page">
    <div class="dashboard">
      <div class="col subject">
        <div>
          <img class="logo" v-for="image in contract.images" :key="image" :src="image" />
        </div>
        <div class="name">{{ contract.pair || '' }}</div>
        <div class="intro">{{ $t('DeFi.Stake LP to farm FBX') }}</div>
      </div>
      <div class="col info">
        <table class="table">
          <tr>
            <td>{{ $t('DeFi.APR') }}</td>
            <td class="value rate">{{ rate }}</td>
          </tr>
          <tr>
            <td>{{ $t('DeFi.TotalFBXRewardsClaimed') }}</td>
            <td class="value">{{ totalEarn }}</td>
          </tr>
          <tr>
            <td>{{ $t('DeFi.TotalStakedLps') }}</td>
            <td class="value">{{ totalStake }}</td>
          </tr>
          <tr>
            <td>{{ $t('DeFi.TimeRemaining') }}</td>
            <td class="value">{{ $t('DeFi.Duration', { time: contract.time }) }}</td>
          </tr>
          <tr>
            <td>{{ $t('DeFi.LockUpTime') }}</td>
            <td class="value">{{ lockUpTime }}</td>
          </tr>
          <tr>
            <td>{{ $t('DeFi.RewardPool') }}</td>
            <td class="value">{{ contract.amount || 0 }}</td>
          </tr>
          <tr>
            <td>{{ $t('DeFi.YourStakedLP') }}</td>
            <td class="value">{{ redeemNum }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="operate">
      <div class="col">
        <div class="overview">
          <div class="data">
            <div class="label">{{ $t('DeFi.Earn') }}</div>
            <div class="value">{{ ownEarn }} FBX</div>
          </div>
          <Button class="btn-claim" loader :handler="onGetReward">
            {{ $t('DeFi.Claim Rewards') }}
          </Button>
        </div>
        <div class="input-wrap">
          <input placeholder="Enter quantity" v-model="redeemNum" />
          <a class="btn-all" @click="onRedeemAll">All</a>
        </div>
        <Button class="btn-redeem" loader :handler="onRedeem">
          {{ $t('DeFi.Redeem') }}
        </Button>
      </div>
      <div class="line"></div>
      <div class="col">
        <div class="overview">
          <div class="data">
            <div class="label">{{ $t('DeFi.Balance') }}</div>
            <div class="value">{{ balance }} LPs</div>
          </div>
        </div>
        <div class="input-wrap">
          <input placeholder="Enter quantity" v-model="stakeNum" />
          <a class="btn-all" @click="onStakeAll">All</a>
        </div>
        <Button class="btn-stake" :disabled="contract.isEnd" loader :handler="onStake">
          {{ $t('DeFi.Stake') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { LPFARM } from '@/models/defi.model'
import ERC20 from '@/web3/ERC20'
import ERC20DeFi from '@/web3/ERC20Defi'

async function getLpPrice(lpContractAdress) {
  const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'))
  const abi = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'LP',
          type: 'address',
        },
      ],
      name: 'calLpInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'total0',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'total1',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'totalLp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]
  const calLpPriceContract = '0x3D79b1A814d98439D8c1DfE4e1F521781774226f'
  const contract = new web3.eth.Contract(abi, calLpPriceContract)

  const re = await contract.methods.calLpInfo(lpContractAdress).call()

  const tTotal0 = web3.utils.fromWei(re.total0, 'ether')
  const tTotal1 = web3.utils.fromWei(re.total1, 'ether')
  const tTotalLp = web3.utils.fromWei(re.totalLp, 'ether')

  const lpPrice = (tTotal0 * 2) / tTotalLp
  const tokenPrice = tTotal0 / tTotal1

  console.log('total0', tTotal0, 'total1', tTotal1, 'totalLp', tTotalLp)

  return { lpPrice, tokenPrice }
}

async function calcAprFbxLp(mounthFbx, totalStakeLp) {
  var lp_U_FbxAdress = '0x9f07679ea7011da476ed03968558742e518bca38'
  var re = await getLpPrice(lp_U_FbxAdress)
  console.log(re)
  var lpPrice = re.lpPrice
  var fbxPrice = re.tokenPrice
  var apr = (mounthFbx * fbxPrice * 12) / totalStakeLp / lpPrice
  console.log('----6666', lpPrice, fbxPrice, mounthFbx * fbxPrice, totalStakeLp)
  return apr
}
async function calcAprForthLp(mounthFbx, totalStakeLp) {
  var lp_U_FbxAdress = '0x9f07679ea7011da476ed03968558742e518bca38'
  var lp_U_ForthAdress = '0x32fe33c9A503937464473c537f8adafa5708d1D6'
  var re = await getLpPrice(lp_U_FbxAdress)
  var re2 = await getLpPrice(lp_U_ForthAdress)

  var lpPrice = re2.lpPrice
  var fbxPrice = re.tokenPrice

  var apr = (mounthFbx * fbxPrice * 12) / totalStakeLp / lpPrice
  return apr
}

export default {
  components: {
    Button,
  },
  data() {
    return {
      tokenContract: null,
      defiContract: null,

      balance: 0.0,

      isApproved: false,

      contract: {},
      stakeNum: 0,
      detailInfo: null,
      totalEarn: 0.0,
      totalStake: 0.0,
      ownEarn: 0.0,
      redeemNum: 0,
      lockUpTime: '',
      rate: '0%',
      amount: 0,
    }
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    onRedeemAll() {
      this.redeemNum = this.detailInfo.balances
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
      this.isApproved = parseInt(result) > 1000
    },
    //获取balance余额
    async getBalance() {
      let balance = 0
      try {
        balance = await this.tokenContract.balanceof()
      } catch (err) {
        console.warn(err)
      }
      this.balance = Math.floor(balance * 100) / 100
    },
    //获取质押信息
    async getDetailInfo() {
      try {
        this.detailInfo = await this.defiContract.getParameters()
        console.log('defiContract.getParameters', this.detailInfo)
        this.totalEarn = parseFloat(this.detailInfo.totalRewardAlready).toFixed(2)
        this.totalStake = parseFloat(this.detailInfo.totalSupply)
        this.ownEarn = parseFloat(this.detailInfo.earned).toFixed(4)
        this.redeemNum = this.detailInfo.balances
        this.calRate()
      } catch (err) {
        console.error(err)
      }
    },
    onStakeAll() {
      this.stakeNum = this.balance
    },
    async onStake() {
      try {
        if (!this.isApproved) {
          await this.approve()
        }
        await this.stake()
        await this.getBalance()
        await this.getDetailInfo()
      } catch (err) {
        alert('deposit failed')
        console.error(err)
      }
    },
    // 授权
    async approve() {
      if (this.isApproved) return
      try {
        await this.tokenContract.approve(this.defiContract._contractAddress, 10000000)
        this.isApproved = true
      } catch (err) {
        alert('approve failed')
        this.isApproved = false
      }
    },
    // 质押
    async stake() {
      if (this.stakeNum <= 0) {
        alert('number smaller than zero')
        return
      }
      let regPos = /^[0-9]+.?[0-9]*/
      if (!regPos.test(this.stakeNum)) {
        alert('no a number')
        console.error('no a number')
        return
      }
      try {
        await this.defiContract.stake(parseFloat(this.stakeNum).toFixed(2))
      } catch (err) {
        alert('stake failed')
      }
    },
    //赎回
    async onRedeem() {
      let regPos = /^[0-9]+.?[0-9]*/
      if (!regPos.test(this.redeemNum)) {
        console.error('no a number')
        return
      }
      try {
        await this.defiContract.withdraw(parseFloat(this.redeemNum).toFixed(4))
        await this.getBalance()
        await this.getDetailInfo()
      } catch (err) {
        alert('redeem failed')
      }
    },
    //获取奖励
    async onGetReward() {
      try {
        await this.defiContract.getReward()
        await this.getDetailInfo()
      } catch (err) {
        alert('get reward failed')
      }
    },
    async calRate() {
      let investLp = 0
      if (this._lpId == 'fbxusdt') {
        investLp = await calcAprFbxLp(this.amount, this.totalStake)
      } else {
        investLp = await calcAprForthLp(this.amount, this.totalStake)
      }
      this.rate = parseFloat(investLp * 100).toFixed(2) + '%'
    },
    //初始化
    init() {
      this._lpId = this.$route.query.id

      try {
        const contract = LPFARM[this._lpId]
        const tokenNet = contract.token
        const defiNet = contract.defi
        this.contract = contract

        this.lockUpTime = this.$t(contract.lockUpTime)
        this.amount = contract.amountNum

        this.tokenContract = new ERC20(tokenNet)
        this.defiContract = new ERC20DeFi(defiNet)

        this.getApprove()
        this.getBalance()
        this.getDetailInfo()
      } catch (err) {
        console.warn(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.lpfarm-detail-page {
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  background-color: $color-white;
  @media (max-width: 768.89px) {
    margin: 1rem 0.5rem;
    padding: 1.2rem 0.7rem;
  }
  .dashboard {
    margin: 1.2rem 0 4rem;
    display: flex;
    align-items: center;
    @media (max-width: 768.89px) {
      margin: 1rem 0 1.5rem;
      display: block;
    }
    .col {
      flex: 1;
    }
  }
  .subject {
    text-align: center;
    .logo {
      display: inline-block;
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
      overflow: hidden;
      @media (max-width: 768.89px) {
        width: 3rem;
        height: 3rem;
      }
      &:not(:first-child) {
        margin-left: -1rem;
        @media (max-width: 768.89px) {
          margin-left: -0.5rem;
        }
      }
    }
    .name {
      margin-top: 1rem;
      text-align: center;
      font-size: 1rem;
      font-weight: bold;
      @media (max-width: 768.89px) {
        margin-top: 0.5rem;
        font-size: 0.75rem;
      }
    }
    .intro {
      font-size: 0.9rem;
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
      }
    }
  }
  .info {
    font-size: 0.8rem;
    font-weight: bold;
    color: $color-secondary;
    @media (max-width: 768.89px) {
      margin-top: 0.8rem;
      font-size: 0.65rem;
    }
    .table {
      @media (max-width: 768.89px) {
        margin: 0 auto;
      }
    }
    td {
      line-height: 1.7;
      @media (max-width: 768.89px) {
        line-height: 1.6;
      }
      &.value {
        padding-left: 5rem;
        color: $color-primary;
        @media (max-width: 768.89px) {
          padding-left: 1rem;
        }
      }
      &.rate {
        font-size: 1.25em;
        color: #efb35c;
      }
    }
  }
  .operate {
    display: flex;
    @media (max-width: 768.89px) {
      display: block;
    }
    .col {
      flex: 1;
    }
    .line {
      margin: 0 2.5rem;
      width: 0.05rem;
      background-color: $color-border;
      @media (max-width: 768.89px) {
        margin: 1.5rem 0;
        width: 0;
        height: 0;
      }
    }
    .overview {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      font-weight: bold;
      @media (max-width: 768.89px) {
        font-size: 0.7rem;
      }
      .data {
        flex: 1;
      }
      .label {
        color: $color-secondary;
      }
      .btn-claim {
        @include btn-fill-pure($color-blue);
        width: 7rem;
        font-size: 0.9em;
        line-height: 2rem;
        border-radius: 2rem;
        @media (max-width: 768.89px) {
          width: 5rem;
          line-height: 1.8rem;
          border-radius: 2rem;
        }
      }
    }
    .input-wrap {
      display: flex;
      align-items: center;
      margin: 1.2rem 0 1.5rem;
      font-size: 0.8rem;
      background-color: $color-placeholder;
      border: 0.05rem solid $color-border;
      border-radius: 0.5rem;
      @media (max-width: 768.89px) {
        margin: 0.5rem 0 0.8rem;
        font-size: 0.7rem;
      }
      input {
        flex: 1;
        padding: 0.5rem 1rem;
        width: 0.3rem;
        line-height: 1.6;
        font-size: 1.125em;
        background-color: transparent;
        border: 0 none;
        outline: none;
        @media (max-width: 768.89px) {
          width: 0.3rem;
        }
      }
      .btn-all {
        padding: 0 1.5rem;
        line-height: 1.6;
        color: inherit;
        font-size: inherit;
        border-left: 0.05rem solid $color-border;
        cursor: pointer;
      }
    }
    .btn-stake,
    .btn-redeem {
      @include btn-fill-color();
      width: 100%;
      line-height: 2.7rem;
      font-size: 0.8rem;
      font-weight: bold;
      box-sizing: border-box;
      @media (max-width: 768.89px) {
        line-height: 2.2rem;
        font-size: 0.7rem;
      }
    }
  }
}
</style>
