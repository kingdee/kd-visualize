import { defineConfig } from 'umi';

export default defineConfig({
  chainWebpack(memo) {
    memo.module
      .rule('glb')
      .test(/\.glb$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[ext]',
      });
  },
});
