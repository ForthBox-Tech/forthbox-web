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
