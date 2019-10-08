var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const devMode = process.env.NODE_ENV !== 'production';
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};
var I18nPlugin = require("i18n-webpack-plugin");
var languages = {
    en: require(path.join(PATHS.build, "/assets/locales/en/wa.json")),
    ar: require(path.join(PATHS.build, "/assets/locales/ar/wa.json"))
};
module.exports = Object.keys(languages).map(function (language) {
    // module.exports = {
    return {
        entry: {
            app: path.join(PATHS.app, 'app.js'),
        },
        output: {
            path: PATHS.build,
            publicPath: '../../',

            filename: "assets/js/[name].js",
        },

        plugins: [
            new webpack.LoaderOptionsPlugin({
                options: {
                    handlebarsLoader: {}
                }
            }),
            new I18nPlugin(languages[language], {
                nested: true
            }),
            new HtmlWebpackPlugin({
                title: 'Home',
                template: './src/index.handlebars',
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: false
                },

            }),
            new HtmlWebpackPlugin({
                title: 'About',
                filename: './views/about.html',
                template: path.join(path.resolve(__dirname, 'src/app/views') + '/about.handlebars'),
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: false
                },

            }),
            // new HtmlWebpackPlugin({
            //     title: 'Achievements',
            //     filename: './views/achievements.html',
            //     template:  path.join(path.resolve(__dirname, 'src/app/views') + '/achievements.html'),
            //     inject: true,
            //     minify: {
            //         removeComments: true,
            //         collapseWhitespace: false
            //     },

            // }),
            // new HtmlWebpackPlugin({
            //     title: 'Contact',
            //     filename: './views/contact.html',
            //     template:   path.join(path.resolve(__dirname, 'src/app/views') + '/contact.html'),
            //     inject: true,
            //     minify: {
            //         removeComments: true,
            //         collapseWhitespace: false
            //     },

            // }),
            // new HtmlWebpackPlugin({
            //     title: 'Portfolio',
            //     filename: './views/portfolio.html',
            //     template:   path.join(path.resolve(__dirname, 'src/app/views') + '/portfolio.html'),
            //     inject: true,
            //     minify: {
            //         removeComments: true,
            //         collapseWhitespace: false
            //     },

            // }),

            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                masonry: 'masonry'
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].css',
            })
        ],
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(gif|png|jpe?g|svg|ico)$/i,
                    use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                useRelativePath: true,
                                outputPath: "assets/images",
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true, // webpack@1.x
                                disable: true, // webpack@2.x and newer
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }

                        }
                    ],
                },
                // {
                //     test: /\.html$/,
                //     use: {
                //         loader: 'html-loader',
                //         options: {
                //             interpolate: true,
                //         }
                //     }
                // },
                {
                    test: /\.(handlebars|html)$/,
                    use: [
                        {
                            loader: 'handlebars-loader'
                          },
                          {
                            loader: 'extract-loader'
                          },
                          {
                            loader: 'html-loader',
                            options: {
                              interpolate: true
                            }
                            }

                    ]
                },
                // style loaders
                {
                    test: /\.(sc|c)ss$/,
                    exclude: /node_modules/,
                    use: [
                        // cssHotLoad,
                        {
                            loader: MiniCssExtractPlugin.loader,

                        },

                        'css-loader',
                        'sass-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                autoprefixer: {
                                    browsers: ["last 2 versions"]
                                },
                                sourceMap: true,
                                sourceMapContents: false,
                                plugins: () => [
                                    autoprefixer
                                ]
                            },
                        },
                    ],

                }
            ]
        },
        // optimization
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: 'all',
            },
        },
        devServer: {
            contentBase: path.join(__dirname, 'build'),
            compress: true,
            port: 9000,
            historyApiFallback: true,
            noInfo: true,
            before(app) {
                app.get('/about', function (req, res) {
                    res.sendFile(path.join(__dirname + '/build/views/about.html'));

                });

                app.get('/', function (req, res) {
                    res.sendFile(path.join(__dirname + '/build/index.html'));
                });
            }
        },
        stats: {
            colors: true
        },
        resolve: {
            alias: {
                '@views': path.resolve(__dirname, 'src/app/views'),
                '@includes': path.resolve(__dirname, 'src/app/includes'),
                '@scss': path.resolve(__dirname, 'src/app/sass'),
                '@css': path.resolve(__dirname, 'src/css'),
                '@scripts': path.resolve(__dirname, 'src/js'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@lang': path.resolve(__dirname, 'src/locales'),
                '@': path.resolve(__dirname, 'src'),

            },

        },
        mode: 'development',
        devtool: 'source-map',
        watch: true,

    }
});