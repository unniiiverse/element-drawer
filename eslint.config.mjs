/**
 * @fileoverview nextjs eslint config
 * @version 07.08.2025
 */



import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import pathPlugin from 'eslint-plugin-path';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import path from 'node:path';
import { fileURLToPath } from 'node:url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});



export default defineConfig([globalIgnores(['**/node_modules', '**/dist', '**/build', '**/.next']), {
  extends: compat.extends('next/core-web-vitals'),

  plugins: {
    'unused-imports': unusedImports,
    'path': pathPlugin,
    'simple-import-sort': simpleImportSort
  },

  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'semi': ['warn', 'always'],
    '@next/next/no-img-element': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-key': 'warn',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    'quotes': ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],

    'simple-import-sort/imports': ['warn', {
      groups: [
        // Side effect imports (css, etc)
        ['^\\u0000'],

        // React / next firts
        ['^(react|next)$', '^@?\\w'],

        // Packages
        ['^@?\\w', '^(?![^/]+\\.)'],

        // Absolute imports
        ['^~'],

        // Relative imports
        ['^\\./'],

        // CSS modules
        ['^.+\\.(module.css|module.scss)$'],

        // Media imports
        ['^.+\\.(gif|png|svg|jpg)$'],
      ],
    }],

    'path/no-relative-imports': ['error', {
      maxDepth: 0,
    }],
  },
}]);