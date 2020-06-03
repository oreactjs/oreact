import React from 'react';
import {Dialog} from '@material-ui/core';
import {observer} from 'mobx-react'
import {useStores} from '@oreact/core/store';

export default observer((props) => {
    const {themeStore} = useStores();
    const state = themeStore.dialog.state;
    const options = themeStore.dialog.options;

    return (
        <Dialog
            open={state}
            onClose={ev => themeStore.closeDialog()}
            aria-labelledby="oreact-dialog-title"
            {...options}
        />
    );
});


