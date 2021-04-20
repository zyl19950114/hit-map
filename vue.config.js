const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/hit-map-preview',
  pages: {
    index: {
      entry: 'examples/main.js',
      tamplate: 'public/index.html',
      filename: 'index.html'
    }
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // @/ 是 src/ 的别名
  //       prependData: `
  //         @import "@/assets/scss/extends.scss";
  //         @import "@/assets/scss/mixin.scss";
  //         @import "@/assets/scss/variable.scss";
  //       `
  //     }
  //   }
  // },
  lintOnSave: false,
  devServer: {
    port: 8088,
    open: false,
    overlay: {
      warning: false,
      errors: false
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('utils', resolve('utils'))
      .set('@assets', resolve('src/assets'))
      .set('conduct', resolve('src/assets/conduct'))
      .set('conductcpn', resolve('src/views/conduct/components'))
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}