const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    // Where webpack looks to start building the bundle
    entry: path.resolve(__dirname, '.././src/index.js'),

    // Where webpack outputs the assets and bundles
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },

    // Customize the webpack build process
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public'),
                    to: 'assets',
                    noErrorOnMissing: true,
                },
            ],
        }),

        // Generates an HTML file from a html template
        new HtmlWebpackPlugin({
            title: 'Pokemon',
            template: path.resolve(__dirname, '.././src/index.html'), // template file
            filename: 'index.html', // output file
        }),
    ],

    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {
                test: /\.(ts|js)x?$/,
                include: path.resolve(__dirname, '.././src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    // options: {
                    //     presets: [
                    //         ['@babel/preset-env', {
                    //             "targets": "defaults"
                    //         }],
                    //         '@babel/preset-react'
                    //     ]
                    // }
                }]
            },
            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
            {
                test: /\.mp4$/,
                use: 'file-loader?name=videos/[name].[ext]',
            }
        ],
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
}