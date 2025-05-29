// eslint.config.js

import { defineConfig } from "eslint/config"; // Used for type hinting and potential future utilities
// Core ESLint recommended rules
import js from "@eslint/js";

// Vue plugin and recommended flat configs
import vuePlugin from 'eslint-plugin-vue'; // Rename to avoid conflict with 'vue' in `parser` or `vue.configs`
// Vue parser is specific to eslint-plugin-vue
import vueParser from 'vue-eslint-parser';

// TypeScript ESLint plugin and recommended flat configs
import tseslint from 'typescript-eslint';

// Prettier plugin and config
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier'; // This is the 'config' part to disable conflicting rules

// Import the 'globals' package for browser environments
import globals from "globals";

export default defineConfig([
  // 1. Global ignores (always apply)
  // Ensure paths are relative to the config file or absolute
  {
    ignores: [
      "src/assets/**", // Ignore all files in src/assets
      "src/icons/**",   // Ignore all files in src/icons
      "**/public/**",   // Ignore all files in any 'public' directory
      "**/dist/**",     // Ignore all files in any 'dist' directory
      "**/node_modules/**" // Ignore all files in any 'node_modules' directory
    ]
  },

  // 2. ESLint's own recommended rules
  js.configs.recommended,

  // 3. TypeScript ESLint recommended configuration
  // Spreading the recommended configs from typescript-eslint
  ...tseslint.configs.recommended,

  // 4. Vue.js specific configuration
  {
    // Apply this configuration to Vue, JavaScript, and TypeScript files
    files: ['**/*.vue', '**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    languageOptions: {
      // Primary parser for .vue files
      parser: vueParser,
      // Global ECMAScript version and source type for all files covered by this config
      ecmaVersion: 'latest', // Use 'latest' for future compatibility
      sourceType: 'module',
      parserOptions: {
        // This 'parser' key is specific to vue-eslint-parser, telling it to use tseslint.parser for <script> blocks
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      // Register the Vue plugin
      vue: vuePlugin,
      // Register the TypeScript ESLint plugin (needed for its rules)
      '@typescript-eslint': tseslint.plugin,
      // Register the Prettier plugin (needed for prettier/prettier rule)
      prettier: prettierPlugin,
    },
    rules: {
      // Spread Vue 3 recommended rules first
      ...vuePlugin.configs['flat/recommended'].rules,

      // == Custom Rule Overrides ==

      // TypeScript specific rules
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-types': 'off',

      // TypeScript unused vars (disable base ESLint one, use TS version)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^[hH]$', // Changed to handle both h and H
          varsIgnorePattern: '^[hH]$',
        },
      ],
      'no-unused-vars': 'off', // Disable the base ESLint rule
      'no-async-promise-executor': 'off',
      // Vue specific rules
      'vue/custom-event-name-casing': 'off',
      // 'vue/multi-word-component-names': 'off', // Common to disable if you have single-word components

      // Base JavaScript rules
      'no-use-before-define': 'off', // Disable base rule
      '@typescript-eslint/no-use-before-define': 'off', // Disable TS version if you don't want it

      // Prettier formatting rules (handled by prettier-config and prettier-plugin)
      // These should NOT be set here, let Prettier manage them via .prettierrc
      // 'space-before-function-paren': 'off', // Handled by prettier-config
      // 'quotes': ['error', 'single', { allowTemplateLiterals: true }], // Handled by prettier-config or .prettierrc
      // 'comma-dangle': ['error', 'never'], // Handled by prettier-config or .prettierrc

      // Re-enable prettier/prettier rule to report formatting issues as ESLint errors
      'prettier/prettier': 'error',
    },
  },

  // 5. Prettier configuration (this must be the last item to override all formatting rules)
  // This object from eslint-config-prettier disables conflicting ESLint rules.
  prettierConfig
]);
