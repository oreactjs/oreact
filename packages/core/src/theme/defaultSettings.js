import {oreactDark} from './colors';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

export const defaultSettings = {
    customScrollbars: true,
    theme: {
        main: 'default',
        navbar: 'mainThemeDark',
        toolbar: 'mainThemeLight',
        footer: 'mainThemeDark'
    }
};

export const defaultThemeOptions = {
    typography: {
        fontFamily: [
            'Muli',
            'Roboto',
            '"Helvetica"',
            'Arial',
            'sans-serif'
        ].join(','),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        useNextVariants: true,
        suppressDeprecationWarnings: true
    }
};

export const requiredThemeOptions = {
    typography: {
        htmlFontSize: 10,
        body1: {
            fontSize: "1.4rem",
        },
        body2: {
            fontSize: "1.4rem",
        }
    }
};

export const defaultThemes = {
    default: {
        palette: {
            type: 'light',
            primary: oreactDark,
            secondary: {
                light: lightBlue[400],
                main: lightBlue[600],
                dark: lightBlue[700]
            },
            error: red
        },
        status: {
            danger: 'orange'
        }
    },
    defaultDark: {
        palette: {
            type: 'dark',
            primary: oreactDark,
            secondary: {
                light: lightBlue[400],
                main: lightBlue[600],
                dark: lightBlue[700]
            },
            error: red
        },
        status: {
            danger: 'orange'
        }
    }
};
