<template>
  <Dialog class="dialog-home dialog-feed-explain" :visible="visible" @hide="onHide">
    <main class="main">
      <header class="header">
        <h1 class="title">{{ $t('Home.FeedInstructions.FeedingInstructions') }}</h1>
        <div class="close-wrap">
          <a class="close" @click="onHide"></a>
        </div>
      </header>
      <ul class="list">
        <li class="item">
          <i class="order">1</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.MinedForFree') }}
          </p>
        </li>
        <li class="item">
          <i class="order">2</i>
          <p class="text one-line">{{ $t('Home.FeedInstructions.MultipleAttributes') }}</p>
        </li>
        <li class="item">
          <i class="order">3</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.UpgradeHam') }}
          </p>
        </li>
        <li class="item">
          <i class="order">4</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.StakeHam') }}
          </p>
        </li>
        <li class="item">
          <i class="order">5</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.HamCanBeFed') }}
          </p>
        </li>
        <li class="item">
          <i class="order">6</i>
          <div class="text">
            <p>
              {{ $t('Home.FeedInstructions.HamCorresponds') }}
            </p>
            <div class="m-v-hide" style="margin: 1rem auto 0">
              <img style="width: 96%" src="@/assets/home/dialog-feed-table.png" />
            </div>
            <div class="pc-v-hide" style="margin: 1rem auto 0">
              <div class="table-tips">
                <div>
                  <img style="width: 0.675rem" src="@/assets/home/dialog-feed-level.png" />
                  <span> = LEVEL</span>
                </div>
                <div>
                  <img style="width: 0.725rem" src="@/assets/home/dialog-feed-power.png" />
                  <span> = HASHRATE</span>
                </div>
              </div>
              <img
                class="pc-v-hide"
                style="width: 104%; margin-left: -1rem"
                src="@/assets/home/dialog-feed-table-m.png"
              />
            </div>
          </div>
        </li>
        <li class="item">
          <i class="order">7</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.ProportionOfFeeding') }}
          </p>
        </li>
        <li class="item">
          <i class="order">8</i>
          <div class="text one-line">
            <p>{{ $t('Home.FeedInstructions.MiningModelFormula') }}</p>
            <ul class="sub-list">
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula1') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula2') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula3') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula4') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula5') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula6') }}</li>
            </ul>
          </div>
        </li>
        <!-- <li class="item">
          <i class="order">9</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.FirstToReach') }}
          </p>
        </li> -->
      </ul>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'FeedIntroDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onHide() {
      this.hide()
    },
  },
}
</script>

<style lang="scss">
@import '../home.dialog.scss';

.dialog-feed-explain {
  .main {
    background: url('~@/assets/home/dialog-feed-bg2.png') 104% 96% no-repeat,
      url('~@/assets/home/dialog-feed-bg1.png') 0 0 no-repeat;
    background-size: 25.75rem, 100% 100%;
  }
  .sub-list {
    margin: 0.6rem 0 0;
  }
  .sub-item {
    position: relative;
    margin: 0.2rem 0;
    padding-left: 1.2rem;
    color: #5e5f86;
    &::before {
      content: '';
      position: absolute;
      top: 0.25rem;
      left: 0;
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 0.7rem;
      background: linear-gradient(0deg, #0078ff, #ae00ff);
    }
  }
  .table-tips {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0.6rem 0 0.5rem -0.5rem;
    color: #0bf0ff;
    font-size: 0.45rem;
  }

  @media (max-width: 768.89px) {
  }
}
</style>

