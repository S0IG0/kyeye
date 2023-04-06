import { Pages } from '@/components/UI/PersonalAccount/config.js'
import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        currentPage: Pages.Account
    },
    mutations: {
        setPage(state, page) {
            state.currentPage = page
        }
    }
})

export default store
