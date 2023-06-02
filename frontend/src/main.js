import {createApp} from 'vue'
import App from './App'
import components from '@/components/UI';
import router from "@/components/routers/router";
import * as apolloProvider from './apollo.provider'
import store from "@/components/store";


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.use(apolloProvider.provider);
app.use(store);
app.use(router)
    .mount('#app')