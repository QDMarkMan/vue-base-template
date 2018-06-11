// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow different quotes
    "quotes": 0,
    //
    "semi": 0,
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow not only camel case
    "camelcase": 0,
    //no-useless-escape
    "no-useless-escape": 0,
    //在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-keys": 2,
    //函数参数不能重复
    "no-dupe-args": 2,
    //不能用多余的空格
    "no-multi-spaces": 1,
    //空行最多不能超过2行
    "no-multiple-empty-lines": [1, { max: 2 }],
    // 相等判断
    "eqeqeq": ["error", "smart"],
    // 允许扩展native
    "no-extend-native": 0
    // 条件之前得空格
  }
}
