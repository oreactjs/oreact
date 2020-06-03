import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {observer} from 'mobx-react';
import {useStores} from '../store';

export default React.memo(observer((props) => {
        const {themeStore} = useStores();
        const themes = themeStore.getMainThemeInfo();
        return (
            <ThemeProvider theme={themes.mainTheme}>
                {props.children}
            </ThemeProvider>
        )
    }
));

