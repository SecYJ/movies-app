// @ts-check

import eslint from "@eslint/js";
// @ts-expect-error -ignore missing type declarations
import importsPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    {
        plugins: {
            "unused-imports": unusedImports,
            import: importsPlugin,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "error",
            "no-unused-vars": "error",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                    ],
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "builtin",
                            position: "before",
                        },
                        {
                            pattern: "@tanstack/**",
                            group: "external",
                            position: "after",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["react", "@tanstack/**"],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
);
