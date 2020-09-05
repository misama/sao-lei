const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            path.join(__dirname, 'site/'),
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'site/')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/, // include .js files
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
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
    ],
};
