const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const vueConfig = {
    productionSourceMap: true,
    // configureWebpack: {
    //     plugins: [
    //         new CompressionWebpackPlugin({
    //             filename: '[path][base].gz',
    //             algorithm: 'gzip',
    //             test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //             threshold: 10240,
    //             minRatio: 0.8
    //         })
    //     ]
    // }
}

if (process.env.UNI_PLATFORM === 'mp-qq') {
    vueConfig.productionSourceMap = false
}

module.exports = vueConfig