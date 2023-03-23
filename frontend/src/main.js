import {createApp} from 'vue'
import App from './App'
import components from '@/components/UI';
import router from "@/components/routers/router";
import * as apolloProvider from './apollo.provider'


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.use(apolloProvider.provider);
app.use(router)
    .mount('#app')