import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {OScrollbar} from '../../';
import clsx from 'clsx';
import {observer} from 'mobx-react';
import {useStores} from '@oreact/core/store';

export default observer((props) => {

    const {themeStore} = useStores();
    const themes = themeStore.getMainThemeInfo();
    const mainThemeDark = themes.mainThemeDark;
    const classes = props.classes;

    return (
        <OScrollbar enable={props.innerScroll}>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    <div
                        className={clsx(classes.sidebarHeader, props.variant, props.sidebarInner && classes.sidebarHeaderInnerSidebar)}>
                        {props.header}
                    </div>
                </ThemeProvider>
            )}

            {props.content && (
                <div className={classes.sidebarContent}>
                    {props.content}
                </div>
            )}
        </OScrollbar>
    );
});
