import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from './package.json';
import Visualizer from 'rollup-plugin-visualizer'
const alias: any = [
  {
    find: "@",
    replacement: path.resolve(__dirname, "./src"),
  },
  {
    find: "~editor",
    replacement: path.resolve(__dirname, "./src/components"),
  },
];
if (process.env.NODE_ENV != "production") {
  alias.push({ find: /^starfish-form$/, replacement: path.join(__dirname, "../form/src/main.ts") });
}
export default defineConfig({
  plugins: [
    Visualizer(),
    dts({
        outputDir: path.join(path.resolve(__dirname, 'dist'), "types"),
        include: ['src/**/*'],
        staticImport: true,
        insertTypesEntry: true,
        logDiagnostics: true
    }),
    vue(),
  ],
  resolve: {
    alias,
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";',
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
  server: {
    host: "0.0.0.0",
    port: 8888,
  },
  build: {
    cssCodeSplit: false, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
    target: "esnext", // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
    minify: "terser", // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // 生产环境去除console
    //     drop_debugger: true, // 生产环境去除debugger
    //   },
    // },
    lib: {
      entry: "src/main.ts",
      name: "StarfishEditor",
      fileName: "starfish-editor",
    },
    rollupOptions: {
      // input: {
      //   main: path.resolve(__dirname, "index.html"),
      // },
      // manualChunks(id) {
      //   if (id.includes("node_modules") && id.includes("element-plus")) {
      //     return "element-plus";
      //   } else if (id.includes("node_modules") && id.includes("vue")) {
      //     return "vue";
      //   } else if (id.includes("node_modules") && id.includes("wangeditor")) {
      //     return "vendor";
      //   } else if (id.includes("node_modules") && id.includes("jsoneditor")) {
      //     return "jsoneditor";
      //   } else {
      //     return "vendor";
      //   }
      // },
      external(id: string) {
        return Object.keys(pkg.dependencies).some((k) => new RegExp(`^${k}`).test(id));
      },
    },
  },
});
