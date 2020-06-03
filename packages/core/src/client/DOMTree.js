import React from 'react';
import {StoresContext, AuthStore, ThemeStore} from "../store";
import storeRegistry from "../store/storeRegistry";
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import App from '../app';

export default () => {
    const authStore = new AuthStore(window.__OREACT_DATA__.authStore);
    const themeStore = new ThemeStore(window.__OREACT_DATA__.themeStore);
    storeRegistry.setMobXState({authStore, themeStore});

    return (
        <StoresContext.Provider value={{authStore, themeStore}}>
            <BrowserRouter>
                <HelmetProvider>
                    <App/>
                </HelmetProvider>
            </BrowserRouter>
        </StoresContext.Provider>
    );
};
