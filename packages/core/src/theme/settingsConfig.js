import _ from '../lodash';
import appConfig from 'app/config';

export default _.merge({}, {
    layout          : {
        type : 'default', // default Layout
        config: {}
    },
    customScrollbars: true,
    theme           : {
        main   : 'default',
        navbar : 'default',
        toolbar: 'default',
        footer : 'default'
    }
}, appConfig.defaultSettings || {});
