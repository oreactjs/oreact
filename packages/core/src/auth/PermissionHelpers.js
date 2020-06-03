import _ from '../lodash';
import runtimeConfig from 'runtimeConfig';

export default class PermissionHelpers {

    static allPermissions = [];

    /**
     * Generate permissions from config
     * @param configs
     * @returns {*}
     */
    static generatePermissionsFromConfigs(configs) {

        if(runtimeConfig.NODE_ENV === 'production' && !_.isEmpty(PermissionHelpers.allPermissions)) return PermissionHelpers.allPermissions;

        let permissions = {
            guest: {
                home: {
                    'read:any': ['*']
                }
            }
        };

        configs.forEach((config) => {
            if (config.permissions && !_.isEmpty(config.permissions)) {
                permissions = _.merge(permissions, config.permissions);
            }
        });

        PermissionHelpers.allPermissions = permissions;

        return permissions;
    }
}
