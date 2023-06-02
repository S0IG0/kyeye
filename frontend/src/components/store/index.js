import {createStore} from "vuex";
import {authModule} from "@/components/store/authModule";
import {pageModule} from "@/components/store/pageModule";

export default createStore({
    modules: {
        auth: authModule,
        pages: pageModule,
    }
})