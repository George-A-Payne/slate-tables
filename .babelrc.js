module.exports = {
    presets: [
        require.resolve('@babel/preset-react'),
        require.resolve('@babel/preset-typescript'),
        [
            require.resolve('@babel/preset-env'),
            {
                targets: {
                    browsers: [
                        'last 2 versions',
                        'Explorer 11',
                        'Chrome >= 52',
                    ],
                },
            },
        ],
    ],
    plugins: [
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./'],
                alias: {
                    changes: './lib/changes',
                    create: './lib/create',
                    hooks: './lib/hooks',
                    schema: './lib/schema',
                    types: './lib/types',
                    utils: './lib/utils',
                },
            },
        ]
    ]
}
