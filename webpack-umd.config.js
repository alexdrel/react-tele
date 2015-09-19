var webpack = require("webpack");

module.exports = {
  entry: {
    "react-tele": "./src/react-tele.tsx",
  },
  output: {
    path: './dist/',
    filename: 'react-tele.umd.js',
    library: 'react-tele',
    libraryTarget: "umd"
  },
  externals: {
    "react": "React"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts' }
    ]
  },
  progress: true,
  devtool: "sourcemap"
}
