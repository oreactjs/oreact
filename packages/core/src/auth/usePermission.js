import _ from '../lodash';
import {useStores} from '../store';
import accessControls from './accessControls';

export default (cb) =>{
    const {authStore: {user}} = useStores();
    const roles = user && !_.isEmpty(user.role) ? user.role : ['guest'];
    return cb(accessControls.can(roles));
}
