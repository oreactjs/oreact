import _ from '../lodash';
import {renderRoutes} from 'react-router-config';

export default (props) => {
    const {routes} = props.route;
    if(routes && !_.isEmpty(routes)){
        return () => renderRoutes(routes);
    }
    return () => {};
}
