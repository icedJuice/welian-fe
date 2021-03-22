// const pkg = require('./package')

const { API_ROOT, BASE_PORT, CDN_PATH, IS_DEV } = require('./config.js');

module.exports = {
  mode: 'universal',

  server: {
    port: BASE_PORT,
    host: '0.0.0.0'
  },

  // render: {
  //   csp: true
  // },

  /*
   ** Headers of the page
   */
  head: {
    title: 'WELIAN',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        'http-equiv': 'cleartype',
        content: 'on'
      },
      {
        'http-equiv': 'Cache-Control'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content: '%s welian'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '%s welian'
      },
      {
        name: 'author',
        content: '1210712996@qq.com'
      }
    ],

    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: [

    ],
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#20A0FF'
  },

  /*
   ** Global CSS
   */
  css: [
    {
      src: './assets/scss/index.scss',
      lang: 'sass'
    },
    {
      src: 'element-ui/lib/theme-chalk/index.css'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/baidu-seo-push.js',
      ssr: false
    },
    {
      src: '~/plugins/finally.js'
    },
    {
      src: '~/plugins/element-ui',
      ssr: true
    }
  ],
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@gauseen/nuxt-proxy',
    // '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ],

  styleResources: {
    scss: ['./assets/scss/variable.scss', './assets/scss/mixin.scss']
  },

  proxyTable: {
    '/api': {
      target: API_ROOT,
      changeOrigin: true,
      ws: false,
      pathRewrite: {
        // '^/api': ''
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: IS_DEV ? '' : CDN_PATH,
    // extractCSS: true,
    extend(config, ctx) {
      // ..
    },
    babel: {
      presets({ isServer }) {
        return [['@nuxtjs/babel-preset-app', { targets: isServer ? { node: '10.4.0' } : { chrome: 69 } }]];
      }
    },
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          },
          styles: {
            name: 'chunk-styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    extractCSS: true
  }
};
