const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;


const commonConfig = {
    entry: "./src/index.ts",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "src")],
            },
            {
                test: /\.csv$/,
                use: "raw-loader",
                include: [path.resolve(__dirname, "src")],
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".js", "tsx", "jsx"],
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules")
        ]
    },

    externals: {
        tslib: "tslib",
        anime: "anime"
    }
};

const localConfig = {
    ...commonConfig,

    name: "local",

    mode: "development",

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "app.js",
        publicPath: "/",
    },

    devServer: {
        compress: true,
        port: 9004,
        historyApiFallback: {
            rewrites: [
                { from: "./dist/app.js", to: "/app.js" },
                { from: "./playzido-configs/index.html", to: "/index.html" },
            ],
        },
    },

    devtool: "source-map",

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./assets", to: "./assets" },
                { from: "./playzido-configs", to: "./" },
            ],
        }),
        new DefinePlugin({
            __ENVIRONMENT__: `"DEV"`,
        }),
    ],
};

const prodConfig = {
    ...commonConfig,

    name: "prod",

    mode: "production",

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "./app.js",
        publicPath: "./",
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "./assets", to: "./assets" },
                { from: "./playzido-configs", to: "./" },
            ],
        }),
        new DefinePlugin({
            __ENVIRONMENT__: `"PROD"`,
            __TESTSTAND__: `"TRUE"`
        }),
    ],
};

module.exports = [localConfig, prodConfig];
