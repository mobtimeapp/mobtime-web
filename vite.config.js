// vite.config.js
import { join, resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: join(__dirname, "src"),
    build: {
        outDir: join(__dirname, "dist"),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                timer: resolve(__dirname, 'src/timer/index.html')
            }
        }
    }
})