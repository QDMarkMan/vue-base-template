// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  extends: "standard",
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here  ：0-pass；1-warning；2-error
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
    "no-extend-native": 0,
    // 条件之前得空格
    // disabled auto end-tag test
    // "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "allowAllPropertiesOnSameLine": false,
    "blocks": "never" 
  }
}
