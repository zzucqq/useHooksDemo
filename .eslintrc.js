module.exports = {
  extends: [
    // 大部分配置，比如env和parser等，都使用eslint-config-react-app中的配置
    // 因此其他配置都省略了
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier', // 禁用与Prettier 冲突的规则
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
  settings: {
    // 使用eslint-import-resolver-typescript来解析路径，解决设置ts别名后
    // 报Unable to resolve path to module的问题
    'import/resolver': {
      typescript: {}, // 这会加载根目录下的tsconfig.json供eslint使用
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  globals: {
    // true表示允许被重写
    // false表示不允许被重写
    __NODE_ENV__: false,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', '.tsx'] }],
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 1,
    'no-console': 0,
    // 可以启用在组件中使用扩展运算符传值，建立项目时如果有实际需求要关闭的自行操作
    'react/jsx-props-no-spreading': 0,
    // 下边两行规则原因是使用ts的可选调用语法，如`someFunction?.()`时，会报
    // ‘no-unused-expressions’错误
    'no-unused-expressions': [0, { extensions: ['.js', '.jsx'] }],
    '@typescript-eslint/no-unused-expressions': [0, { expressions: ['.ts', '.tsx'] }],
    // 使用ts的规则
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-use-before-define': 0,
  },
};
