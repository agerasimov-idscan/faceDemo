import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@idscan/onboarding/dist/networks/*',
          dest: '../public/networks'
        }
      ]
    }),
  ],
})
