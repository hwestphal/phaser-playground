// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const config = {
    target: 'web',
    entry: {
        "app": "./src/index.ts",
        "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
        "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker.js",
    },
    output: {
        filename: 'bundle.[name].js',     // for small bundles
        publicPath: "dist/",
        globalObject: "self",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        open: true,
        host: 'localhost',
        static: {
            directory: path.join(__dirname, ''),
                  },
    },
    plugins: [
        new MonacoWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
          })



        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader', options: { transpileOnly: true },
                exclude: ['/node_modules/'],
            },
            {   {
                //         test: /\.ttf$/,
                //         use: ['file-loader']

                test: /\.txt$/i,
                exclude: '/node_modules/',
                use: 'raw-loader'
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource'
              },
        //    {
        //         test: /\.ttf$/,
        //         use: ['file-loader']
        //     },
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            },            // {

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    } else {
        config.mode = 'development';
    }
    return config;
};
