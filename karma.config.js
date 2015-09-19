// Karma configuration

module.exports = function(config) {
    config.set({
        // ... normal karma configuration
        basePath: '',
        frameworks: ['jasmine'],

        files: [
           "https://fb.me/react-with-addons-0.13.3.js",
            // all files ending in "_test"
            'tests/*_test.*',
            'tests/**/*_test.*'
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'tests/*_test.*': ['webpack', 'sourcemap'],
            'tests/**/*_test.*': ['webpack', 'sourcemap']
        },

        port: 8065,
        logLevel: config.LOG_INFO,
        colors: true,
        autoWatch: true,

        browsers: ['Chrome'],
        reporters: ['progress'],
        captureTimeout: 60000,
        singleRun: false,

        webpack: {
          cache: true,
          devtool: 'inline-source-map',

          resolve: {
                extensions: ['', '.js', '.jsx', '.ts', '.tsx']
          },

          externals: {
            "react": "React",
            "react/addons": "React"
          },

          module: {
            loaders: [
              { test: /\.tsx?$/, loader: 'ts' },
              { test: /\.jsx?$/, loader: 'jsx?harmony' }
            ]
          },
          noInfo: true
        },

        webpackMiddleware: {
            noInfo: true
        },

        devServer: {
          noInfo: true
        }
    });
};
