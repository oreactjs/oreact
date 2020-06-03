import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {withRouter} from 'react-router-dom';
import _ from '../lodash';
import {useStores, StoresContext} from '../store';
import storeRegistry from '../store/storeRegistry';
import usePageRoute from '../router/usePageRoute';
import ThemeProvider from './ThemeProvider';
import allLayouts from './allLayouts';
import appStores from 'stores';
import runtimeConfig from 'runtimeConfig';
import {allPageRoutes} from "../router";
import {renderRoutes} from "react-router-config";
import useLayoutConfig from './useLayoutConfig';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        '& code:not([class*="language-"])': {
            color: theme.palette.secondary.dark,
            backgroundColor: '#F5F5F5',
            padding: '2px 3px',
            borderRadius: 2,
            lineHeight: 1.7
        },
        '& table.simple tbody tr td': {
            borderColor: theme.palette.divider
        },
        '& table.simple thead tr th': {
            borderColor: theme.palette.divider
        },
        '& a:not([role=button])': {
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        '& [class^="border-"]': {
            borderColor: theme.palette.divider
        },
        '& [class*="border-"]': {
            borderColor: theme.palette.divider
        }
    }
}));
const pageRoutes = renderRoutes(allPageRoutes);

const PageLayout = (props) => {
    const classes = useStyles(props);
    const config = useLayoutConfig();
    return <props.layout.component classes={{root: classes.root}} pageRoutes={pageRoutes} config={config}/>;
};

export default withRouter(React.memo((props) => {
    const stories = useStores();
    const defaultSettings = stories.themeStore.settings.defaults;
    const settings = stories.themeStore.settings.current;
    const matched = usePageRoute();
    const routeSettings = _.merge({}, defaultSettings, matched.settings);
    const CurrentLayout = allLayouts[routeSettings.layout.type];

    const setStore = (configStores) => {
        _.forEach(configStores, (store, key) => {
            if (!stories[key]) {
                if (!runtimeConfig.IS_SERVER) {
                    stories[key] = new store(window.__OREACT_DATA__[key]);
                    storeRegistry.setMobXState(stories);
                } else {
                    stories[key] = new store();
                }
            }
        });
    };

    // Page store
    if (matched && matched.stores && !_.isEmpty(matched.stores)) {
        setStore(matched.stores);
    }

    // Config Global/App stores
    if (appStores && !_.isEmpty(appStores)) {
        setStore(appStores);
    }

    // Set theme
    (() => {
        if (matched && matched.settings) {
            const routeSettings = _.merge({}, matched.settings);
            if (!_.isEqual(settings, routeSettings)) {
                stories.themeStore.setThemeSettings(_.merge({}, routeSettings));
            }
        }
        else {
            if (!_.isEqual(settings, defaultSettings)) {
                stories.themeStore.resetThemeSettings();
            }
        }
    })();

    return (
        <StoresContext.Provider value={stories}>
            <ThemeProvider>
                <PageLayout layout={CurrentLayout}/>
            </ThemeProvider>
        </StoresContext.Provider>
    );
}));


