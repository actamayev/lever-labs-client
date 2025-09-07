import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

const eslintConfig = [
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
			// Ignore shadcn and other third-party components
			"src/components/shadcn/ui/**/*",
			"src/lib/**/*", 
			"src/hooks/shadcn/**/*",
			"src/components/magicui/**/*",
			// Ignore the problematic JS files that are causing issues
			"add-use-client.js",
			// Ignore ESLint config file itself
			"eslint.config.mjs",
			// Add these to fix the parsing errors
			"next.config.js",
			"postcss.config.js",
			"public/keepalive-worker.js",
			// Ignore test directory
			"test/**/*",
			"src/classes/__tests__/**/*",
		],
	},

	// Use Next.js recommended configurations
	...compat.config({
		extends: [
			"next/core-web-vitals",
			"next/typescript",
		],
		env: {
			browser: true,
			node: true,
			es6: true,
		},
		plugins: [
			"react",
			"@typescript-eslint",
			"react-hooks",
		],
		parser: "@typescript-eslint/parser",
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			project: "./tsconfig.json",
			ecmaFeatures: {
				jsx: true,
			},
		},
		rules: {
			// Basic formatting rules (not the problematic indent rule)
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
			// DISABLE the problematic type-aware rules for now
			// "@typescript-eslint/no-unnecessary-condition": "warn",
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
	}),

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

	// Override for JavaScript files - disable TypeScript-specific rules
	{
		files: ["**/*.{js,mjs,cjs}"],
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
			// Re-enable basic no-unused-vars for JS files
			"no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
			"no-shadow": "error",
		},
	},

	// Override for icon components - disable explicit function return type
	{
		files: ["src/components/icons/**/*", "src/utils/career-quest/career-quest-data.ts"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
]

export default eslintConfig
