import React, {useEffect} from 'react';
import {useStores} from '../store';
import {observer} from 'mobx-react';
import usePageRoute from '../router/usePageRoute';
import useLoggedIn from './useLoggedIn';
import runtimeConfig from 'runtimeConfig';
import {Redirect, useLocation} from '../router';

export default observer((props) => {
    const {authStore} = useStores();
    const {pathname} = useLocation();
    const matched = usePageRoute();
    const isLoggedInd = useLoggedIn();

    useEffect(() => {
        if(isLoggedInd && pathname === runtimeConfig.ROUTE_LOGOUT) {
            authStore.setLoginStatus({success: false});
            authStore.resetUser();
        }
    }, [pathname]);

    if(!isLoggedInd && matched && matched.allowOnlyIfLoggedIn){
        return (<Redirect status={301} from={pathname} to={runtimeConfig.ROUTE_LOGIN} />)
    } else if(isLoggedInd && pathname === runtimeConfig.ROUTE_LOGIN) {
        return (<Redirect status={301} from={runtimeConfig.ROUTE_LOGIN} to="/"/>)
    } else {
        return (<React.Fragment>{props.children}</React.Fragment>)
    }
});
