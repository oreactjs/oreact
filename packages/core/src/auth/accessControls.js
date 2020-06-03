import AccessControl from 'accesscontrol';
import allPermissions from './allPermissions';
export default new AccessControl(allPermissions || {});
