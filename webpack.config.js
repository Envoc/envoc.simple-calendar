var webpack             = require("webpack");
var BowerWebpackPlugin  = require("bower-webpack-plugin");

module.exports = {
  output: {
      filename: "ngSimpleCalendar.js"
  },
  plugins: [
    new BowerWebpackPlugin({
      modulesDirectories: ['./src/libs'],
      manifestFiles:      'bower.json',
      searchResolveModulesDirectories: true
    }),
    new webpack.optimize.DedupePlugin()
  ],
  resolve: {
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'shared',
      'vendor'
    ]
  }
}