import _ from "../lodash";

export default (params) => {

    let config = {};
    config['IS_SERVER'] = typeof window == 'undefined';
    config['NODE_ENV'] = typeof window !== 'undefined'? window.env['NODE_ENV'] : process.env['NODE_ENV'];

    _.map(params, (paramKey, i) => {
        config[paramKey] = typeof window !== 'undefined'? window.env[paramKey] : process.env[paramKey];
    });

    return config;
}
