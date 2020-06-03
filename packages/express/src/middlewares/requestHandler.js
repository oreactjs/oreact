import DOMTree from '@oreact/core/server/DOMTree';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import ServerHTML from '@oreact/core/server/ServerHTML';
import React from "react";
/**
 * Handle web requests for server side renderings
 * @param req
 * @param res
 */
export default async (req, res) => {

    const {
        pageProperties: {
            routerContext,
            styleSheets
        }
    } = res.locals;

    const App = <DOMTree {...res.locals.pageProperties} reqUrl={req.url}/>;

    // Get data and markup from tree
    const appString = await renderToString(styleSheets.collect(App));

    // Generate the html response.
    const html = renderToStaticMarkup(
        <ServerHTML
            reactAppString={appString}
            nonce={nonce}
            locals={res.locals}
            apolloState={{}}
        />,
    );

    if (routerContext.url) {
        return res.redirect(routerContext.url)
    } else {
        return res.status(routerContext.statusCode || 200).send(`<!DOCTYPE html>${html}`);
    }

};
