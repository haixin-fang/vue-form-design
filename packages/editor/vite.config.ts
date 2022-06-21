import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            {
                find: '@', replacement: path.resolve(__dirname, './src'),
            },
            {
                find: '~editor', replacement: path.resolve(__dirname, './src/pages/form'),
            },
            {
                find: /@starfish/, replacement: path.resolve(__dirname, '../'),
            },
            { find: /^@starfish\/form/, replacement: path.join(__dirname, '../packages/form/src/main.ts') },
        ]
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
        port: 8888,
    }
})