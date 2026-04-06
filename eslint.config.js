import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import { importX } from 'eslint-plugin-import-x'

export default defineConfig([
  globalIgnores(['dist', 'src/assets/js/lib/vendor']),
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        $: 'readonly',
        jQuery: 'readonly',
        define: 'readonly'
      }
    }
  },
  importX.flatConfigs.recommended,
  {
    rules: {
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/order': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          argsIgnorePattern: '^(e|event|context|options)$'
        }
      ],
      'no-useless-assignment': 'off'
    }
  }
])
