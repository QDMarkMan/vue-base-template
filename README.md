# 基于vue-cli的开箱即用优化版本

> 基于vue-cli3 + vue2.6.10 + vue-router3.0.1 + vuex3.0.1 + webpack4.0

## 写在前面

基于cli 而且对cli结构的修改并不大，都能看的懂。如果觉得适合你得业务得话 完全是可以拿过去直接用得。这也是这篇文章[加快Vue项目的开发速度](https://github.com/QDMarkMan/CodeBlog/blob/master/Vue/%E5%8A%A0%E5%BF%ABVue%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%BC%80%E5%8F%91%E9%80%9F%E5%BA%A6.md)的示例代码


## 上一版本(vue-cli2.9base)地址

<font color=red>[点我查看V1.0版本](https://github.com/QDMarkMan/vue-base-template/tree/vue-cli2.9base)</font>


## 2019年5月25日更新内容

最近比较忙肝了一段时间，把整个的底层开发重构了一遍， 目前采用的是`基于vue-cli3`的底层开发框架这次主要做出了以下的改动

- `Vue-cli`升级到3.0
- `webpack`中部分配置文件抽离，配合`vue.congig.js`进行组件式`webpack`配置
- `less`变量全局注入
- 配置文件采用`.env`环境替代
- 新增了`SSH远程发布`
- 模块生成方式的重构(剩下一个注入未完成)
- 新增打包完成之后的`hook`(完成)
- 富文本编辑器的重构(进行中)

我以为升级个脚手架会很快， 结果现实给我来了一记狠狠的巴掌，中间过程也是一把鼻涕一把泪。现在这个2.0版本的`vue-base-template`其实还不是很稳定，还是比较推荐使用[V1.0版本](https://github.com/QDMarkMan/vue-base-template/tree/vue-cli2.9base), 后续的组件开发中希望大家能多提意见交流。

## 包括什么(持续更新...)
- `Vuex`完整的真实项目组织结构，一级大型的`state`怎么组织
- `Vue-Router` 登录权限的验证
- `Vue-Router` 自动化
- `Webpack`打包速度以及体积方面的优化(`CDN,happypack,Dllplugin...`)
- 命令行快速增加模块
- 包完成之后的`hook`，更加只能的开发体验
- ...

## 目录结构
```js
vue-base-template
│   config                  // webpack配置config/q其他一些config文件
│   scripts                 // 帮助脚本文件
│   │   template            // 模块文件脚本
│   │   .env.local          // 临时配置文件
│   │   build-hooks.js      // 打包后hooks
│   │   build-module.js     // 快速开发帮助脚本
│   │   build.js            // build构建脚本
│   │   deploy.js           // SSH发布脚本
│   │   server.js           // 本地预览服务器
│   │   util.js             // 通用工具
│   │   
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
│   │   views               // 视图页面
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
npm run build:prod

# build for stage with minification
npm run build:stage

# build for production and view the bundle analyzer report
npm run build:report

# build dll
npm run build:dll

# run deploy scripts
npm run deploy

# create module for our project
npm run create 

# lint file
npm run lint 

# lint and fix
npm run lint:fix 
```
