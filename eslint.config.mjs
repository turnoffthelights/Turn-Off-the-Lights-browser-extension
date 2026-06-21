import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.webextensions,
            angular: "writable",
            exbrowser: "writable",
            linkredirectionoptions: "writable",
            linkdeveloperwebsite: "writable",
            linkproduct: "writable",
            linkdonate: "writable",
            writereview: "writable",
            linkchangelog: "writable",
            linktranslate: "writable",
            linksupport: "writable",
            linkwelcome: "writable",
            linkuninstall: "writable",
            linkguide: "writable",
            linkproductdescription: "writable",
            browsernewtab: "writable",
            browserstore: "writable",
            linkyoutube: "writable",
            devmode: "writable",
            devdonate: "writable",
            linkcapturescreenshot: "writable",
            linkgamepad: "writable",
            linkauroraplayerapp: "writable",
            browserextensions: "writable",
            browsersettings: "writable",
            browserdownloads: "writable",
            browserpolicy: "writable",
            browserinspect: "writable",
            browserflags: "writable",
            browserabout: "writable",
            browserbookmarks: "writable",
            browserhistory: "writable",
            linknightmodeapp: "writable",
            Chart: "writable",
        },

        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        "no-multi-spaces": 1,

        "semi-spacing": ["error", {
            before: false,
            after: true,
        }],

        "no-extra-semi": 1,
        "space-before-function-paren": ["error", "never"],

        "keyword-spacing": ["error", {
            before: false,
            after: false,
        }],

        "func-call-spacing": ["error", "never"],
        "space-before-blocks": ["error", "never"],
        "array-bracket-spacing": ["error", "never"],
        "space-in-parens": ["error", "never"],
        quotes: ["error", "double"],
        "object-curly-spacing": ["error", "never"],
        "no-cond-assign": ["error"],
        "no-redeclare": ["error"],
        "no-trailing-spaces": ["error"],
        "no-whitespace-before-property": ["error"],
        "space-infix-ops": ["error"],
        yoda: ["error"],
        "arrow-parens": ["error", "always"],
        "block-spacing": ["error", "always"],
        "jsx-quotes": ["error", "prefer-double"],
        semi: ["error"],

        "brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],

        "comma-spacing": ["error"],
        indent: ["error", "tab"],

        "spaced-comment": ["error", "always", {
            exceptions: ["=", "-"],
        }],
    },
}]);