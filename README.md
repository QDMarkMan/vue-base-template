# 基于vue-cli的开箱即用优化版本

> 基于vue-cli3 + vue2.6.10 + vue-router3.0.1 + vuex3.0.1 + webpack4.0

## 写在前面

基于cli 而且对cli结构的修改并不大，都能看的懂。如果觉得适合你得业务得话 完全是可以拿过去直接用得。这也是这篇文章[加快Vue项目的开发速度](https://github.com/QDMarkMan/CodeBlog/blob/master/Vue/%E5%8A%A0%E5%BF%ABVue%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%BC%80%E5%8F%91%E9%80%9F%E5%BA%A6.md)的示例代码，有一点需要注意， 这是个高度集中化的项目，如果你的项目没有大到有这些痛点你可以选取部分功能。千万不要为了用而用

## 相关文章(原创)

- [加快Vue项目的开发速度](https://juejin.im/post/5c106485e51d450e657571a6)
- [让NodeJS在你的项目中发光发热](https://juejin.im/post/5d0751f7e51d455d88219efa)
- [服务器发布Vue/Nuxt项目指南(多图)](https://juejin.im/post/5d09f10ef265da1b602907ab)
- [NodeJS发光发热之打包hooks](https://juejin.im/post/5d2eed7cf265da1bbb0410bb)

## 上一版本(vue-cli2.9base)地址

<font color=red>[点我查看V1.0版本](https://github.com/QDMarkMan/vue-base-template/tree/vue-cli2.9base)</font>，或者是访问`vue-cli2.9base`分支

## 预览地址
[点我](https://qdmarkman.github.io/vue-base-template/dist/index.html)

## 包括什么(持续更新...)

主要是分为**架构**和**组件**两大部分，架构主要是对开发层面进行的优化，组件更加偏向业务。组件目前还没开始开发。

### 架构

**已完成：**
- 基于`Vue-cli3.0`的开发环境
- `webpack`中部分配置文件抽离，配合`vue.congig.js`进行组件式`webpack`配置
- `less`变量全局注入
- 全局`.env`配置环境
- `SSH远程发布`脚本以及自动化的本地备份
- 模块生成方式的重构(剩下一个注入额外文件未完成)
- 打包完成之后的`hook`，更加智能的`dev`环境体验
- `Vuex`完整的真实项目组织结构，一级大型的`state`怎么组织
- `Vue-Router` 登录权限认证
- `Vue-Router` 分模块自动化注入(路由去中心化)
- ...

**Features**
- `Less`改为`Scss`
- `Webpack`正式包的分包策略优化

### 组件

**已完成：**
- 页面`Frame`框架的分割
- 配合`VueRouter`进行更加智能的组件缓存策略(具体可以源码)
- 富文本编辑器的重构(进行中)
- 轻量级面包屑组件
- 甘特图页面
- ...

**Features**
- 城区选择组件
- 树形表格组件

后续的开发中希望大家能多提意见交流。

## 目录结构
```js
vue-base-template
│   backups                 // 本地备份
│   config                  // webpack配置config/q其他一些config文件
│   scripts                 // 帮助脚本文件
│   │   template            // 模块文件脚本
│   │   .env.local          // 临时配置文件
│   │   buildHooks.js      // 打包后hooks
│   │   buildModule.js     // 快速开发帮助脚本
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
