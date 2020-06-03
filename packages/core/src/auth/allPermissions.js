import PermissionHelpers from './PermissionHelpers';
import allPageRoutes from 'pages';
export default PermissionHelpers.generatePermissionsFromConfigs(allPageRoutes || []);

