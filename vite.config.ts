import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {createStyleImportPlugin,ElementPlusResolve} from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts:"./src/auto-imports.d.ts",
      imports:['vue', 'pinia', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: './src/components.d.ts',
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver()],
    }),
    createStyleImportPlugin({
      resolves:[ElementPlusResolve()],
      libs:[{
        libraryName:"element-plus",
        esModule:true,
        resolveStyle:(name)=>{
          return `element-plus/theme-chalk/${name}.css`
        }
      }]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server:{
    host: true, 
    port: 3000, 
    open: true, 
    cors: true, 
    proxy:{
      '/api': 'http://localhost:4000' 
    }
  }
});
