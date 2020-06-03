import _ from '../lodash';
import runtimeConfig from 'runtimeConfig';

export default class RouteHelpers {

    static allRoutes = [];
    static allNavigationLinks = [];

    /**
     * Set absolue paths
     * @param absolutePaths
     * @param currentRoute
     * @param childRoutes
     */
    static setAbsolutePaths(absolutePaths, currentRoute, childRoutes) {
        if (currentRoute && currentRoute.path && childRoutes && _.isArray(childRoutes)) {

            let currentPaths = [...currentRoute.path];
            _.map(childRoutes, (route) => {
                if (route && _.isObject(route) && route.address) {

                    if (_.isString(route.address)) {
                        route.path = [route.address];
                    } else if (_.isArray(route.address)) {
                        route.path = _.clone(route.address);
                    } else {
                        throw new Error('Please provide route address.');
                    }

                    let paths = [];
                    route.path.map((path, index) => {
                        for (let j = 0; j < currentRoute.path.length; j++) {
                            paths.push(`${currentRoute.path[j]}${path}`);
                        }
                    });
                    route.path = paths;
                    currentPaths = [...currentPaths, ...route.path];

                } else {
                    throw Error('Route properties missing');
                }
            });

            currentRoute.path = [...currentPaths];
            absolutePaths.path = [...absolutePaths.path, ...currentRoute.path];

            _.map(childRoutes, (route) => {
                if (route && route.routes) {
                    if(_.isArray(route.routes)){
                        this.setAbsolutePaths(absolutePaths, route, route.routes);
                    } else {
                        throw Error('Child routes types should be an array.');
                    }
                }
            });
        }
    }

    static setRoutes(config) {
        let routes = config.routes || [];
        routes = routes.map((route) => {
            // Set address
            if (_.isString(route.address)) {
                route.path = [route.address];
            } else if (_.isArray(route.address)) {
                route.path = _.clone(route.address);
            } else {
                throw new Error('Please provide route address.');
            }
            if (route.routes && !_.isEmpty(route.routes)) {
                if (_.isArray(route.routes)) {
                    let absolutePaths = {path: []};
                    this.setAbsolutePaths(absolutePaths, route, route.routes);
                    route.path = _.clone(absolutePaths.path);
                } else {
                    throw Error('Child routes types should be an array.');
                }
            }

            return {
                ...route,
                settings: {...config.settings, ...route.settings},
                stores: {...config.stores}
            };
        });
        return routes;
    }

    /**
     * Generate routes from page configs
     * @param configs
     * @returns {Array}
     */
    static generateRoutesFromConfigs(configs) {

        if (runtimeConfig.NODE_ENV === 'production' && !_.isEmpty(RouteHelpers.allRoutes)) return RouteHelpers.allRoutes;

        let allRoutes = [];
        configs.forEach((config) => {
            allRoutes = [
                ...allRoutes,
                ...this.setRoutes(config)
            ]
        });

        RouteHelpers.allRoutes = allRoutes || [];
        return allRoutes;
    }

    /**
     * Set navigation links
     * @param allNavigationLinks
     * @param childRoutes
     */
    static setNavigationLinks(allNavigationLinks, childRoutes) {
        if (childRoutes && _.isArray(childRoutes)) {

            // push navigation links
            _.map(childRoutes, (route) => {
                if (route && _.isObject(route) && route.address) {

                        let navLink = {};
                        if (route && route.navbar && route.navbar.id) {
                            navLink = {
                                ...route.navbar,
                                url: (_.isArray(route.path) ? route.path[0] : route.path)
                            };
                        }

                        let children = {links: []};
                        if (route && route.routes && _.isArray(route.routes)) {
                            this.setNavigationLinks(children, route.routes);
                        }

                        if (!_.isEmpty(navLink) && !_.isEmpty(children.links)) {
                            navLink = {...navLink, children: children.links};
                            allNavigationLinks.links = [...allNavigationLinks.links, navLink];
                        } else if (!_.isEmpty(navLink) && _.isEmpty(children.links)) {
                            allNavigationLinks.links = [...allNavigationLinks.links, navLink];
                        } else if (_.isEmpty(navLink) && !_.isEmpty(children.links)) {
                            allNavigationLinks.links = [...allNavigationLinks.links, ...children.links];
                        }


                }
            });
        }
    }

    /**
     * Generate navigation links for navigation bar
     * @param config
     */
    static generateNavigationLinks(config) {

        if (runtimeConfig.NODE_ENV === 'production' && !_.isEmpty(RouteHelpers.allNavigationLinks)) return RouteHelpers.allNavigationLinks;

        let allRoutes = RouteHelpers.generateRoutesFromConfigs(config);
        let allNavigationLinks = {links: []};

        _.map(allRoutes, (route) => {

            let navLink = {};
            if (route && route.navbar && route.navbar.id) {
                navLink = {
                    ...route.navbar,
                    url: (_.isArray(route.path) ? route.path[0] : route.path)
                };
            }

            let children = {links: []};
            if (route && route.routes) {
                if(_.isArray(route.routes)){
                    this.setNavigationLinks(children, route.routes);
                } else {
                    throw Error('Child routes types should be an array.');
                }
            }

            if (!_.isEmpty(navLink) && !_.isEmpty(children.links)) {
                navLink = {...navLink, children: children.links};
                allNavigationLinks.links = [...allNavigationLinks.links, navLink];
            } else if (!_.isEmpty(navLink) && _.isEmpty(children.links)) {
                allNavigationLinks.links = [...allNavigationLinks.links, navLink];
            } else if (_.isEmpty(navLink) && !_.isEmpty(children.links)) {
                allNavigationLinks.links = [...allNavigationLinks.links, ...children.links];
            }
        });

        RouteHelpers.allNavigationLinks = allNavigationLinks.links || [];

        return allNavigationLinks.links;
    }
}
