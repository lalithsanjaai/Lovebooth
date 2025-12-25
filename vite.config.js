import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [react()];

  if (command === 'serve') {
    try {
      const basicSsl = (await import('@vitejs/plugin-basic-ssl')).default;
      plugins.push(basicSsl());
    } catch (e) {
      console.warn('SSL plugin not found, running in HTTP mode.');
    }
  }

  return {
    plugins,
    server: {
      host: true,
    },
  };
});
