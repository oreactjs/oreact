// src/stores/theme-store.tsx
import {observable, action} from 'mobx'
import _ from '../../lodash';
import ThemeUtils from '../../theme/ThemeUtils';
import allLayouts from '../../theme/allLayouts';

const initialSettings = ThemeUtils.getInitialSettings();

export default class ThemeStore {

    @observable
    dialog = {
        state: false,
        options: {
            children: 'Hi'
        }
    };

    @observable
    message = {
        state: null,
        options: {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            },
            autoHideDuration: 6000,
            message: "Hi",
            variant: null
        }
    };

    @observable
    navbar = {
        foldedOpen: false,
        mobileOpen: false
    };

    @observable
    navigation = [

    ];

    @observable
    settings = {
        initial: initialSettings,
        defaults: _.merge({}, initialSettings),
        current: _.merge({}, initialSettings)
    };

    infiniteScrollRef = null;

    constructor(initialState) {
        if (initialState) {
            this.dialog = initialState.dialog;
            this.message = initialState.message;
            this.navbar = initialState.navbar;
            this.navigation = initialState.navigation;
            this.settings = initialState.settings;
        }
    }

    @action
    openDialog(state = {}) {
        this.dialog = {
            ...this.dialog,
            state: true,
            options: {
                ...state.options
            }
        };
    }

    @action
    closeDialog(state = {}) {
        this.dialog = {...this.dialog, state: false};
    }


    @action
    showMessage(state = {}) {
        this.message = {
            ...state,
            state: true,
            options: {
                ...state.options
            }
        };
    }

    @action
    hideMessage(state = {}) {
        this.message = {...state, state: null};
    }

    @action
    setNavbarState(state = {}) {
        this.navbar = {...state};
    }

    @action
    setNavigationState(state = {}) {
        this.navigation = state;
    }

    @action
    setThemeSettings(state = {}) {
        if(state && state.layout && state.layout.type && !allLayouts[state.layout.type]){
            throw new Error(`Layout '${state.layout.type}' doesn't exists`);
        }

        const newSettings = _.merge({}, this.settings.current, state && state.layout && state.layout.type ? {layout: {config: allLayouts[state.layout.type].defaults}} : {}, state);
        this.settings = {
            ...this.settings,
            current: newSettings
        };
    }

    @action
    resetThemeSettings(){
        //const themes = {...state.themes, ...ThemeUtils.updateMainThemeVariations(state.defaults.theme.main)};
        this.settings = {
            ...this.settings,
            defaults: _.merge({}, this.settings.defaults),
            current : _.merge({}, this.settings.defaults)
        };
    }

    @action
    getMainThemeInfo(){
        return ThemeUtils.getThemeInfo(this.settings.current.theme);
    }

    @action
    updateSSRMediaQuery(deviceType){
        ThemeUtils.updateSSRTheme(deviceType);
    }

    @action
    setInfiniteScrollParent(parent){
        this.infiniteScrollRef = parent;
    }

    toJSON() {
        return {
            dialog: this.dialog,
            message: this.message,
            navbar: this.navbar,
            navigation: this.navigation,
            settings: this.settings
        };
    }
}
