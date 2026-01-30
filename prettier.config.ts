import type { Config } from 'prettier';
import type { SortJsonOptions } from 'prettier-plugin-sort-json';
import type { MultilineArrayOptions } from 'prettier-plugin-multiline-arrays';

type TPrettierBaseOptions = Config;

type TPrettierConfig = Partial<TPrettierBaseOptions & SortJsonOptions & MultilineArrayOptions>;

const FILE_GLOBS = {
	json: ['**/*.{json,jsonc,json5}'],
	markdown: ['**/*.{md,mdx,markdown,mdown}'],
};

const TWO_SPACE_INDENT_OPTIONS = { tabWidth: 2, useTabs: false };

const config = {
	plugins: [
		'prettier-plugin-packagejson',
		'prettier-plugin-sort-json',
		'prettier-plugin-multiline-arrays',
	],
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all',
	quoteProps: 'as-needed',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'avoid',
	proseWrap: 'preserve',
	endOfLine: 'lf',
	multilineArraysWrapThreshold: 3,
	overrides: [
		{
			files: FILE_GLOBS.json,
			options: TWO_SPACE_INDENT_OPTIONS,
		},
		{
			files: FILE_GLOBS.markdown,
			options: TWO_SPACE_INDENT_OPTIONS,
		},
	],
} satisfies TPrettierConfig;

export default config;
