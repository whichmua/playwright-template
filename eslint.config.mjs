// Import base ESLint config and extensions
import eslint from "@eslint/js";
import tselint from "typescript-eslint"; // TypeScript-specific lint rules
import prettierPlugin from "eslint-plugin-prettier"; // Integrates Prettier with ESLint
import prettierConfig from "eslint-config-prettier"; // Disables ESLint rules that conflict with Prettier
import jsoncPlugin from "eslint-plugin-jsonc"; // Linting support for JSON, JSONC, and JSON5
import jsoncParser from "jsonc-eslint-parser"; // Parser for JSONC files

export default [
  // TypeScript & JavaScript linting setup
  ...tselint.config(
    eslint.configs.recommended, // Base recommended ESLint rules
    ...tselint.configs.recommended, // TypeScript-specific recommended rules
    {
      files: ["**/*.ts", "**/*.js"], // Target TypeScript and JavaScript files
      languageOptions: {
        globals: {
          console: "readonly", // Allow use of console
          process: "readonly", // Allow access to process.env
        },
        parserOptions: {
          project: "./tsconfig.json", // Enable type-aware linting
        },
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "error", // Disallow unused variables
        "@typescript-eslint/no-floating-promises": "error", // Catch missing awaits
        "@typescript-eslint/await-thenable": "error", // Ensure values being awaited are actually thenables
        "@typescript-eslint/no-require-imports": "off", // Allow use of require()
        "@typescript-eslint/no-explicit-any": "off", // Allow use of any type
        "@typescript-eslint/no-unused-expressions": "off", // Disallow unused expressions
        "no-empty-pattern": "off", // Allow destructuring with empty patterns
        "no-console": "off", // Console logs are allowed
        "prettier/prettier": "error", // Fail if Prettier formatting rules are violated
        "object-curly-newline": [
          "error",
          {
            ImportDeclaration: { multiline: true, minProperties: 2 },
            ExportDeclaration: { multiline: true, minProperties: 2 }, // optional, for consistency
            ObjectExpression: "consistent",
            ObjectPattern: "consistent",
          },
        ],
      },
      plugins: {
        prettier: prettierPlugin, // Enable Prettier plugin
      },
    },
  ),

  // Linting rules for JSON, JSONC, and JSON5 files
  {
    files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
    languageOptions: {
      parser: jsoncParser, // Use JSONC parser
    },
    plugins: {
      jsonc: jsoncPlugin,
    },
    rules: {
      "jsonc/array-bracket-spacing": ["error", "never"],
      "jsonc/comma-dangle": ["error", "never"],
      "jsonc/comma-style": ["error", "last"],
      "jsonc/indent": ["error", 2], // Enforce 2-space indentation
      "jsonc/key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "jsonc/no-bigint-literals": "error",
      "jsonc/no-binary-expression": "error",
      "jsonc/no-comments": "off", // Allow comments in JSONC
      "jsonc/no-dupe-keys": "error",
      "jsonc/no-escape-sequence-in-identifier": "error",
      "jsonc/no-irregular-whitespace": "error",
      "jsonc/no-octal": "error",
      "jsonc/no-octal-escape": "error",
      "jsonc/no-sparse-arrays": "error",
      "jsonc/object-curly-newline": ["error", { consistent: true }],
      "jsonc/object-curly-spacing": ["error", "always"],
      "jsonc/object-property-newline": "error",
      "jsonc/quote-props": ["error", "always"],
      "jsonc/quotes": ["error", "double"],
      "jsonc/spaced-comment": "off", // Allow inline comments in JSONC
    },
  },

  // Disables all formatting-related ESLint rules that might conflict with Prettier
  prettierConfig,
];
