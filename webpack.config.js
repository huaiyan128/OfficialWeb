const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpritesmithPlugin=require('webpack-spritesmith')
module.exports = {
  //页面入口文件配置
  entry: {
    index: ['./app/js/index.jsx']
  },
  //入口文件输出配置
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.js[x]?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=25000'
    }

    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    compress: true,
    historyApiFallback: true,
    port: 6658,
    inline:true
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, './app/imgs/icons'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, './dist/sprites/sprite.png'),
                css: path.resolve(__dirname, './dist/sprites/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../sprites/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down'
            }
        })
  ]
};