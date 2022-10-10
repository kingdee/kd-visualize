import { defineConfig } from 'umi'

export default defineConfig({
  publicPath: './',
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  // mock: false,
  // proxy: {
  //   '/ierp': {
  //     target: 'http://124.71.194.237:8080',
  //     changeOrigin: true,
  //   },
  // },
  routes: [
    {
      path: '/',
      component: '@/layout',
      routes: [
        {
          path: '/',
          component: '@/pages/home',
        },
        {
          path: '/t',
          component: '@/pages/template',
        },
      ],
    },
  ],
  fastRefresh: {},
})
