import {createMuiTheme} from '@material-ui/core/styles';
import OreactSettingsConfig from './settingsConfig';
import allThemes from './allThemes';
import {
    defaultSettings,
    defaultThemes,
    defaultThemeOptions,
    requiredThemeOptions
} from './defaultSettings';
import _ from '../lodash';
import mediaQuery from 'css-mediaquery';
import allLayouts from './allLayouts';

class ThemeUtils {

    static themesInfo = null;

    /**
     * SETTINGS
     */
    static getInitialSettings()
    {
        if(!allLayouts[OreactSettingsConfig.layout.type]){
            throw new Error(`Layout '${OreactSettingsConfig.layout.type}' doesn't exists`);
        }

        const defaultLayoutStyle = (OreactSettingsConfig.layout && OreactSettingsConfig.layout.type) ? OreactSettingsConfig.layout.type : "default";
        const layout = {
            type : defaultLayoutStyle,
            config: allLayouts[defaultLayoutStyle].defaults
        };
        return _.merge({}, defaultSettings, {layout}, OreactSettingsConfig);
    }

    /**
     * THEMES
     */
    static getInitialThemes()
    {
        const themesObj = _.size(allThemes) > 0 ? allThemes : defaultThemes;
        const {extendThemeWithMixins, mainThemeVariations} = this;
        const themes = Object.assign({}, ...Object.entries(themesObj).map(([key, value]) => {
                const muiTheme = _.merge({}, defaultThemeOptions, value, requiredThemeOptions);
                let theme = createMuiTheme(_.merge({}, muiTheme, {mixins: extendThemeWithMixins(muiTheme)}));
                return {
                    [key]: theme
                }
            }
        ));

        return {
            ...themes,
            ...mainThemeVariations(themesObj[this.getInitialSettings().theme.main])
        }
    }

    static updateMainThemeVariations(mainTheme)
    {
        const {mainThemeVariations} = this;
        const themesObj = _.size(allThemes) > 0 ? allThemes : defaultThemes;
        return mainThemeVariations(themesObj[mainTheme])
    }

    static getThemeOptions(themes, settings)
    {
        return {
            mainTheme   : themes[settings.theme.main],
            navbarTheme : themes[settings.theme.navbar],
            toolbarTheme: themes[settings.theme.toolbar],
            footerTheme : themes[settings.theme.footer],
            ...this.updateMainThemeVariations(settings.theme.main)
        }
    }

    static getThemeInfo(themeConfig = OreactSettingsConfig.theme){
        let initialThemes = this.getInitialThemes();
        let initialSettings = this.getInitialSettings();
        let that = this;

        this.themesInfo = {
            themes  : initialThemes,
            ...that.getThemeOptions(initialThemes, {...initialSettings, theme:{...initialSettings.theme, ...themeConfig}}),
            ...that.updateMainThemeVariations(themeConfig.main)
        };

        return this.themesInfo;
    }

    static extendThemeWithMixins(obj){
        const theme = createMuiTheme(obj);
        return {
            border      : (width = 1) => ({
                borderWidth: width,
                borderStyle: 'solid',
                borderColor: theme.palette.divider
            }),
            borderLeft  : (width = 1) => ({
                borderLeftWidth: width,
                borderStyle    : 'solid',
                borderColor    : theme.palette.divider
            }),
            borderRight : (width = 1) => ({
                borderRightWidth: width,
                borderStyle     : 'solid',
                borderColor     : theme.palette.divider
            }),
            borderTop   : (width = 1) => ({
                borderTopWidth: width,
                borderStyle   : 'solid',
                borderColor   : theme.palette.divider
            }),
            borderBottom: (width = 1) => ({
                borderBottomWidth: width,
                borderStyle      : 'solid',
                borderColor      : theme.palette.divider
            })
        }
    }

    static mainThemeVariations(theme) {
        return {
            mainThemeDark : createMuiTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'dark'}, ...requiredThemeOptions})),
            mainThemeLight: createMuiTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'light'}, ...requiredThemeOptions}))
        }
    }

    static updateSSRTheme(deviceType = 'desktop'){

        let themes = this.getThemeInfo();

        const ssrMatchMedia = query => ({
            matches: mediaQuery.match(query, {
                // The estimated CSS width of the browser.
                width: deviceType === 'mobile' ? 0 : 1024,
            }),
        });

        // Theme server side media query
        this.themesInfo = Object.assign({}, ...Object.entries(themes).map(([key, value]) => {
                let theme = themes[key];
                theme['props'] = {
                    // Change the default options of useMediaQuery
                    MuiUseMediaQuery: {ssrMatchMedia}
                };
                return {
                    [key]: theme
                }
            }
        ));
    }

}

export default ThemeUtils;
