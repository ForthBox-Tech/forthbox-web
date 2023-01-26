import emitter from '@/common/js/emitter'

/**
 * 自动初始化逻辑
 * @param {Object} options 配置
 * @param {Boolean} options.isConnectWallet 是否启用自动链接钱包
 */
const mixinFactory = (options) => {
  options = options || {}

  return {
    data() {
      return {}
    },
    methods: {
      // async _init() {
      //   if (this._initing) return
      //   this._initing = true
      //   if (typeof this.init === 'function') {
      //     await this.init()
      //   }
      //   this._initing = false
      // },
    },

    created() {
      if (typeof this.init === 'function') {
        emitter.on('auth-change', this.init)
        this.init()
      }

      if (options.isConnectWallet) {
        this.$root.connectWallet()
      }
    },
    unmounted() {
      if (typeof this.init === 'function') {
        emitter.off('auth-change', this.init)
      }
    },
  }
}

export default mixinFactory
