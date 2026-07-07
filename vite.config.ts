import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages base path.
// If you fork/rename the repo, change this to "/<REPO_NAME>/" so asset URLs resolve.
// Example: repo "countdown_app" → "/countdown_app/".
export default defineConfig({
  plugins: [react()],
  base: "/countdown_app/",
});
