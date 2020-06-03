import App from '../app';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {ChunkExtractorManager} from '../loadable';
import {HelmetProvider} from 'react-helmet-async'
import {StoresContext} from '../store';

export default (props) => {
    return (
        <StoresContext.Provider value={props.stores}>
            <ChunkExtractorManager extractor={props.extractor}>
                <StaticRouter
                    context={props.routerContext} location={props.reqUrl}>
                    <HelmetProvider context={props.headerContext}>
                        <App/>
                    </HelmetProvider>
                </StaticRouter>
            </ChunkExtractorManager>
        </StoresContext.Provider>
    );
};
