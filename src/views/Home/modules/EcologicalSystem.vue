<template>
  <section class="section forthbox-ecosystem m-mb-2">
    <header class="header">
      <h1 class="title">{{ $t('Home.EcologicalSystem.ForthBoxEcologicalSystem') }}</h1>
      <div class="title-content">{{ $t('Home.EcologicalSystem.ForthBoxEcologicalSystem') }}</div>
    </header>
    <main class="main pc-layout-flex m-px-1">
      <ul class="wrap-left m-w-auto m-mr-0">
        <li
          :class="ecosystem == ECOSYSTEM.ABOUT ? 'active' : ''"
          @click="onSwitchEcosystem(ECOSYSTEM.ABOUT)"
        >
          {{ $t('Home.EcologicalSystem.AboutForthBox') }}
        </li>
        <li
          :class="ecosystem == ECOSYSTEM.TEAM ? 'active' : ''"
          @click="onSwitchEcosystem(ECOSYSTEM.TEAM)"
        >
          {{ $t('Home.EcologicalSystem.TheTeam') }}
        </li>
        <li
          :class="ecosystem == ECOSYSTEM.TOKEN ? 'active' : ''"
          @click="onSwitchEcosystem(ECOSYSTEM.TOKEN)"
        >
          {{ $t('Home.EcologicalSystem.Tokenomics') }}
        </li>
        <li
          :class="ecosystem == ECOSYSTEM.ROADMAP ? 'active' : ''"
          @click="onSwitchEcosystem(ECOSYSTEM.ROADMAP)"
        >
          {{ $t('Home.EcologicalSystem.Roadmap') }}
        </li>
      </ul>
      <div class="wrap-right m-w-auto m-mt-1">
        <section class="panel-about" v-if="ecosystem == ECOSYSTEM.ABOUT">
          <div class="inner">
            <video controls style="width: 100%; height: 100%">
              <source
                preload="none"
                poster="@/assets/common/logo.png"
                src="https://static.forthbox.io/video/forthbox-2022-01.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </section>
        <section class="panel-team" v-if="ecosystem == ECOSYSTEM.TEAM">
          <p class="text">
            {{ $t('Home.Team.Introduce') }}
          </p>
          <img class="img" src="@/assets/home/ecosystem-team-img.png" />
        </section>
        <section class="panel-token" v-if="ecosystem == ECOSYSTEM.TOKEN">
          <div class="token-title">
            {{ $t('Home.Tokenomics.Tokenomics') }}
            <img src="@/assets/home/ecosystem-token-1.png" />
          </div>
          <div class="token-text">
            {{ $t('Home.Tokenomics.AutonomyAndCredibility') }}
          </div>
          <div class="token-block token-table">
            <div class="table-title">{{ $t('Home.Tokenomics.TokenInfo') }}</div>
            <table class="table-info">
              <tr>
                <th>{{ $t('Home.Tokenomics.Info') }}</th>
                <th>{{ $t('Home.Tokenomics.Details') }}</th>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.Name') }}</td>
                <td>FBX</td>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.Standard') }}</td>
                <td>BEP20/ERC20</td>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.TotalSupply') }}</td>
                <td>{{ $t('Home.Tokenomics.Billion') }}</td>
              </tr>
            </table>
            <img class="token-table-bg m-v-hide" src="@/assets/home/ecosystem-token-5.png" />
          </div>
          <div class="token-block token-table">
            <div class="table-title">{{ $t('Home.Tokenomics.Allocation') }}</div>
            <table class="table-info">
              <tr>
                <th>{{ $t('Home.Tokenomics.Holders') }}</th>
                <th>{{ $t('Home.Tokenomics.Portions') }}</th>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.Liquidity') }}</td>
                <td>4.00%</td>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.ForthDAO') }}</td>
                <td>5.00%</td>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.Team') }}</td>
                <td>10.00%</td>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.Investors') }}</td>
                <td>21.00%</td>
              </tr>
              <tr>
                <td>{{ $t('Home.Tokenomics.Ecosystem') }}</td>
                <td>60.00%</td>
              </tr>
            </table>
            <div class="table-notes">
              {{ $t('Home.Tokenomics.Note') }}
            </div>
          </div>
          <div class="token-title">
            {{ $t('Home.Tokenomics.FBXRepurchaseAndBurn') }}
            <img src="@/assets/home/ecosystem-token-2.png" />
          </div>
          <div class="token-text with-circular">
            <p>
              {{ $t('Home.Tokenomics.InPrinciple') }}
            </p>
            <div class="token-fbx-1">
              <div class="item">
                <img class="img" src="@/assets/home/ecosystem-token-6.png" />
                <p class="text">{{ $t('Home.Tokenomics.FeedingFee') }}</p>
              </div>
              <div class="item">
                <img class="img" src="@/assets/home/ecosystem-token-7.png" />
                <p class="text">{{ $t('Home.Tokenomics.NFTMarket') }}</p>
              </div>
              <div class="item">
                <img class="img" src="@/assets/home/ecosystem-token-8.png" />
                <p class="text">{{ $t('Home.Tokenomics.NFTGrab') }}</p>
              </div>
              <div class="item">
                <img class="img" src="@/assets/home/ecosystem-token-9.png" />
                <p class="text">{{ $t('Home.Tokenomics.GameFi') }}</p>
              </div>
            </div>
          </div>
          <div class="token-text with-circular">
            <p>
              {{ $t('Home.Tokenomics.BurningPool') }}
            </p>
            <div class="token-fbx-2">
              <img class="m-w-100" src="@/assets/home/ecosystem-token-3.png" />
            </div>
          </div>
        </section>
        <section class="panel-map" v-if="ecosystem == ECOSYSTEM.ROADMAP">
          <div class="map-block">
            <div class="map-title">{{ $t('Home.Roadmap.2021Q4') }}</div>
            <ul class="map-list">
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.OfficialWebsiteOnline') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.WhitePaper') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.FBXTokenVesting') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.OnPancakeSwap') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.NFTMinting') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.DeFiModuleOnline') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ForthBoxNFTMarketOnline') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
            </ul>
          </div>

          <div class="map-block">
            <div class="map-title">{{ $t('Home.Roadmap.2022Q1') }}</div>
            <ul class="map-list">
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.FirstGameSpaceWarOnline') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">
                  {{ $t('Home.Roadmap.DecentralizedCommentarySystemForGame') }}
                </div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">
                  {{ $t('Home.Roadmap.ManagementSystemTailoredForGameGuild') }}
                </div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.WhitepaperPublished') }}</div>
                <div class="line"></div>
                <div class="switch on"></div>
              </li>
            </ul>
          </div>

          <div class="map-block">
            <div class="map-title">{{ $t('Home.Roadmap.2022Q2') }}</div>
            <ul class="map-list">
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ForthBoxV2Launched') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ListOnCEX') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.GameFiAggregationPlaform') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.LaunchSocialModule') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.LaunchNFTAssetAggregationProtocol') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.GameGuildManagementSystem') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.TheThirdSelfDevelopedGame') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
            </ul>
          </div>

          <div class="map-block">
            <div class="map-title">{{ $t('Home.Roadmap.2022Q3') }}</div>
            <ul class="map-list">
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.3DNFTOnline') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.TheFourthelfDevelopedGame') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.UnifiedSDKForDevelopers') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ListOneThirdDartyGame') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.TokenListedOnTopExchanges') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
            </ul>
          </div>

          <div class="map-block">
            <div class="map-title">{{ $t('Home.Roadmap.2022Q4') }}</div>
            <ul class="map-list">
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.MultiChainImplementation') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.LaunchNFTAssetV2') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ForthBoxAPPReleased') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.LaunchSocialModuleV2') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.EcoysystemFundsForThird') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ForthBoxDAOOnline') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
            </ul>
          </div>

          <div class="map-block">
            <div class="map-title">{{ $t('Home.Roadmap.Future') }}</div>
            <ul class="map-list">
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.EHTCrossChainImplementation') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.NFTAssetAggregationProtocolV2') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ForthBoxAPPV2') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.SocialPlatformV2') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.3DMetaverseSupportSpecialFund') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
              <li class="map-item">
                <div class="text">{{ $t('Home.Roadmap.ForthDAOlaunched') }}</div>
                <div class="line"></div>
                <div class="switch"></div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  </section>
</template>

<script>
const ECOSYSTEM = {
  ABOUT: '#about',
  TEAM: '#team',
  TOKEN: '#tokenomics',
  ROADMAP: '#roadmap',
}

export default {
  name: 'EcologicalSystem',
  data() {
    return {
      ECOSYSTEM,
      ecosystem: ECOSYSTEM.ABOUT,
    }
  },
  methods: {
    onSwitchEcosystem(ecosystem) {
      this.ecosystem = ecosystem
    },
  },
}
</script>

<style lang="scss">
.home {
  .forthbox-ecosystem {
    .header {
      .title-content {
        max-width: 22.5rem;
      }
    }
    .main {
      margin-bottom: 5rem;
    }
    .wrap-left {
      margin-right: 1.3rem;
      padding: 2.2rem 0 1.5rem;
      background: url('~@/assets/home/forthbox-ecosystem-1.png') 0 0 no-repeat;
      background-size: 100% 100%;
      li {
        width: 13.5rem;
        height: 3.5rem;
        margin: 0 1.8rem 1.2rem;
        line-height: 3.5rem;
        text-align: center;
        border-radius: 0.75rem;
        background-color: #171429;
        cursor: pointer;
        &.active {
          background: url('~@/assets/home/forthbox-ecosystem-2.png') 0 0 no-repeat;
          background-size: 100% 110%;
          border-radius: 0;
          background-color: transparent;
        }
      }
    }
    .wrap-right {
      position: relative;
      width: 37rem;
      height: 22rem;
      padding-right: 0.5rem;
      overflow: auto;
    }
    @media (max-width: 768.89px) {
      .main {
        margin-bottom: 2rem;
      }
      margin-top: 2rem;
      .wrap-left {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        justify-content: space-around;
        background: none;
        li {
          width: 45%;
          height: 1.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0.25rem 0.05rem;
          padding: 0.2rem 1%;
          line-height: 1.2;
          font-size: 0.65rem;
        }
      }
      .wrap-right {
        height: auto;
        min-height: 12rem;
      }
    }
    .panel-about {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0.1rem;
      box-sizing: border-box;
      border-radius: 0.2rem;
      background: linear-gradient(90deg, #0078ff, #ae00ff);
      overflow: hidden;
      .inner {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #0078ff;
        border-radius: 0.2rem;
        background-color: #171429;
      }
    }
    .panel-team {
      font-size: 0.7rem;
      line-height: 1.5;
      .text {
        padding: 0.5rem 1rem 1.5rem 1rem;
        background: url('~@/assets/home/ecosystem-team-border.png') 0 0 no-repeat;
        background-size: 100% 100%;
      }
      .img {
        display: block;
        margin: 0.5rem auto 0;
        max-width: 21rem;
        width: 100%;
      }
    }
    @media (max-width: 768.89px) {
      .panel-team {
        font-size: 0.65rem;
        .text {
          padding: 0.8rem 1rem 1.2rem;
          background-image: url('~@/assets/home/ecosystem-team-border-m.png');
        }
      }
    }
    .panel-token {
      .token-title {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        img {
          margin-left: 0.3rem;
          vertical-align: middle;
        }
      }
      .token-text {
        margin-bottom: 1.6rem;
        line-height: 1.2;
        font-size: 0.8rem;
        color: #bfbfbf;
        &.with-circular {
          position: relative;
          padding-left: 1rem;
          &::before {
            content: '';
            position: absolute;
            top: 0.22rem;
            left: 0;
            display: inline-block;
            width: 0.45rem;
            height: 0.45rem;
            border-radius: 0.45rem;
            background-color: #ae00ff;
          }
        }
      }
      .token-block {
        margin-bottom: 1.7rem;
        background-color: #1e1a33;
        border-radius: 1.3rem;
      }
      .token-table {
        position: relative;
        margin: 0 3.35rem 1.7rem 1.1rem;
        padding: 2.5rem;
        .token-table-bg {
          position: absolute;
          top: 0;
          right: -3.35rem;
        }
      }
      .table-title {
        font-size: 0.8rem;
        font-weight: 600;
        &::before {
          content: '';
          margin-left: -1.1rem;
          margin-right: 0.6rem;
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #ae00ff;
          border-radius: 50%;
        }
      }
      .table-info {
        margin: 0.2rem 0 0;
        width: 100%;
        font-size: 0.8rem;
        tr {
          line-height: 2.5rem;
        }
        th:last-child,
        td:last-child {
          text-align: right;
        }
      }
      .table-notes {
        padding-top: 1.3rem;
        border-top: 0.05rem solid #323a4b;
      }
      .token-fbx-1 {
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;
        .item {
          max-width: 8rem;
          font-size: 0.7rem;
          text-align: center;
          p {
            margin: 0.8rem 0.5rem;
            text-align: left;
          }
        }
      }
      .token-fbx-2 {
        margin-top: 0.8rem;
        text-align: center;
      }
    }
    @media (max-width: 768.89px) {
      .panel-token {
        .token-title {
          margin-bottom: 0.5rem;
          font-size: 0.7rem;
          img {
            width: 0.7rem;
          }
        }
        .token-text {
          margin-bottom: 0.7rem;
          line-height: 1.5;
          font-size: 0.65rem;
        }
        .token-block {
          margin-bottom: 0.85rem;
          border-radius: 0.65rem;
        }
        .token-table {
          margin: 0 0 0.8rem;
          padding: 0.65rem 0.8rem;
        }
        .table-title {
          font-size: 0.7rem;
          &::before {
            margin-left: 0;
          }
        }
        .table-info {
          font-size: 0.65rem;
          tr {
            line-height: 1.25rem;
          }
        }
        .table-notes {
          padding-top: 0.65rem;
          font-size: 0.65rem;
        }
        .token-fbx-1 {
          flex-wrap: wrap;
          margin-top: 0.8rem;
          .item {
            width: 40%;
            font-size: 0.6rem;
            p {
              margin: 0.4rem 0.5rem 0.6rem;
            }
          }
        }
      }
    }
    .panel-map {
      .map-block {
        margin-bottom: 1rem;
        padding: 1rem 1.2rem 1rem 2.7rem;
        background-color: #1e1a33;
        border-radius: 1.1rem;
      }
      .map-title {
        position: relative;
        line-height: 2.5rem;
        border-bottom: 0.05rem solid #5e5e5e;
        &::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: -0.25rem;
          margin-right: 0.1rem;
          vertical-align: middle;
          border-left: 0.4rem solid #ae00ff;
          border-right: 0.4rem solid transparent;
          border-top: 0.25rem solid transparent;
          border-bottom: 0.25rem solid transparent;
        }
      }
      .map-list {
        padding: 0.7rem 0;
      }
      .map-item {
        display: flex;
        padding: 0.3rem 0;
        align-items: center;
        .text {
          flex: 1;
          font-size: 0.7rem;
          line-height: 1.5rem;
        }
        .line {
          margin: 0 1.2rem;
          width: 20%;
          height: 0;
          border-bottom: 0.1rem dashed #5e5e5e;
        }
        .switch {
          width: 3.15rem;
          height: 1.5rem;
          background: url('~@/assets/home/ecosystem-switch-off.png') 0 0 no-repeat;
          background-size: 100%;
          &.on {
            background-image: url('~@/assets/home/ecosystem-switch-on.png');
          }
        }
      }
    }
    @media (max-width: 768.89px) {
      .panel-map {
        font-size: 0.65rem;
        .map-block {
          margin-bottom: 0.5rem;
          padding: 0.5rem 0.6rem 0.5rem 0.75rem;
          border-radius: 0.65rem;
          background-color: initial;
        }
        .map-title {
          line-height: 2rem;
        }
        .map-item {
          padding: 0;
          .text {
            font-size: 0.65rem;
          }
          .line {
            margin: 0 0.6rem;
            width: 15%;
            border-bottom: 0.05rem dashed #5e5e5e;
          }
          .switch {
            width: 2.175rem;
            height: 1.04rem;
          }
        }
      }
    }
  }
}
</style>

