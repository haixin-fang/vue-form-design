import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '~editor': path.resolve(__dirname, './src/pages/Editor/components'),
        }
    },
    css: {
        //css预处理
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/styles/variables.scss";'
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 1099,
    }
})