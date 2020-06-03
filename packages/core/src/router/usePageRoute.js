import {matchRoutes} from 'react-router-config';
import {useLocation} from 'react-router-dom';
import allPageRoutes from "./allPageRoutes";

export default () => {
    const {pathname} = useLocation();
    let matched = matchRoutes(allPageRoutes || [], pathname)[0];
    if (matched && matched.route) {
        return matched.route;
    }
}
