'use strict';
const path = require('path');
const fs = require('fs');

const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const loaderFinder = require('razzle-dev-utils/makeLoaderFinder');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const scssExtend = require('./scss');
const graphqlExtend = require('./graphql');

module.exports = (
    config,
    {target, dev},
    webpack,
    userOptions = {}
) => {

    let appConfig = Object.assign({}, config);

    // Webpack config
    appConfig['resolve']['modules'] = [
        ...appConfig['resolve']['modules'],
        'src',
        'src/app'
    ];
    appConfig['resolve']['alias'] = {
        ...appConfig['resolve']['alias'],
        react: resolveApp('node_modules/react'),
        'react-dom': resolveApp('node_modules/react-dom'),
        '@material-ui/styles': resolveApp('node_modules/@material-ui/styles')
    };
    appConfig['resolve']['extensions'] = [...appConfig['resolve']['extensions'], '.ts', '.tsx'];

    // Reference : https://github.com/smooth-code/loadable-components/blob/master/examples/razzle/razzle.config.js
    if (target === 'web') {

        // Extend webpack plugin by loadable
        appConfig.plugins = [
            ...appConfig.plugins,
            new LoadableWebpackPlugin({
                filename: 'chunks.json',
                writeToDisk: {filename : resolveApp('build')},
                outputAsset: false
            })
        ];

        // Fix style order for development
        if(dev) {
            appConfig['devServer'] = {
                ...appConfig['devServer'],
                inline: true
            };

            const cssRule = appConfig.module.rules.find(loaderFinder('style-loader'));
            cssRule.use[0] = {
                loader: cssRule.use[0],
                options: {
                    insertInto: 'body'
                }
            };

        } else {
            appConfig.output = {
                ...appConfig.output,
                filename: 'static/js/[name].[chunkhash:8].js'
            }
        }

        appConfig.node = {fs: 'empty'}; // fix "Cannot find module 'fs'" problem.
        appConfig.optimization = Object.assign({}, appConfig.optimization, {
            runtimeChunk: true,
            splitChunks: {
                chunks: 'all',
                name: dev,
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: -5,
                        chunks: 'all'
                    }
                }
            }
        });
    }

    // Graphql config
    appConfig = graphqlExtend(appConfig,{ target, dev }, webpack, userOptions);
    return scssExtend(appConfig, { target, dev }, webpack, userOptions);
};
