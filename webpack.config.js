var webpack = require("webpack")

module.exports = {
  entry: ['webpack-dev-server/client?http://localhost:8080', './src/index.js'],
  output: {
    path: './dist/assets',
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: './dist'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
}
