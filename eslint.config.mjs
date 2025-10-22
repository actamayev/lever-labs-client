import stylistic from "@stylistic/eslint-plugin"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"

const eslintConfig = [
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
			"src/components/ui/**/*",
			"src/lib/**/*",
			"src/hooks/shadcn/**/*",
			"src/components/magicui/**/*",
			"add-use-client.js",
			"eslint.config.mjs",
			"next.config.js",
			"postcss.config.js",
			"public/keepalive-worker.js",
			"test/**/*",
			"src/classes/__tests__/**/*",
			"coverage/**/*",
		],
	},

	// TypeScript and React configuration
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
			"react": react,
			"react-hooks": reactHooks,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"linebreak-style": ["warn", "unix"],
			"quotes": ["error", "double"],
			"semi": ["error", "never"],
			"no-empty": ["error", { "allowEmptyCatch": true }],
			"eol-last": ["error", "always"],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ "argsIgnorePattern": "^_" }
			],
			"eqeqeq": "error",
			"space-infix-ops": "warn",
			"space-before-blocks": "error",
			"keyword-spacing": ["error", { "before": true, "after": true }],
			"no-trailing-spaces": "error",
			"prefer-const": "error",
			"max-len": ["warn", { "code": 140 }],
			"@typescript-eslint/explicit-function-return-type": [
				"warn",
				{
					"allowExpressions": false,
					"allowTypedFunctionExpressions": false,
					"allowHigherOrderFunctions": false,
					"allowDirectConstAssertionInArrowFunctions": false,
					"allowConciseArrowFunctionExpressionsStartingWithVoid": false
				}
			],
			"require-await": "error",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/prefer-as-const": "error",
			"no-eval": "error",
			"no-duplicate-imports": "error",
			"no-var": "error",
			"prefer-spread": "error",
			"@typescript-eslint/no-empty-interface": "error",
			"max-depth": ["warn", 3],
			"no-nested-ternary": "error",
			"complexity": ["warn", 10],
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-non-null-assertion": "error",
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",
			"react/prop-types": "off",
			"max-params": ["warn", 4],
			"max-lines-per-function": [
				"warn",
				{"max": 90, "skipBlankLines": true, "skipComments": true}
			],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					"selector": "variable",
					"format": ["camelCase", "PascalCase"],
					"filter": {
						"regex": "^SLIDE_COOLDOWN$",
						"match": false
					}
				},
				{
					"selector": "variable",
					"format": null,
					"filter": {
						"regex": "^SLIDE_COOLDOWN$",
						"match": true
					}
				},
				{
					"selector": "function",
					"format": ["camelCase", "PascalCase"]
				},
				{
					"selector": "parameter",
					"format": ["camelCase"],
					"leadingUnderscore": "allow"
				},
				{
					"selector": "typeLike",
					"format": ["PascalCase"]
				}
			],
			"@typescript-eslint/ban-types": "off",
			"react/display-name": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react/jsx-no-constructed-context-values": "error",
			"react/no-unescaped-entities": "off",
		},
	},

	// Stylistic rules (including indent with tabs)
	{
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			"@stylistic/indent": ["error", "tab"],
		},
	},

	// Override for TSX files - disable floating promises check
	{
		files: ["**/*.tsx"],
		rules: {
			"@typescript-eslint/no-floating-promises": "off",
		},
	},

	// Override for App Router files
	{
		files: ["app/**/*.tsx", "app/**/*.ts", "pages/**/*.tsx", "pages/**/*.ts"],
		rules: {
			"react/display-name": "off",
		},
	},

	// Override for icon components - disable explicit function return type
	{
		files: ["src/icons/**/*"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
			"max-len": "off",
			"max-lines-per-function": "off",
		},
	},

	// Override for JavaScript files - disable TypeScript-specific rules
	{
		files: ["**/*.{js,mjs,cjs}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/prefer-as-const": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-unnecessary-condition": "off",
			"@typescript-eslint/no-shadow": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/naming-convention": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
			"no-shadow": "error",
		},
	},

	// Override for additional icon components paths
	{
		files: ["src/components/icons/**/*", "src/utils/career-quest/career-quest-right-content/**/*"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
]

export default eslintConfig
