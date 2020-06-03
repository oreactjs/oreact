// src/stores/theme-store.tsx
import {observable, action} from 'mobx'

export default class AuthStore {

    @observable
    login = {
        success: false
    }

    @observable
    register = {
        success: false
    }

    @observable
    user = {
        role: []//guest
    }

    constructor(initialState) {
        if (initialState) {
            this.login = initialState.login;
            this.register = initialState.register;
            this.user = initialState.user;
        }
    }

    @action
    setLoginStatus(status) {
        this.login = {...this.login, ...status};
    }

    @action
    setRegisterStatus(status) {
        this.register = {...this.register, ...status};
    }

    @action
    setUser(user) {
        this.user = user;
    }

    @action
    resetUser() {
        this.user = {
            role: [],//guest
            data: {

            }
        };
    }

    toJSON() {
        return {
            login: this.login,
            register: this.register,
            user: this.user
        };
    }
}
