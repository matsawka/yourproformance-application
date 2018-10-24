const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack'); 

module.exports = (env) => {
 const isProduction = env === 'production';
 const CSSExtract = new ExtractTextPlugin('styles.css');
  
 return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    //loader
    module: {
        rules: [{
            loader: 'babel-loader', //2.run it through babel
            test: /\.js$/, //1.when you see a js file run babel
            exclude: /node_modules/ //3.exclude the node_modules folder
        }, {
            test: /\.s?css$/, // look for any file that ends with .css
            use: CSSExtract.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            })
        }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({           
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),      
        API_HOST: JSON.stringify(process.env.API_HOST)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
 }
};




