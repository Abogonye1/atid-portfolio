import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use BASE_PATH for GitHub Pages deployments. For project pages, set to
  // "/<repo-name>/". For user/organization site repos ending with .github.io,
  // this should be "/". The workflow will set this env automatically.
  base: process.env.BASE_PATH || '/',
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "localhost",
    port: 4173,
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@tsparticles")) return "vendor-tsparticles";
          if (id.includes("recharts")) return "vendor-recharts";
          if (id.includes("embla-carousel")) return "vendor-carousel";
          if (id.includes("react-router")) return "vendor-router";
          if (id.includes("lucide-react")) return "vendor-lucide";
          return undefined;
        },
      },
    },
    sourcemap: false,
    cssMinify: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    globals: true,
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
}));
