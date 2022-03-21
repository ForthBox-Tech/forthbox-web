<template>
  <div class="meta-bull-wrap">
    <div class="banner-wrap">
      <div class="banner">
        <div class="img-wrap"><img src="@/assets/page-promo/page-metabull/banner-text.png" /></div>
        <div class="vote-wrap">
          <div class="left bull-wrap">
            <div><img src="@/assets/bull/bull-comet-body-all.png" /></div>
            <Button
              class="vote-btn"
              :disabled="!info.bHelpNext"
              loader
              :handler="() => onVote(TEAM.A)"
            >
              {{ info.bHelpNext ? 'Vote' : timer }}
            </Button>
          </div>
          <div class="center">
            <div class="vote">
              <div class="block">
                <img src="@/assets/page-promo/page-metabull/vote-red.png" />
                {{ info.mAddr_HelpIth == 0 ? '???' : formatDigits(info.mSumHelpA) }}
              </div>
              <div class="block">
                <img src="@/assets/page-promo/page-metabull/vote-blue.png" />
                {{ info.mAddr_HelpIth == 0 ? '???' : formatDigits(info.mSumHelpB) }}
              </div>
            </div>
            <Button class="invite-btn" @click="onShow('shareDialog')">
              Invite your friends to vote >
            </Button>
          </div>
          <div class="right bull-wrap">
            <div><img src="@/assets/bull/bull-stellar-body-all.png" /></div>
            <Button
              class="vote-btn"
              :disabled="!info.bHelpNext"
              loader
              :handler="() => onVote(TEAM.B)"
            >
              {{ info.bHelpNext ? 'Vote' : timer }}
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-wrap">
      <div class="content">
        <div class="calendar-wrap">
          <div class="title">
            <div><img src="@/assets/page-promo/page-metabull/calendar.png" /> Rewards Calendar</div>
            <div class="tips">
              By voting, you can get a reward every day, vote for 10 consecutive days can get an S &
              M MetaBull NFT from the Planet series
            </div>
          </div>
          <ul class="calendar-list">
            <li v-for="(item, index) in PRIZES" :key="item">
              <div class="detail">
                <div class="img-wrap">
                  <img class="img" :src="item.image" />
                </div>
                <div class="name">{{ item.name }}</div>
              </div>
              <Button
                :class="['btn', item.status == '' ? 'default' : '']"
                :disabled="item.status == 'done'"
                loader
                :handler="() => item.status == 'wait' && onDraw(index)"
              >
                {{
                  (item.status == 'done' && 'Claimed') ||
                  (item.status == 'wait' && 'Claim') ||
                  (item.status == '' && `${item.condition} vote`)
                }}
              </Button>
            </li>
          </ul>
        </div>
        <div class="pool-wrap">
          <div class="pool-wrap-title">
            <div class="name">Estimated Prize Pools</div>
            <a class="intro" @click="onShow('aboutPoolDialog')">
              <img src="@/assets/page-promo/page-metabull/icon-intro.png" />
              About Prize Pools
            </a>
          </div>
          <div class="center">
            <div class="team team-a">
              <div class="vote">
                <img class="icon" src="@/assets/page-promo/page-metabull/vote-red-2.png" />
                <div class="num">
                  {{ info.mAddr_HelpIth == 0 ? '???' : formatDigits(info.mSumHelpA) }}
                </div>
              </div>
              <div class="pool">
                <div class="name">Team Nebula</div>
                <div class="prize">
                  {{ info.mAddr_HelpIth == 0 ? '???' : formatDigits(info.APool) }}
                </div>
              </div>
            </div>
            <div class="team team-b">
              <div class="vote">
                <img class="icon" src="@/assets/page-promo/page-metabull/vote-blue-2.png" />
                <div class="num">
                  {{ info.mAddr_HelpIth == 0 ? '???' : formatDigits(info.mSumHelpB) }}
                </div>
              </div>
              <div class="pool">
                <div class="name">Team Galaxy</div>
                <div class="prize">
                  {{ info.mAddr_HelpIth == 0 ? '???' : formatDigits(info.BPool) }}
                </div>
              </div>
            </div>
          </div>
          <div class="own-prize">
            <div class="block">
              <div class="name">My Hashrate</div>
              <div class="name">Estimated reward</div>
            </div>
            <div class="block">
              <div class="num">{{ formatDigits(info.mAddr_ScoreNum) }}</div>
              <div class="num">
                <img class="icon" src="@/assets/page-promo/page-metabull/forth-icon.png" />
                {{ formatDigits(info.mAddr_LastReward) }}
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <Button
              class="btn receive-btn"
              :disabled="
                !info.bEnd || parseFloat(info.mAddr_ScoreNum) <= 0 || info.mAddr_bGetLastReward
              "
              loader
              :handler="onClaim"
            >
              {{ info.mAddr_bGetLastReward ? 'Claimed' : 'Claim reward' }}
            </Button>
            <Button class="btn record-btn" @click="onShow('inviteRecordDialog')">
              My invitation record
            </Button>
          </div>
        </div>
        <div class="intro-wrap">
          <div class="title">Event Instruction</div>
          <p class="text">
            1. You cannot change to join the other team after selection, each wallet address can
            vote 1 time every 24 hours.
          </p>
          <p class="text">
            2. After voting successfully, you can receive the corresponding reward specified in the
            Reward Calendar.
          </p>
          <p class="text">3. Only if you vote will the votes from the friends you invited count.</p>
          <p class="text">
            4. Using the invitation link before your first vote is a valid invitation relationship
            between you and your inviter, however, it is an invalid one if you use it after your
            first vote. For example, if user B receives an invitation link from user A, if user B
            applies the link and proceeds with voting, both parties will get invitation rewards.
            Otherwise, there will be no rewards.
          </p>
          <p class="text">5. The rewards are claimable when the voting result is available.</p>
          <p class="text">
            6. You must claim your rewards within 3 days after the end of the voting event.
            Otherwise, these rewards will be expire and unavailable to be claimed.
          </p>
          <p class="text">
            7. The ForthBox platform reserves the right of final interpretation for the event.
          </p>
        </div>
      </div>
    </div>
  </div>
  <AboutPoolDialog ref="aboutPoolDialog"></AboutPoolDialog>
  <TeamConfirmDialog ref="teamConfirmDialog"></TeamConfirmDialog>
  <InviteRecordDialog ref="inviteRecordDialog"></InviteRecordDialog>
  <ShareDialog ref="shareDialog"></ShareDialog>
  <Countdown :force-visible="timerVisible"></Countdown>
</template>

<script>
import Button from '@/components/Button.vue'
import AboutPoolDialog from './metabull-modules/AboutPoolDialog.vue'
import TeamConfirmDialog from './metabull-modules/TeamConfirmDialog.vue'
import InviteRecordDialog from './metabull-modules/InviteRecordDialog.vue'
import ShareDialog from './metabull-modules/ShareDialog.vue'
import { PROMO_METABULL } from '@/web3/contract.constant'
import FBXMetaBullOnLineHelp from '@/web3/FBXMetaBullOnLineHelp'
import initTriggerMixin from '@/mixins/init-trigger'
import { createCountdown, formatDigits, formatWeb3Error } from '@/common/js/utils'
import Countdown from '@/modules/Countdown.vue'
import { isOpen } from '@/helpers/timer.helper'

const TEAM = {
  A: 1,
  B: 2,
}

const PRIZES = [
  {
    image: require('@/assets/page-promo/page-metabull/calendar-bull.png'),
    name: 'MetaBull NFT',
    condition: '1st',
    status: '', // done,wait
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '2nd',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '3rd',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '4th',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '5th',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '6th',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '7th',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '8th',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/claim-ntf.png'),
    name: '50 FBX',
    condition: '9th',
    status: '',
  },
  {
    image: require('@/assets/page-promo/page-metabull/calendar-bull.png'),
    name: 'MetaBull NFT',
    condition: '10th',
    status: '',
  },
]

export default {
  components: {
    Button,
    AboutPoolDialog,
    TeamConfirmDialog,
    InviteRecordDialog,
    ShareDialog,
    Countdown,
  },
  data() {
    return {
      TEAM,
      PRIZES,

      timer: '',

      info: {},

      timerVisible: !isOpen(),
    }
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    formatDigits,

    onShow(name) {
      this.$refs[name].show()
    },

    async onVote(team) {
      const info = this.info || {}
      if (info.mAddr_HelpIth == 0) {
        const isOk = await new Promise((resolve) => {
          this.$refs.teamConfirmDialog.show((isOk) => resolve(isOk))
        })
        if (!isOk) return
      }

      try {
        const inviter = this.$route.query.inviter || ''
        if (info.mAddr_HelpIth == 0 && inviter) {
          // 仅第一次助力时接受邀请
          await this._contract.calHelp_AddInviter(team, inviter)
        } else {
          await this._contract.calHelp(team)
        }
      } catch (err) {
        err = formatWeb3Error(err)
        this.$modal.toast(err.message)
        return
      }

      this.$modal.toast('Success')
      await this._getData()
    },

    async onDraw(index) {
      try {
        await this._contract.calHelpReward(index + 1)
      } catch (err) {
        err = formatWeb3Error(err)
        this.$modal.toast(err.message)
        return
      }

      this.$modal.toast('Success')
      await this._getData()
    },

    async onClaim() {
      try {
        await this._contract.calLastReward()
      } catch (err) {
        err = formatWeb3Error(err)
        this.$modal.toast(err.message)
        return
      }

      this.$modal.toast('Success')
      await this._getData()
    },

    async _getData() {
      const info = await this._contract.getParameters()
      console.log(info)
      this.info = info

      this.PRIZES.forEach((prize, index) => {
        const isDraw = info.mAddr_bGetReward[index] != 0 // 是否已领取
        const canDraw = info.mAddr_bHelp[index] != 0 // 是否能领取
        prize.status = (isDraw && 'done') || (canDraw && 'wait') || ''
      })

      const now = Date.now()
      const lastTime = info.mAddr_UpdataTime * 1000
      const leftTime = parseInt((now - lastTime) / 1000)
      const limit = 24 * 60 * 60
      this._timer?.stop?.()
      if (leftTime < limit) {
        this._timer = createCountdown(limit - leftTime, (time) => {
          this.timer = `${time[1]}:${time[2]}:${time[3]}`
        })
      }
    },
    async init() {
      this._contract = new FBXMetaBullOnLineHelp(PROMO_METABULL)
      this._getData()
    },
  },
  created() {},
  unmounted() {
    this._timer?.stop?.()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';
.meta-bull-wrap {
  color: #fff;
  .banner-wrap {
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
  .banner {
    min-width: 72rem;
    min-height: 35rem;
    width: 100%;
    background: url('~@/assets/page-promo/page-metabull/banner-bg.png') center center no-repeat;
    background-size: 100% 100%;
    .img-wrap {
      padding-top: 5rem;
      img {
        width: 32rem;
        @media (max-width: 768.89px) {
          width: 17.7rem;
        }
      }
    }
    .vote-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 768.89px) {
        flex-wrap: wrap;
      }
    }
    .bull-wrap {
      @media (max-width: 768.89px) {
        order: 2;
        margin-top: 2rem;
        &.left {
          margin-right: 1.5%;
        }
      }
      img {
        width: 14rem;
        @media (max-width: 768.89px) {
          width: 8rem;
        }
      }
      .vote-btn {
        box-sizing: border-box;
        width: 10rem;
        line-height: 2rem;
        font-size: 1rem;
        font-weight: bold;
        background-color: #03a9ff;
        border-radius: 2rem;
        @media (max-width: 768.89px) {
          width: 7.5rem;
          line-height: 1.5rem;
          font-size: 0.7rem;
        }
      }
    }
    .center {
      margin: 0 2rem;
      @media (max-width: 768.89px) {
        order: 1;
        width: 100%;
        margin: 0;
      }
      .vote {
        display: flex;
        width: 23.2rem;
        height: 6.5rem;
        background: url('~@/assets/page-promo/page-metabull/banner-vote.png') center center
          no-repeat;
        background-size: 100% 100%;
        @media (max-width: 768.89px) {
          width: 15rem;
          height: 4.5rem;
          margin: 1rem auto;
        }
      }
      .block {
        flex: 1;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 1.7rem;
        font-family: 'din-medium';
        @media (max-width: 768.89px) {
          margin-top: 1.2rem;
          font-size: 0.8rem;
        }
        img {
          width: 1rem;
          @media (max-width: 768.89px) {
            width: 0.8rem;
          }
        }
      }
      .invite-btn {
        box-sizing: border-box;
        margin: 2rem auto 0;
        width: 13rem;
        line-height: 2.5rem;
        font-size: 0.8rem;
        font-weight: bold;
        background: linear-gradient(90deg, #ffbd33 0%, #df01ff 100%);
        border-radius: 1.25rem;
        @media (max-width: 768.89px) {
          margin-top: 0;
          line-height: 2rem;
        }
      }
    }
  }
  .content {
    max-width: 55rem;
    margin: 0 auto;
    padding: 2rem 0 6rem;
    @media (max-width: 768.89px) {
      padding: 1.5rem 1rem 2.5rem;
    }
  }
  .bottom-wrap {
    background: url('~@/assets/page-promo/page-metabull/bottom-bg.png') center center no-repeat;
    background-size: 100% 100%;
    .title {
      font-size: 1rem;
      @media (max-width: 768.89px) {
        font-size: 0.8rem;
      }
    }
  }
  .calendar-wrap {
    margin-bottom: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 0.05rem solid #b844c0;
    @media (max-width: 768.89px) {
      margin-bottom: 0.7rem;
    }
    .title {
      display: flex;
      align-items: center;
      @media (max-width: 768.89px) {
        display: block;
        text-align: left;
      }
      img {
        width: 1.1em;
        margin-right: 0.5em;
        vertical-align: -0.2em;
      }
      .tips {
        margin-left: 0.5rem;
        color: #9e8fdc;
        font-size: 0.65rem;
        @media (max-width: 768.89px) {
          margin: 0.5rem 0 0;
        }
      }
    }
    .calendar-list {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 1;
        margin: 1rem 0.25rem 0;
        @media (max-width: 768.89px) {
          width: 31%;
          flex: initial;
          margin: 1.2rem 1% 0;
        }
      }
      .detail {
        width: 5rem;
        height: 5rem;
        margin: 0 auto;
        font-size: 0.7rem;
        background: linear-gradient(180deg, #2b1e82 0%, #bb45c1 100%);
        box-sizing: border-box;
        border-radius: 0.5rem;
        border: 0.05rem solid #ec68ff;
        .img-wrap {
          height: 3.6rem;
          line-height: 3.6rem;
          .img {
            max-width: 80%;
            max-height: 80%;
            vertical-align: middle;
          }
        }
      }
      .btn {
        box-sizing: border-box;
        margin: 0.5rem auto 0;
        padding: 0 0.5rem;
        width: 5rem;
        line-height: 1.5rem;
        font-size: 0.6rem;
        border-radius: 1.5rem;
        background-color: #eb3f3f;
        &.default {
          background-color: #362187;
          cursor: default;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  .pool-wrap-title {
    position: relative;
    @media (max-width: 768.89px) {
      position: absolute;
      top: -1.8rem;
      left: 0;
      width: 100%;
      font-size: 0.9rem;
      text-align: left;
    }
    .name {
      flex: 1;
    }
    .intro {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 0.7rem;
      color: #d6c0fe;
      cursor: pointer;
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
      }
      img {
        width: 1em;
        margin-right: 0.5em;
        vertical-align: -0.1em;
      }
    }
  }
  .pool-wrap {
    margin-bottom: 1.4rem;
    padding: 1rem 2.5rem 2rem;
    border-radius: 0.5rem;
    border: solid 0.05rem #ec68ff;
    background: linear-gradient(180deg, #2b1e82 0%, #bb45c1 100%);
    @media (max-width: 768.89px) {
      position: relative;
      margin-top: 2.6rem;
      padding: 0.7rem 0.5rem 0.7rem;
    }
    .center {
      display: flex;
      padding: 2rem 0;
      border-bottom: 0.05rem solid #b844c0;
      @media (max-width: 768.89px) {
        display: block;
        padding: 0 0 0.8rem;
      }
      .team {
        flex: 1;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 6rem;
        padding-top: 0.2rem;
        text-align: center;
        background: center center / 100% 100% no-repeat;
        @media (max-width: 768.89px) {
          padding-top: 0;
          height: 4rem;
        }
        &:not(:first-child) {
          margin-left: 4rem;
          @media (max-width: 768.89px) {
            margin-left: 0;
            margin-top: 0.5rem;
          }
        }
        &.team-a {
          background-image: url('~@/assets/page-promo/page-metabull/prize-bg-1.png');
        }
        &.team-b {
          background-image: url('~@/assets/page-promo/page-metabull/prize-bg-2.png');
        }
      }
      .vote {
        padding: 0.5rem 0.3rem;
        min-width: 5rem;
        border-right: 0.05rem solid rgba($color-white, 0.45);
        @media (max-width: 768.89px) {
          padding: 0.2rem 0.3rem;
          min-width: 4.5rem;
        }
        .icon {
          display: block;
          margin: 0 auto 0.6rem;
          width: 2rem;
          height: 2rem;
          @media (max-width: 768.89px) {
            margin-bottom: 0.2rem;
            width: 1.2rem;
            height: 1.2rem;
          }
        }
        .num {
          font-size: 0.7rem;
          font-family: 'din-medium';
        }
      }
      .pool {
        flex: 1;
        .name {
          font-size: 0.9rem;
          @media (max-width: 768.89px) {
            font-size: 0.7rem;
          }
        }
        .prize {
          line-height: 1.5;
          text-align: center;
          font-family: 'din-medium';
          font-size: 1.8rem;
          font-weight: bold;
          @media (max-width: 768.89px) {
            font-size: 0.9rem;
          }
          &::before {
            content: '';
            display: inline-block;
            margin-right: 0.3rem;
            width: 3rem;
            height: 3rem;
            background: url('~@/assets/page-promo/page-metabull/pool-ntf.png') center center / 150%
              no-repeat;
            vertical-align: -0.6rem;
            @media (max-width: 768.89px) {
              width: 1.5rem;
              height: 1.5rem;
              vertical-align: -0.3rem;
            }
          }
        }
      }
    }
    .own-prize {
      display: flex;
      padding: 0.5rem 0 2rem;
      font-size: 0.9rem;
      text-align: left;
      justify-content: center;
      @media (max-width: 768.89px) {
        padding-bottom: 1.1rem;
        font-size: 0.65rem;
      }
      .block {
        &:not(:last-child) {
          margin-right: 1rem;
        }
        .icon {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-120%, -50%);
          width: 1rem;
          margin-right: 0.3rem;
          vertical-align: middle;
          @media (max-width: 768.89px) {
            width: 0.75rem;
          }
        }
        .num {
          position: relative;
          margin-left: 2rem;
        }
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: center;
      .btn {
        box-sizing: border-box;
        margin: 0 1rem;
        padding: 0.5rem 0.5rem;
        width: 11.5rem;
        line-height: 1.2;
        text-align: center;
        font-size: 0.9rem;
        border-radius: 1.25rem;
        @media (max-width: 768.89px) {
          margin: 0 0.25rem;
          padding: 0.4rem 0.25rem;
          font-size: 0.65rem;
        }
      }
      .receive-btn {
        background: linear-gradient(90deg, #03a9ff 0%, #df01ff 100%);
      }
      .record-btn {
        border: 0.05rem solid #fff;
      }
    }
  }
  .intro-wrap {
    padding-top: 1rem;
    border-top: solid 0.05rem #b844c0;
    text-align: left;
    .title {
      margin-bottom: 0.3em;
      line-height: 2;
      font-weight: bold;
    }
    .text {
      margin-bottom: 0.5em;
      font-size: 0.8rem;
      line-height: 1.5;
      color: #d9cfff;
      @media (max-width: 768.89px) {
        font-size: 0.6rem;
      }
    }
  }
}
</style>
