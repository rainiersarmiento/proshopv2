// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import { defineConfig, globalIgnores } from "eslint/config";

// export default defineConfig([
//   globalIgnores(["dist"]),
//   {
//     files: ["**/*.{js,jsx}"],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//       // "plugin:react/recommended",
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: "latest",
//         ecmaFeatures: { jsx: true },
//         sourceType: "module",
//       },
//     },
//     rules: {
//       //"no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
//       "no-unused-vars": "warn",
//     },
//   },
// ]);

import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // Apply standard JavaScript recommended rules
  js.configs.recommended,

  // Configuration for React files
  {
    files: ["**/*.{js,jsx}"],
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
        ecmaVersion: 2022,
        sourceType: "module",
      },
      // Define environments and globals (e.g., browser, Node.js)
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      // General React rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules, // Rules for new JSX transform
      // React Hooks specific rules (essential for correct usage)
      ...reactHooks.configs.recommended.rules,
      // Add or override any other rules as needed
      "react/prop-types": "off", // Often disabled in modern React with TypeScript/context
      "no-unused-vars": "warn",
    },
  },

  // Ignore list (similar to .eslintignore)
  {
    ignores: ["dist", ".vitepress", "node_modules"],
  },
];
