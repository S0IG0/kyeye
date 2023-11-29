import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@src': "/src",
            '@ui': "/src/component/ui",
            '@ux': "/src/component/ux",
            '@page': "/src/component/page",
            '@route': "/src/component/route",
            '@api': "/src/component/api",
            '@service': "/src/component/service",
            '@model': "/src/component/model",
            '@store': "/src/component/store",
        }
    },

    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5173,
        hmr: {
            overlay: false,
            clientPort: 5173,
        }
    },
})
