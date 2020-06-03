import {matchRoutes} from 'react-router-config';
import {allPageRoutes} from '../router';

export default(pathname) => {
    let matched = matchRoutes(allPageRoutes, pathname)[0];
    if (matched && matched.route) {
        return matched.route;
    }
};

