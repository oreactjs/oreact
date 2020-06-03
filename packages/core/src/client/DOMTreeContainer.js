import React from 'react';
import storeRegistry from "../store/storeRegistry";
import {StoresContext} from '../store';
import ThemeProvider from '../theme/ThemeProvider';


export default (props) => {
    let mobxState = storeRegistry.getMobXState();
    return (<StoresContext.Provider value={mobxState}><ThemeProvider>{props.children}</ThemeProvider></StoresContext.Provider>);
};
