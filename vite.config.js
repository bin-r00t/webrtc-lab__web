import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync("./certs/private.key"),
      cert: fs.readFileSync("./certs/cert.pem"),
      passphrase: '06092024hz'
    },
  },
});
