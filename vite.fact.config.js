import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [react()],
    publicDir: false,
    build: {
        outDir: "dist-fact",
        rollupOptions: {
            input: fileURLToPath(new URL("./fact-preview.html", import.meta.url)),
        },
    },
});
