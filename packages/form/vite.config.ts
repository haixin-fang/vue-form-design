import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import path from "path";

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
    sourcemap: true,
    minify: false,
    target: "esnext",

    lib: {
      entry: "src/main.ts",
      name: "StarfishForm",
      fileName: "starfish-form",
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external(id: string) {
        return /^vue/.test(id) || /^element-plus/.test(id) || /^jsoneditor/.test(id);
      },
    },
  },
});
