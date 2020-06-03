import React from "react";
import {Route, Redirect} from 'react-router-dom';

export default ({ from, to, status }) => {
    return (
        <Route
            render={({ staticContext }) => {
                // there is no `staticContext` on the client, so
                // we need to guard against that here
                if (staticContext) staticContext.status = status || 200;
                return <Redirect from={from} to={to} />;
            }}
        />
    );
}