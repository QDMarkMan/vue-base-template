# 基于vue-cli的开箱即用优化版本

> 基于vue2.5.2 + vue-router3.0.1 + vuex3.0.1 基本上和脚手架生成的文件结构差不多 只是做了进一步优化。更加适合我们的开发（正在完善中...）

## 写在前面
> vue全家桶的框架早就烂大街了为什么还用弄这个东西？ 一是为了给自己一个实时的备份 二是因为这个框架其实把优化打包体积，优化打包速度，vuex管理什么的都给做进去了，借鉴了很多已有的全家桶框架的优点。还有一些就是基于cli 而且对cli结构的修改并不大，都能看的懂。如果觉得适合你得业务得话 完全是可以拿过去直接用得。

## 现有功能
- Vuex完整的真实项目组织结构，一级大型的state怎么组织
- Vue-Router 登录权限的验证
- Webpack打包速度以及体积方面的优化(CDN,happypack,Dllplugin...)
- 新增加载屏配置
- 新增欢迎页面
- cli-webpack4.0 升级
- 新增一个富文本组件
## 预览地址
[点我](https://qdmarkman.github.io/vue-base-template/dist/index.html)
## 技术栈
- Vue全家桶 + axios + webpack

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
```


