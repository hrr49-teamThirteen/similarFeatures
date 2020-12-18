const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");


module.exports = {
  entry: `${__dirname}/client/src/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public/dist`
  },
  mode: 'production',
  module: {
    rules: [
      {
        test:/\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
    })
  ],
};