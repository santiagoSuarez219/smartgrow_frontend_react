import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://santiagoSuarez219.github.io/smartgrow_frontend_react_prod",
});
