module.exports = {
    env: {
        browser: true,
        es2020: true,
        jest: true,
    },
    extends: ["plugin:react/recommended", "airbnb", "eslint-config-prettier"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "class-methods-use-this": "off", 
        "consistent-return": "off",
        "eqeqeq": "off", // https://eslint.org/docs/rules/eqeqeq => Must be add 
        "import/extensions": "off",
        "import/no-cycle": "off", // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md => MUST BE ADD
        "import/no-named-as-default": "off", // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md => Must be add
        "import/no-unresolved": "off", // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md => Must be add 
        "import/prefer-default-export": "off",
        "indent": [
            "error",
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ["TemplateLiteral", "ConditionalExpression"],
            },
        ],
        "no-access-state-in-setstate": "off", // 🤮 https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md => MUST BE ADD
        "no-irregular-whitespace": "off",
        "no-nested-ternary": "off",
        "no-param-reassign": "off", // https://eslint.org/docs/rules/no-param-reassign => Must be add 
        "no-plusplus": "off",
        "no-prototype-builtins": "off",
        "no-restricted-globals": "warn", // https://eslint.org/docs/rules/no-restricted-globals => Must be add 
        "no-return-assign": "off",
        "no-shadow": "off", // https://eslint.org/docs/rules/no-shadow => Must be add 
        "no-underscore-dangle": "off",
        "radix": "off", // https://eslint.org/docs/rules/radix => Must be add 
        "react/button-has-type": "off",
        "react/default-props-match-prop-types": "off",
        "react/jsx-curly-newline": "off",
        "react/jsx-filename-extension": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-array-index-key": "off", // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md = add
        "react/prop-types": "off", // add
        "react/require-default-props": "off",
        "quotes": ["error", "double", "avoid-escape"],
        "semi": ["error", "always"],
        "template-curly-spacing": "off",
    }
};

/**
 * To keep all the rules : 
 * https://github.com/benmosher/eslint-plugin-import
 * https://eslint.org/docs/rules/
 * https://github.com/yannickcr/eslint-plugin-react
 * 
 * Config : https://eslint.org/docs/user-guide/getting-started#configuration
 * 
 * 
 */
