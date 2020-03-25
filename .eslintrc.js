module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
    plugins: ['@typescript-eslint'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'no-undef': 0,
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
            },
        ],
        'react/prop-types': 0,
        'react/display-name': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-object-literal-type-assertion': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/no-empty-interface': 0,
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 0,
            },
        },
    ],
};
