import i18n from '@/plugins/i18n'

const i18nGlobal = i18n.global

/** 价格 */
export const FILTER_PRICE = {
  name: 'price',
  value: [],
}

/** 合约类型 */
export const FILTER_CONTRACT = {
  name: 'contractType',
  title: i18nGlobal.t('CompFilter.ContractType'),
  value: [],
  list: ['ERC721', 'ERC1155', { text: 'ALL', value: '' }],
}

export const FILTER_STATUS = {
  name: 'status',
  title: i18nGlobal.t('CompFilter.Status'),
  value: [],
  list: [
    { text: i18nGlobal.t('CompFilter.InProgress'), value: 'ON' },
    { text: i18nGlobal.t('CompFilter.Expired'), value: 'OFF' },
  ],
}

export const FILTER_LAST = {
  name: 'last',
  title: i18nGlobal.t('CompFilter.RecentTransactions'),
  value: [],
  list: [
    { text: '24h', value: '86400' },
    { text: '7 days', value: '604800' },
    { text: '30 days', value: '259200' },
  ],
}

/** NFT等级 */
export const FILTER_NFT_LEVEL = {
  name: 'nftLevel',
  title: i18nGlobal.t('CompFilter.NFTRarity'),
  value: [],
  list: [],
  type: 'checkbox',
}

export const FILTER_NFT_NAME = {
  name: 'nftName',
  title: 'NFT Name',
  value: [],
  list: [],
  type: 'checkbox',
}

/** 交易类型 */
export const FILTER_SWAP_TYPE = {
  name: 'swapType',
  title: i18nGlobal.t('CompFilter.TransactionType'),
  value: [],
  list: ['PLAN_SELL', 'PLAN_BUY', 'SELL', 'BUY', 'CANCEL', 'EDIT'],
}

/** 排序 */
export const SORT = [
  { text: i18nGlobal.t('Market.TimeDown'), value: 0 },
  { text: i18nGlobal.t('Market.UnitPriceDown'), value: 1 },
  { text: i18nGlobal.t('Market.UnitPriceUp'), value: 2 },
  { text: i18nGlobal.t('Market.TotalPriceDown'), value: 3 },
  { text: i18nGlobal.t('Market.TotalPriceUp'), value: 4 },
]
