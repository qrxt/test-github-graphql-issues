import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import analyze from "rollup-plugin-analyzer";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ["process.env." + key]: `"${val}"`,
      };
    },
    {}
  );

  return defineConfig({
    define: envWithProcessPrefix,
    server: {
      port: 8014,
      host: "0.0.0.0",
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, "./src/components"),
        types: path.resolve(__dirname, "./src/types"),
        theme: path.resolve(__dirname, "./src/theme"),
        assets: path.resolve(__dirname, "./src/assets"),
        messages: path.resolve(__dirname, "./src/messages"),
        lib: path.resolve(__dirname, "./src/lib"),
        __tests__: path.resolve(__dirname, "./__tests__"),
        apollo: path.resolve(__dirname, "./src/apollo"),
      },
    },
    plugins: [
      react({
        jsxRuntime: "automatic",
        jsxImportSource: "@emotion/react",
        babel: {
          presets: ["@emotion/babel-preset-css-prop"],
          plugins: ["@emotion"],
        },
      }),
    ],
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      rollupOptions: {
        plugins: [analyze()],
      },
      target: ["es2021", "chrome100", "safari13"],
      sourcemap: process.env.NODE_ENV !== "production",
    },
  });
};
