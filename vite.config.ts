import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
  },
  base: "/whowatch-tower-battle/",
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    }
  }
});
