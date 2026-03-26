import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import webpack from "webpack";
import ThemePlugin from "./ThemePlugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

module.exports = () => {
  const config = {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.svg$/i,
          use: ['@svgr/webpack', 'file-loader'],
        },
        {
          test: /\.(scss|css|sass|less)$/,
          
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: '[name]__[local]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(ts|tsx)$/,      
          use: 'babel-loader',        
          exclude: /node_modules/,    
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
      alias: {
        '@common': path.resolve(__dirname, 'src/common'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@styles': path.resolve(__dirname, 'src/resources/styles'),
        '@ui': path.resolve(__dirname, 'src/common/components'),
        '@resources': path.resolve(__dirname, 'src/resources'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    
    devServer: {
      historyApiFallback: true,
      static: path.join(__dirname, 'public'),
      compress: true,
       
      port: 3000,
      open: true,
      hot: true,
      liveReload: true,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/resources/locales', to: 'locales' },
          { from: 'src/resources/icons', to: 'icons' }
        ]
      }),
      new ThemePlugin({
        input: path.resolve(__dirname, 'src/resources/theme.json'),
        output: 'src/resources/styles/variables.scss',
        typesOutput: 'src/common/themes/common/variables.ts',
      }),
      




 
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  };

  return config;
};
