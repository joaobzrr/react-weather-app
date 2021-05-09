const path                   = require("path");
const fs                     = require("fs");
const webpack                = require("webpack");
const TerserWebpackPlugin    = require("terser-webpack-plugin");
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const HtmlWebpackPlugin      = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT_DIR       = __dirname;
const SRC_DIR        = path.resolve(ROOT_DIR,   "src");
const COMPONENTS_DIR = path.resolve(SRC_DIR,    "components");
const HOOKS_DIR      = path.resolve(SRC_DIR,    "hooks");
const SERVICES_DIR   = path.resolve(SRC_DIR,    "services");
const UTILS_DIR      = path.resolve(SRC_DIR,    "utils");
const TYPES_DIR      = path.resolve(SRC_DIR,    "types");
const ASSETS_DIR     = path.resolve(SRC_DIR,    "assets");
const IMAGES_DIR     = path.resolve(ASSETS_DIR, "images");
const DIST_DIR       = path.resolve(ROOT_DIR,   "dist");
const GH_PAGES_DIR   = path.resolve(ROOT_DIR,   "gh-pages");

const REPO_NAME = "react-weather-app";

const FAVICON_FILE_NAME   = "favicon.ico";
const FAVICON_OUTPUT_PATH = "static/images/";

const dotenv = require("dotenv").parse(fs.readFileSync('.env'));

const globals = {
    "__OPEN_WEATHER_MAP_API_KEY__": JSON.stringify(dotenv.OPEN_WEATHER_MAP_API_KEY),
    "__LOCATION_IQ_API_KEY__": JSON.stringify(dotenv.LOCATION_IQ_API_KEY),
    "__IPSTACK_API_KEY__": JSON.stringify(dotenv.IPSTACK_API_KEY)
};

const plugins = [
    new webpack.DefinePlugin(globals),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!.git/**"]
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(SRC_DIR, "index.hbs"),
        inject: false,
        templateParameters: {
            favicon: {
                fileName: FAVICON_FILE_NAME,
                outputPath: FAVICON_OUTPUT_PATH
            }
        }
    })
];

module.exports = env => {
    const config = getConfig(env.config);

    const result = {
        mode: config.mode,
        target: "web",
        entry: {
            main: [
                path.resolve(SRC_DIR, "index.tsx"),
                path.resolve(IMAGES_DIR, FAVICON_FILE_NAME)
            ],
        },
        output: {
            filename:   "static/js/[name].[fullhash].js",
            path:       config.outputPath,
            publicPath: config.publicPath
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader", "ts-loader"]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        config.styleLoader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    config: "postcss.config.js"
                                }
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /favicon.ico/i,
                    type: "asset/resource",
                    generator: {
                        filename: `${FAVICON_OUTPUT_PATH}${FAVICON_FILE_NAME}`
                    }
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"]
                },
                {
                    test: /\.hbs$/,
                    loader: "handlebars-loader",
                }
            ]
        },
        resolve: {
            alias: {
                "$src":        SRC_DIR,
                "$components": COMPONENTS_DIR,
                "$hooks":      HOOKS_DIR,
                "$services":   SERVICES_DIR,
                "$utils":      UTILS_DIR,
                "$types":      TYPES_DIR,
                "$assets":     ASSETS_DIR
            },
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
        },
        devServer: {
            contentBase: DIST_DIR,
            inline: true,
            hot: true
        },
        devtool: config.devtool,
        plugins: config.plugins,
        optimization: {
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: {
                        format: {comments: false},
                        compress: {drop_console: true}
                    },
                    extractComments: false
                })
            ]
        }
    };

    return result;
};

function getConfig(config) {
    let mode, devtool, styleLoader;
    if (config === "development") {
        mode = "development";
        devtool = "inline-source-map";
        styleLoader = "style-loader";
    } else {
        mode = "production";
        devtool = false;
        styleLoader = MiniCssExtractPlugin.loader;

        plugins.unshift(new MiniCssExtractPlugin({
            filename: "static/css/[name].[fullhash].css"
        }));
    }

    let outputPath, publicPath;
    if (config === "gh-pages") {
        outputPath = GH_PAGES_DIR;
        publicPath = `/${REPO_NAME}/`;
    } else {
        outputPath = DIST_DIR;
        publicPath = "/";
    }

    return {
        mode: mode,
        outputPath: outputPath,
        publicPath: publicPath,
        devtool: devtool,
        styleLoader: styleLoader,
        plugins: plugins
    };
}
