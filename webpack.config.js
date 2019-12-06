const path = require('path')

const postCSSPlugins = [
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

module.exports = {
  entry: './js/App.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'js')
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
      }
    ]
  }
}