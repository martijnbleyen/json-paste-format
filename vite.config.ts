import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";

// @ts-ignore
import dotenv from 'dotenv';
const { parsed } = dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createHtmlPlugin({
            inject: {
                // Inject data into ejs template
                data: {
                    ...parsed
                },
            },
        }),
    ],
    base: "/json/",
});
