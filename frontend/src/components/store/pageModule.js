import {Pages} from "@/components/store/config";

export const pageModule = {
    state: () => ({
        currentPage: Pages.Account
    }),
    getters: {},
    mutations: {
        setPage(state, page) {
            state.currentPage = page
            localStorage.setItem('currentPage', JSON.stringify(state.currentPage));
        }
    },
    actions: {
        loadToLocalStorage({state, commit, dispatch}) {
            const data = JSON.parse(localStorage.getItem('currentPage'));
            if (!data) {
                return
            }
            commit('setPage', data)
        }
    },
    namespaced: true
}