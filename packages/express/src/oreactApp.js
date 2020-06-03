import express from 'express';
import helmet from 'helmet';
import getPageRouter from "./router/getPageRouter";
import getSecurityHandlers from './middlewares/getSecurityHandlers';
import path from 'path';

const app = express();

/**
 *
 * @param authHandlers
 * @param requestHandlers
 * @param options
 * @returns {app}
 */
export default (authHandlers, requestHandlers, options) => {
    // Page request handler
    let router = getPageRouter(requestHandlers || null);

    // Auth handler
    const authenticationHandlers = authHandlers ? authHandlers : async (req, res, next) => {
        next();
    };

    // Security config
    const securityHandler = getSecurityHandlers(options)

    // Security handlers using helmet
    app.use(...securityHandler);
    app.use(helmet());

    // Set auth Locales
    app.disable('x-powered-by')
        .use(express.static(process.env.NODE_ENV==='production' ? path.join(__dirname, '../build/public') : 'public'))
        .use(authenticationHandlers)
        .use('/', router);

    return  app;
}
