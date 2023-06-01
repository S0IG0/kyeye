// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     allowedHosts: "all",
//   },
// })
const {resolve} = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    transpileDependencies: true,
    devServer: {
        allowedHosts: "all",
    },
    configureWebpack: {
        plugins: [
            new Dotenv({
                path: resolve(__dirname, '.env'),
                systemvars: true,
            }),
        ],
    },
};
