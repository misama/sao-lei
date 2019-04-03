const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    node: {
        global: true,
    },
    entry: {
        app: path.resolve(__dirname, 'src') + '/index.js'
    },
    devServer: {
        port: 8089,
        contentBase: [
            path.join(__dirname, 'dist/'),
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [{
            test: /\.js$/, // include .js files
            // enforce: "pre", // preload the jshint loader
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            use:
                {
                    loader: "babel-loader",
                    query: {
                        presets: ['react', 'es2015']
                    }
                }
                },
                {
                    test: /\.css$/,
                    loader: ['style-loader', 'css-loader']
                },
            {test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: "file-loader?outputPath=images/",
                    options:  {
                        limit: 10000,
                        emitFile: true,
                        useRelativePath: true
                    }
                }]
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/*.png', to: 'images',
                transformPath (targetPath, absolutePath) {
                return `${targetPath.substring(15)}`;
            }},
        ])
    ],
};
