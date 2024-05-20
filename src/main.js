import '@/web3/wallet'
import '@/web3/HamNFT'
import '@/web3/HamStake'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import axios from './plugins/axios'
import validator from './plugins/validator'
import modal from './plugins/modal'

import Web3 from 'web3'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
window.Web3 = Web3
window.WalletConnect = WalletConnect
window.QRCodeModal = QRCodeModal
window.WalletConnectProvider = WalletConnectProvider

const instance = createApp(App)
  .use(router)
  .use(i18n)
  .use(axios)
  .use(validator)
  .use(modal)
  .mount('#app')

export default instance
