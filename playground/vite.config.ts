import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const vaultRoot = path.resolve(__dirname, "..");

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/ui-vault/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@vault": vaultRoot,
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 5173,
    fs: {
      allow: [vaultRoot],
    },
  },
});
