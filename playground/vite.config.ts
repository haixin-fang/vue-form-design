import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

import { visualizer } from "rollup-plugin-visualizer";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// const outDir = path.resolve(__dirname, "../preview");
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
  alias.push({
    find: /^starfish-form\/dist\/style.css/,
    replacement: path.join(__dirname, "../packages/form/src/styles/index.scss"),
  });
  alias.push({
    find: /^starfish-editor\/dist\/style.css/,
    replacement: path.join(__dirname, "../packages/editor/src/styles/index.scss"),
  });
  alias.push({ find: /^starfish-editor$/, replacement: path.join(__dirname, "../packages/editor/src/main.ts") });
  alias.push({ find: /^starfish-form$/, replacement: path.join(__dirname, "../packages/form/src/main.ts") });
  alias.push({ find: /^element-plus$/, replacement: path.join(__dirname, "node_modules/element-plus/es/index.mjs") });
  alias.push({ find: /^starfish-form\//, replacement: path.join(__dirname, "node_modules/starfish-form/") });
  alias.push({ find: /^@element-plus\/icons-vue/, replacement: path.join(__dirname, "node_modules/@element-plus/icons-vue/dist/index.js") });
  // alias.push({ find: /^vue-codemirror$/, replacement: path.join(__dirname, "node_modules/vue-codemirror/dist/vue-codemirror.esm.js") });
  // alias.push({ find: /^codemirror$/, replacement: path.join(__dirname, "node_modules/codemirror/dist/index.js") });
}
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true, //在默认用户代理中打开生成的文件
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias,
  },

  server: {
    host: "0.0.0.0",
    port: 1100,
  },
  css: {
    //css预处理
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: '@import "../packages/editor/src/styles/variables.scss";',
    //   },
    // },
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
  base: "/vue-form-design/playground",
  build: {
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
    target: "esnext", // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
    minify: "esbuild", // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境去除console
        drop_debugger: true, // 生产环境去除debugger
      },
    },
    // outDir,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
