import axios from "axios";
import {specialWord, urlBackend} from "@/components/config";
import login from "@/components/pages/Login.vue";

export const authModule = {
    state: () => ({
        isAuth: false,
        isLoading: false,
        token: {
            refresh: '',
            access: ''
        },
        error: undefined,
    }),
    getters: {
        getAuthorization(state) {
            return `${specialWord} ${state.token.access}`
        },
        decodeAccess(state) {
            try {
                return JSON.parse(atob(state.token.access.split('.')[1]));
            } catch (exception) {
                return null;
            }
        }
    },
    mutations: {
        setIsAuth(state, bool) {
            state.isAuth = bool;
        },
        setLoading(state, bool) {
            state.isLoading = bool
        },
        setAccess(state, access) {
            state.token.access = access
        },
        setRefresh(state, refresh) {
            state.token.refresh = refresh
        },
        setError(state, error) {
            state.error = error;
        }
    },
    actions: {
        async login({state, commit}, {email, password}) {
            commit('setLoading', true)
            await axios({
                method: 'post',
                url: `${urlBackend}/api/token/`,
                data: {
                    'email': email,
                    'password': password,
                },
            }).then(response => {
                commit('setError', undefined)
                commit('setRefresh', response.data.refresh)
                commit('setAccess', response.data.access)
                localStorage.setItem('JwtToken', JSON.stringify(state.token));
                commit('setIsAuth', true)
            }).catch(error => {
                commit('setError', error)
                commit('setIsAuth', false)
            }).finally(() => {
                commit('setLoading', false)
            })
        },
        async refreshAccess({state, commit}) {
            commit('setLoading', true)
            await axios({
                method: 'post',
                url: `${urlBackend}/api/token/refresh/`,
                data: {
                    'refresh': state.token.refresh,
                }
            }).then(response => {
                commit('setError', undefined)
                commit('setAccess', response.data.access)
                localStorage.setItem('JwtToken', JSON.stringify(state.token));
            }).catch(error => {
                commit('setError', error)
                commit('setIsAuth', false)
            }).finally(() => {
                commit('setLoading', false)
            })
        },

        async checkIsActiveToken({state, commit}, {token}) {
            let is_active = false;
            await axios({
                method: "post",
                url: `${urlBackend}/api/token/verify/`,
                data: {
                    'token': token,
                },
            }).then(() => {
                commit('setError', undefined)
                is_active = true;
            }).catch(error => {
                commit('setError', error)
            })
            return is_active;
        },

        logout({state, commit}) {
            commit('setIsAuth', false)
            commit('setError', undefined)
            commit('setRefresh', '')
            commit('setAccess', '')
            localStorage.removeItem('JwtToken')
            localStorage.removeItem('currentPage')
        },
        async loadToLocalStorage({state, commit, dispatch}) {
            const data = JSON.parse(localStorage.getItem('JwtToken'));
            if (!data) {
                return
            }
            commit('setRefresh', data.refresh)
            commit('setAccess', data.access)
            if (await dispatch('checkIsActiveToken', {token: data.refresh}).then() === false) {
                dispatch('logout')
                return
            }
            if (await dispatch('checkIsActiveToken', {token: data.access}).then() === false) {
                await dispatch('refreshAccess')
                if (state.error !== undefined) {
                    dispatch('logout')
                    return
                }
            }
            commit('setIsAuth', true)
        },

        // await axios({
        //     method: method,
        //     url: url,
        //     data: data,
        //     headers: {
        //         Authorization: this.JwtToken.getAuthorization(),
        //     }

    },
    namespaced: true
}