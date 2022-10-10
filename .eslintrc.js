module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    wx: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'array-callback-return': 'off',
    'consistent-return': 'off',
    'react/no-access-state-in-setstate': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-param-reassign': 'off',
    'react/prop-types': 'off', // ts 不需要prop-type
    'import/extensions': 'off',
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always' },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    '@typescript-eslint/camelcase': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-restricted-globals': ['error', 'event'], // 禁用的全局变量
    'jsx-a11y/no-noninteractive-element-interactions': 'off', // 非交互性的标签，允许绑定事件
    '@typescript-eslint/no-use-before-define': [
      // 允许function的提升使用
      'error',
      { functions: false, classes: true },
    ],
    'react/jsx-wrap-multilines': 'off', // 多行jsx 需要用()包裹
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', // 非空断言
    'react-hooks/exhaustive-deps': 'off', // async 函数在effect内的使用
    'no-bitwise': 0, // 位运算
    'no-prototype-builtins': 0, // Object.prototype.hasOwnProperty.call(foo, "bar");
    'react/react-in-jsx-scope': 0, // react 必须引入
    'react/no-array-index-key': 0, // 数组下标设key
    'no-empty': 0, // 空的大括号
    'default-case': 0, // switch 默认
    '@typescript-eslint/class-name-casing': 'off',
    'jsx-a11y/alt-text': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/order': [
      0,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: false,
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
}
