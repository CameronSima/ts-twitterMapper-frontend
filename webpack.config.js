// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const webpack = require('webpack');
const path = require('path');

const CONFIG = {
  entry: {
    app: resolve('./app.js')
  },
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },

 // must be set to eval instead of source-map to avoid MapBoxGL bug.
  devtool: 'eval',

  module: {
    rules: [{
      // Compile ES2015 using buble
      test: /\.js$/,
      loader: 'buble-loader',
      include: [resolve('.')],
      exclude: [/node_modules/],
      options: {
        objectAssign: 'Object.assign'
      }
    }]
  },

  resolve: {
    alias: {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  // Optional: Enables reading mapbox token from environment variable
  // plugins: [
  //   new webpack.EnvironmentPlugin(['MapboxAccessToken'])
  // ]
};

module.exports = env =>  CONFIG;
