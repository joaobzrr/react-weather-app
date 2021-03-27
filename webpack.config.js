const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootDir       = __dirname;
const srcDir        = path.resolve(rootDir,   "src");
const componentsDir = path.resolve(srcDir,    "components");
const hooksDir      = path.resolve(srcDir,    "hooks");
const coreDir       = path.resolve(srcDir,    "core");
const assetsDir     = path.resolve(srcDir,    "assets");
const imagesDir     = path.resolve(assetsDir, "images");
const distDir       = path.resolve(rootDir,   "dist");
const ghPagesDir    = path.resolve(rootDir,   "gh-pages");

const dotenv = require("dotenv").config({
    path: path.resolve(rootDir, ".env")
}).parsed;

const plugins = [
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!.git/**"]
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(srcDir, "index.hbs"),
        inject: false,
        templateParameters: {
            favicon: {
                fileName: dotenv.faviconFileName,
                outputPath: dotenv.faviconOutputPath
            }
        }
    })
];

const postCssLoader = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            config: "postcss.config.js"
        }
    }
};

module.exports = env => {
    const config = getConfig(env.config);

    const result = {
        mode: config.mode,
        target: "web",
        entry: {
            main: [
                path.resolve(srcDir, "index.tsx"),
                path.resolve(imagesDir, dotenv.faviconFileName)
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
                        postCssLoader,
                        "sass-loader"
                    ]
                },
                {
                    test: /favicon.ico/i,
                    type: "asset/resource",
                    generator: {
                        filename: `${dotenv.faviconOutputPath}${dotenv.faviconFileName}`
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
                "$src":        srcDir,
                "$components": componentsDir,
                "$hooks":      hooksDir,
                "$core":       coreDir,
                "$assets":     assetsDir
            },
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
        },
        devServer: {
            contentBase: distDir,
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
        outputPath = ghPagesDir;
        publicPath = `/${dotenv.repoName}/`;
    } else {
        outputPath = distDir;
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
