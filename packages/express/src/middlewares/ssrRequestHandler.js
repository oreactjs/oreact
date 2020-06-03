import _ from '@oreact/core/lodash';
import path from 'path'
import {ServerStyleSheets} from '@material-ui/styles';
import {ChunkExtractor} from '@oreact/core/loadable';
import {useStaticRendering} from 'mobx-react';
import {AuthStore, ThemeStore} from '@oreact/core/store';
import parser from "ua-parser-js";
import getBaseRoute from '@oreact/core/server/getBaseRoute';
import {allNavigationLinks} from '@oreact/core/router';

const updateStore = (req, {authStore, themeStore}) => {

    // SSR on media query
    themeStore.updateSSRMediaQuery(parser(req.headers['user-agent']).device.type || 'desktop');

    let themeSettings = themeStore.settings;

    // Theme layout config
    const settings = themeSettings.current;
    let defaultSettings = themeSettings.defaults;
    const matched = getBaseRoute(req.path);

    if (matched && matched.settings) {
        const routeSettings = _.merge({}, defaultSettings, matched.settings);
        if (!_.isEqual(settings, routeSettings)) {
            themeStore.setThemeSettings(_.merge({}, routeSettings));
        }
    } else {
        if (!_.isEqual(settings, defaultSettings)) {
            themeStore.resetThemeSettings();
        }
    }

    // Set navigation state
    themeStore.setNavigationState(allNavigationLinks);

    // Return user if logged in
    if (req.loggedInUser) {
        authStore.setUser(req.loggedInUser);
        authStore.setLoginStatus({
            success: true
        });
    }
};

export default async (req, res, next) => {

    if (typeof res.locals.nonce !== 'string') {
        throw new Error('A "nonce" value has not been attached to the response');
    }

    useStaticRendering(true);
    const routerContext ={};
    const headerContext = {};

    // We create an extractor from the statsFile
    const extractor = new ChunkExtractor({
        statsFile: path.resolve('build/chunks.json'),
        entrypoints: ['client']
    });

    const stores = {
        authStore: new AuthStore(),
        themeStore: new ThemeStore()
    };
    updateStore(req, stores);

    const styleSheets = new ServerStyleSheets();

    res.locals.pageProperties = {
        routerContext,
        headerContext,
        extractor,
        stores,
        styleSheets
    };

    return next();
};
