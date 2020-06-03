import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';

export default observer((props) => {
    const {themeStore} = useStores();
    const themes = themeStore.getMainThemeInfo();
    const mainThemeDark = themes.mainThemeDark;

    return (
        <div className={props.classes.header}>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    {props.header}
                </ThemeProvider>
            )}
        </div>
    )
})
