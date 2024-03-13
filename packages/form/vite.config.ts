import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from "./package.json";
import visualizer from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      outputDir: "dist/types",
      include: ["src/**/*"],
      staticImport: true,
      insertTypesEntry: true,
      logDiagnostics: true,
    }),
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
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "../editor/src"),
      },
    ],
  },
  build: {
    cssCodeSplit: false,
    sourcemap: false,
    minify: false,
    target: "esnext",

    lib: {
      entry: "src/main.ts",
      name: "StarfishForm",
      fileName: "starfish-form",
      formats: ["es"],
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external(id: string) {
        return Object.keys(pkg.dependencies).some((k) => new RegExp(`^${k}`).test(id));
      },
    },
  },
});
