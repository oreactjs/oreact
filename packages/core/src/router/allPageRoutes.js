import RouteHelpers from './RouteHelpers';
import allRoutes from 'pages';

export default [
    ...RouteHelpers.generateRoutesFromConfigs(allRoutes || [])
];

