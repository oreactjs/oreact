'use strict';
const loaderFinder = require('razzle-dev-utils/makeLoaderFinder');

module.exports = (
  appConfig,
  { target, dev },
  webpack,
  userOptions = {}
) => {

    // Add graphql query import/loading support
    appConfig.resolve.extensions.push(".graphql", ".gql");
    appConfig.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'graphql-tag/loader'
            }
        ]
    });
    appConfig.module.rules[appConfig.module.rules.findIndex(loaderFinder("file-loader"))].exclude.push(/\.(graphql|gql)$/);
    // Graphql Ends

    return appConfig;
};
