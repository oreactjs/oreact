import _ from '@oreact/core/lodash';
import express from 'express';
import {allPageRoutes} from '@oreact/core/router';
import ssrRequestHandler from '../middlewares/ssrRequestHandler';
import requestHandler from '../middlewares/requestHandler'

export default (requestHandlers) => {
    const pageRequestHandlers = requestHandlers ? requestHandlers : [requestHandler];
    const router = express.Router();

    const setRoutes = (routes) => {
        if (routes && _.isArray(routes)) {
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].path) {
                    router.get(routes[i].path, ssrRequestHandler, pageRequestHandlers);
                }
            }
        }
    };

    // Config App page routes
    if (!_.isEmpty(allPageRoutes) && allPageRoutes) {
        setRoutes(allPageRoutes);
    }

    return router;
}
