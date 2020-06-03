import React from 'react';
import {Snackbar, IconButton, Icon, SnackbarContent} from '@material-ui/core';
import {green, amber, blue} from '@material-ui/core/colors';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {observer} from 'mobx-react'
import {useStores} from '@oreact/core/store';

const useStyles = makeStyles(theme => ({
    root: {},
    success: {
        backgroundColor: green[600],
        color: '#FFFFFF'
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.getContrastText(theme.palette.error.dark)
    },
    info: {
        backgroundColor: blue[600],
        color: '#FFFFFF'
    },
    warning: {
        backgroundColor: amber[600],
        color: '#FFFFFF'
    }
}));

const variantIcon = {
    success: "check_circle",
    warning: "warning",
    error: "error_outline",
    info: "info"
};

export default React.memo(observer((props) => {
    const {themeStore} = useStores();
    const state = themeStore.message.state;
    const options = themeStore.message.options;
    const classes = useStyles();

    return (
        <Snackbar
            {...options}
            open={state}
            onClose={() => themeStore.hideMessage({})}
            classes={{
                root: classes.root
            }}
            ContentProps={{
                variant: 'body2',
                headlineMapping: {
                    body1: 'div',
                    body2: 'div'
                }
            }}
        >
            <SnackbarContent
                className={clsx(classes[options.variant])}
                message={
                    <div className="flex items-center">
                        {variantIcon[options.variant] && (
                            <Icon className="mr-8" color="inherit">{variantIcon[options.variant]}</Icon>
                        )}
                        {options.message}
                    </div>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => themeStore.hideMessage({state: true})}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}));
