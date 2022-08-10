import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from 'path';
const outDir = path.resolve(__dirname, "../preview");
const alias: any = [
  {
    find: "@",
    replacement: path.resolve(__dirname, "../packages/editor/src"),
  },
  {
    find: "~editor",
    replacement: path.resolve(__dirname, "../packages/editor/src/components"),
  },
];
if (process.env.NODE_ENV != "production") {
  alias.push({ find: /^starfish-editor$/, replacement: path.join(__dirname, "../packages/editor/src/main.ts") });
  alias.push({ find: /^starfish-form$/, replacement: path.join(__dirname, "../packages/form/src/main.ts") });
  alias.push({ find: /^element-plus$/, replacement: path.join(__dirname, 'node_modules/element-plus/es/index.mjs') },)
  alias.push({ find: /^starfish-form\//, replacement: path.join(__dirname, 'node_modules/starfish-form/') },)
  alias.push({ find: /^@element-plus\/icons-vue/, replacement: path.join(__dirname, 'node_modules/@element-plus/icons-vue/dist/index.js') })
  alias.push({ find: /^vue-codemirror$/, replacement: path.join(__dirname, 'node_modules/_vue-codemirror@6.0.2@vue-codemirror/dist/vue-codemirror.esm.js') })
  alias.push({ find: /^codemirror$/, replacement: path.join(__dirname, 'node_modules/_codemirror@6.0.1@codemirror/dist/index.js') })

}
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias,
  },
  server: {
    host: "0.0.0.0",
    port: 1100,
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        additionalData: '@import "../packages/editor/src/styles/variables.scss";',
      },
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  build: {
    cssCodeSplit: false, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
    target: "esnext", // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
    minify: "esbuild", // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // 生产环境去除console
    //     drop_debugger: true, // 生产环境去除debugger
    //   },
    // },
    outDir,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
});
