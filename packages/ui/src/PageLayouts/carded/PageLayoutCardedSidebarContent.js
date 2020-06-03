import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {OScrollbar} from '../../';
import clsx from 'clsx';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';

export default observer((props) =>
{
    const {themeStore} = useStores();
    const themes = themeStore.getMainThemeInfo();
    const mainThemeDark = themes.mainThemeDark;
    const classes = props.classes;

    return (
        <React.Fragment>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    <div className={clsx(classes.sidebarHeader, props.variant)}>
                        {props.header}
                    </div>
                </ThemeProvider>
            )}

            {props.content && (
                <OScrollbar className={classes.sidebarContent} enable={props.innerScroll}>
                    {props.content}
                </OScrollbar>
            )}
        </React.Fragment>
    )
});
