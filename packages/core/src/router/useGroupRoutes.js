import _ from '../lodash';
import {renderRoutes} from 'react-router-config';

export default (props) => {
    const {routes} = props.route;
    if(routes && !_.isEmpty(routes)){
        let groups = _.groupBy(routes, (o) => o.groupBy || 'unGrouped');
        _.forEach(groups, (group, key) => {
            groups[key] = () => renderRoutes(group);
        });
        return groups;
    }
    return {};
}
