import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './client'),
            '~editor': path.resolve(__dirname, './client/pages/Editor/components'),
        }
    },
    css: {
        //css预处理
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./client/styles/variables.scss";'
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 1099,
    }
})