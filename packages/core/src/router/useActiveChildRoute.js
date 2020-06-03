import {matchRoutes} from 'react-router-config';
import {useLocation} from 'react-router-dom';

export default (props) => {
    const {pathname} = useLocation();
    let matched = matchRoutes(props.route.routes || [], pathname)[0];
    if (matched && matched.route) {
        return matched.route;
    }
    return false;
}
