import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
import router from "@/components/routers/router";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.use(router)
    .mount('#app')
