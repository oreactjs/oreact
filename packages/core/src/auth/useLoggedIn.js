import _ from '../lodash';
import {useStores} from '../store';

export default () =>{
    const {authStore: {user}} = useStores();
    return user && !_.isEmpty(user.role) ? true : false;
}
