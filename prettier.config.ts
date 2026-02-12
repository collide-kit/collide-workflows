import type { Config } from 'prettier';
import type { SortJsonOptions } from 'prettier-plugin-sort-json';
import type { MultilineArrayOptions } from 'prettier-plugin-multiline-arrays';

type PrettierConfig = Partial<Config & SortJsonOptions & MultilineArrayOptions>;

const TWO_SPACE_INDENT = { tabWidth: 2, useTabs: false } as const;

const FILE_GLOBS = {
	json: ['**/*.{json,jsonc,json5}'],
	markdown: ['**/*.{md,mdx,markdown,mdown}'],
	css: ['**/*.{css,scss,sass,less}'],
	yaml: ['**/*.{yml,yaml}'],
};

const IGNORED_PATTERNS = [
	// ── Dependencies ──
	'**/node_modules/**',
	'**/.store/**',
	'**/pnpm-lock.yaml',
	'**/package-lock.json',
	'**/yarn.lock',
	'**/.yarn/cache/**',
	'**/.yarn/unplugged/**',
	'**/.pnp.*',

	// ── Build & Output ──
	'**/dist/**',
	'**/build/**',
	'**/out/**',
	'**/lib/**',
	'**/lib-*/**',
	'**/.cache/**',
	'**/.turbo/**',
	'**/*.tsbuildinfo',

	// ── Frameworks ──
	'**/.next/**',
	'**/.nuxt/**',
	'**/.output/**',
	'**/.vercel/**',
	'**/.netlify/**',
	'**/.serverless/**',
	'**/.docusaurus/**',
	'**/.vitepress/cache/**',
	'**/.vite-inspect/**',

	// ── Coverage ──
	'**/coverage/**',
	'**/.nyc_output/**',

	// ── IDE ──
	'**/.vscode/**',
	'**/.idea/**',

	// ── Assets / Vendors ──
	'**/*.min.js',
	'**/*.min.css',
	'**/*.bundle.js',
	'**/public/vendor/**',
	'**/vendor/**',

	// ── Generated ──
	'**/auto-import?(s).d.ts',
	'**/components.d.ts',
	'**/typed-router.d.ts',

	// ── Misc ──
	'**/.changeset/**',
	'**/LICENSE',
	'**/LICENSE*',
	'**/CHANGELOG*.md',
	'**/__snapshots__',
];

const overrides: NonNullable<Config['overrides']> = [
	{
		files: IGNORED_PATTERNS,
		options: { requirePragma: true },
	},
	{
		files: FILE_GLOBS.json,
		options: TWO_SPACE_INDENT,
	},
	{
		files: FILE_GLOBS.markdown,
		options: TWO_SPACE_INDENT,
	},
	{
		files: FILE_GLOBS.yaml,
		options: TWO_SPACE_INDENT,
	},
	{
		files: FILE_GLOBS.css,
		options: { singleQuote: false },
	},
	{
		files: ['**/package.json'],
		options: { jsonRecursiveSort: false },
	},
];

const config = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	endOfLine: 'lf',
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all',
	quoteProps: 'as-needed',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'avoid',
	proseWrap: 'preserve',
	singleAttributePerLine: true,
	experimentalTernaries: true,
	experimentalOperatorPosition: 'start',
	multilineArraysWrapThreshold: 3,
	plugins: [
		'@prettier/plugin-oxc',
		'prettier-plugin-packagejson',
		'prettier-plugin-sort-json',
		'prettier-plugin-multiline-arrays',
	],
	overrides,
} satisfies PrettierConfig;

export default config;
