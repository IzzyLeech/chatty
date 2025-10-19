import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jestPlugin from "eslint-plugin-jest";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, 
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      jest: jestPlugin,
      prettier: prettierPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
      jest: {
        version: "detect",
        globalAliases: {
          describe: ["context"],
          fdescribe: ["fcontext"],
          xdescribe: ["xcontext"],
        },
      },
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,

      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      semi: ["error", "always"],
      "space-before-function-paren": ["off", { anonymous: "always", named: "always" }],
      camelcase: "off",
      "no-return-assign": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
    },
  },
];