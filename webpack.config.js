var path = require('path');
global.buildDir = path.join(__dirname, 'build');
global.staticDir = path.join(__dirname, 'views_assets');
require('./build/less/npmCss')();

var glob = require('glob');
var getEntry = (globPath)=>{
    var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    // pathname = tmp.splice(0, 1) + '/' + basename; 
    pathname = basename; 
    entries[pathname] = entry;
  });

  return entries;
}

var entryes = getEntry('./views_actions/single/*.js');

//打包css,js
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var forUglifyJS = {
    compress: {
      properties:false,
      warnings: false
    },
    output:{
      beautify:true,
      quote_keys:true
    },
    mangle:{
      screw_ie8:false
    },
    sourceMap: false
  };
var config = {
    entry:entryes,
    output: {
        path: __dirname+'/views_actions/bundle',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.css$/,loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.svg/, loader: 'svg-url-loader'}
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(forUglifyJS)
    ]
};
module.exports = config;