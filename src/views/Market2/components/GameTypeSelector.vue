<template>
  <ul class="game-type-selector">
    <li
      v-for="item in list"
      :key="item.text"
      :class="['item', item.value == modelValue ? 'active' : '']"
      @click="onSelect(item)"
    >
      <img v-if="item.icon" class="icon" :src="item.value == modelValue ? item.icon2 : item.icon" />
      <span class="text">{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
const GAME_TYPES = [
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-all.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-all-active.png'),
    text: 'ALL',
    value: '',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-stg.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-stg-active.png'),
    text: 'STG',
    value: 'STG',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-tdg.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-tdg-active.png'),
    text: 'TDG',
    value: 'TDG',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-tbs.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-tbs-active.png'),
    text: 'TBS',
    value: 'TBS',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-edu.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-edu-active.png'),
    text: 'EDU',
    value: 'EDU',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-rpg.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-rpg-active.png'),
    text: 'RPG',
    value: 'RPG',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-act.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-act-active.png'),
    text: 'ACT',
    value: 'ACT',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-rtt.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-rtt-active.png'),
    text: 'RTT',
    value: 'RTT',
  },
  {
    icon: require('@/assets/page-market2/comp-game-type-selector/icon-spt.png'),
    icon2: require('@/assets/page-market2/comp-game-type-selector/icon-spt-active.png'),
    text: 'SPT',
    value: 'SPT',
  },
]
