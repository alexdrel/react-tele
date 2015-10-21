var webpack = require("webpack");

module.exports = {
  entry: {
    hello: './examples/hello/index.jsx',
    trek: './examples/trek/index.jsx',
    'slide-nav': './examples/slide-nav/index.tsx',
    umd: './examples/umd/index.jsx'
  },
  output: {
    filename: './examples/[name]/build/index.js'
  },
  externals: {
    "swiper": "Swiper",
    "swiper_css": "Swiper",
    "react": "React"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    modulesDirectories: [ '.', 'node_modules' ],
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx?harmony' },
      { test: /\.tsx?$/, loader: 'ts' },
      { test: /\.ya?ml$/, loader: 'json!yaml' }
    ]
  },
  devtool: "eval",
  devServer: {
    noInfo: false,
    stats: true
  }
}
