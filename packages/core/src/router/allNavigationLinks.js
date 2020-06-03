import RouteHelpers from './RouteHelpers';
import allPageRoutes from 'pages';

export default [
    ...RouteHelpers.generateNavigationLinks(allPageRoutes || [])
];

