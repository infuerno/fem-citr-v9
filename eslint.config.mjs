import js from "@eslint/js"
import globals from "globals"
import prettier from "eslint-config-prettier"

/** the line below tells VSCode what type the following object is to get intellisense completion */
/** @type {import('eslint').Linter.Config} **/
export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  prettier
]