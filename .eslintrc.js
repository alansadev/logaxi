module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				js: 'never',
			},
		],
		'prettier/prettier': 'error',
		'import/no-unresolved': [
			2,
			{
				commonjs: false,
				amd: false,
			},
		],
		camelcase: 'off',
		'no-underscore-dangle': 'off',
		'no-unused-expressions': 'off',
		'prefer-promise-reject-errors': 'off',
		'lines-between-class-members': 'off',
		'prefer-destructuring': 'off',
		'import/order': 'off',
		'max-len': [
			'off',
			{
				code: 300,
			},
		],
		radix: 'off',
		'no-plusplus': 'off',
		'prefer-const': 0,
		'no-await-in-loop': 'error',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/triple-slash-reference': 'off',
		'import/no-import-module-exports': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-explicit-any': [
			'error',
			{
				fixToUnknown: true,
				ignoreRestArgs: false,
			},
		],
		'@typescript-eslint/no-misused-new': 'error',
		'max-depth': ['error', 2],
		'destructure-depth/max-depth': [
			'error',
			{
				object: {
					max: 2,
				},
			},
		],
		'func-style': ['error', 'declaration'],
	},
};
