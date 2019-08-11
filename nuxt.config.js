const pkg = require("./package");
const axios = require('axios');

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Storyblok + Nuxt.js",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['storyblok-nuxt',
      // preview token: WUyzdw2qu25aZuSowK8s6wtt
      {accessToken: process.env.NODE_ENV == 'production' 
        ? 'osB49rBxot9DcHJHDKNwrAtt'
        : 'WUyzdw2qu25aZuSowK8s6wtt'
        , cacheProvider: "memory" }
    ]
  ],
  // fetch content dynamically when building into dist folder. Sepcify which routes should be generated
  generate: {
    routes: function() {
      // want to fetch routes from storyblok. must make http request
      return axios.get('https://api.storyblok.com/v1/cdn/stories?&version=published&token=osB49rBxot9DcHJHDKNwrAtt&starts_with=blog&cv=' + Math.floor(Date.now() / 1e3)
      )
      .then(res => {
        const blogPosts = res.data.stories.map(bp => bp.full_slug);
        return [
          '/',
          '/blog',
          '/about',
          ...blogPosts
        ]
      });
    }
  },

  axios: {
    
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
