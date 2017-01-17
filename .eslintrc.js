module.exports = {
    extends: 'airbnb',
    plugins: [
        'react',
        'jsx-a11y',
        'import',
    ],
    rules: {
        indent: ['error', 4, {SwitchCase: 1}],
        'space-before-function-paren': 'off',
        'keyword-spacing': 'off',
        'func-names': 'off',
        'object-shorthand': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-indent': [2, 4],
        'class-methods-use-this': 'off',
    },
    env: {
        jest: true,
        browser: true,
    },
};
