import type { Config } from "tailwindcss";

const config: Config = {
  // This is the crucial part. We need to tell Tailwind where to find
  // all of your files that use Tailwind classes.
  content: [
    // Include the root HTML file.
    "./index.html",
    // This is a glob pattern that looks for any file with the
    // specified extensions inside the 'src' directory and all its subdirectories.
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
