# 基于vue-cli的开箱即用优化版本

> 基于vue2.5.10 + vue-router3.0.1 + vuex3.0.1 + webpack4.0

## 写在前面

基于cli 而且对cli结构的修改并不大，都能看的懂。如果觉得适合你得业务得话 完全是可以拿过去直接用得。这也是这篇文章[加快Vue项目的开发速度](https://github.com/QDMarkMan/CodeBlog/blob/master/Vue/%E5%8A%A0%E5%BF%ABVue%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%BC%80%E5%8F%91%E9%80%9F%E5%BA%A6.md)的示例代码

## 包括什么(持续更新...)
- `Vuex`完整的真实项目组织结构，一级大型的`state`怎么组织
- `Vue-Router` 登录权限的验证
- `Vue-Router` 自动化
- `Webpack`打包速度以及体积方面的优化(`CDN,happypack,Dllplugin...`)
- 新增欢迎页面
- `cli-webpack4.0` 升级
- 命令行快速增加模块
- 富文本组件
- ...

## 目录结构
```js
vue-base-template
│   build                   // webpack配置
│   config                  // 配置文件
│   scripts                 // 帮助脚本文件
│   static                  // 静态文件
└───src                     // 业务逻辑代码
│   │   api                 // http api 层
│   │   assets              // 资源
│   └── components          // 公共组件
│   │     └──global         // 全局组件
│   │        │ BaseTable     // 基础表格
│   │        │ BoxContent    // 基础Box
│   │   directive           // 公共指令
│   │   filters             // 过滤器
│   │   mixins              // mixins
│   └── router              // 路由文件
│   │     │  modules        // 业务路由文件夹
│   │     │  common.js      // 通用路由
│   │     │  index.js       // 路由汇总
│   │   store               // vuex
│   │   styles              // 公共样式文件
│   │   utils               // 工具库
│   │   global.js           // 全局模块处理
│   │   interception.js     // 路由拦截器
│   │   main.js             // 入口文件
```

## 预览地址
[点我](https://qdmarkman.github.io/vue-base-template/dist/index.html)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build:report

# build dll
npm run build:dll

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# add a new module by script
npm run module 
```


