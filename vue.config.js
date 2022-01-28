module.exports = {
  lintOnSave: false,

  devServer: {
    // proxy: 'http://api-v2.dev.forthbox.top',
    // proxy: 'http://api.dev.forthbox.top',
    proxy: {
      '/web/': {
        target: 'http://fbox2-be.dev.forthbox.top',
        changeOrigin: true,
      },
      '/users/': {
        target: 'http://api.dev.forthbox.top',
        changeOrigin: true,
      },
      '/market/get_nft_level': {
        target: 'https://spacewar-be.forthbox.io',
        changeOrigin: true,
      },
      '/market/get_list': {
        target: 'https://api-v2.forthbox.io',
        // target: 'http://api-v2.dev.forthbox.top',
        changeOrigin: true,
      },
      '/artwork/get_history': {
        target: 'https://api-v2.forthbox.io',
        // target: 'http://api-v2.dev.forthbox.top',
        changeOrigin: true,
      },
      '/gamecenter/': {
        target: 'https://gamecenter-be.forthbox.io',
        // target: 'http://gamecenter-be.dev.forthbox.top',
        changeOrigin: true,
      },
      '/buy/open_xbox': {
        target: 'http://ham-fantasy-be.dev.forthbox.top',
        changeOrigin: true,
      },
      '/ops/home/': {
        target: 'http://fbox2-be.dev.forthbox.top',
        changeOrigin: true,
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      // SEO
      args[0].title = 'ForthBox'
      args[0].keywords = 'ForthBox,NFT,Metaverse,DAPP'
      args[0].description = 'ForthBox,NFT,Metaverse,DAPP'

      // 全局JS版本号
      args[0].global_js_version = Date.now()
      return args
    })
  },

  pluginOptions: {
    // i18n: {
    //   locale: 'en',
    //   fallbackLocale: 'en',
    //   localeDir: 'locales',
    //   enableLegacy: true,
    //   runtimeOnly: false,
    //   compositionOnly: true,
    //   fullInstall: true,
    // },
  },
}
