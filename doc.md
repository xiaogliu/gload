# 开发记录

参考这篇文章：[使用 rollup 打包 JS](https://juejin.im/post/5c073d86f265da615a419989#heading-22)
参考这篇文章：[10分钟快速精通rollup.js——前置学习之rollup.js插件篇](https://juejin.im/post/5bf823b96fb9a049e93c61a8#heading-5)

## 安装依赖

1. [rollup](https://github.com/rollup/rollup) 这里使用本地安装

```bash
npm install --save-dev rollup
```

flag 介绍：

`-c` 这个参数表示使用配置文件来进行打包
`-w` 表示实时监听打包

更多参考这里 [Command line flags](https://rollupjs.org/guide/en/#command-line-flags)

2. 集成 [typescript](https://github.com/rollup/rollup-plugin-typescript)

```bash
npm install --save-dev rollup-plugin-typescript typescript tslib
```

> babel7 可以直接转译 [typescript](https://babeljs.io/docs/en/babel-preset-typescript) 啦！！！这样是比较好的，使用 typescript 就像使用 jsx 一样简单

3. 集成 [babel](https://github.com/rollup/rollup-plugin-babel)

这里使用 [babel7](https://babeljs.io/docs/en/v7-migration)

```bash
npm install --save-dev rollup-plugin-babel@latest
```

babel7 必要模块

```bash
npm install --save-dev @babel/core

npm install --save-dev @babel/preset-env

# 这样就需要安装 rollup-plugin-typescript typescript tslib 了 ！！！！！
npm install --save-dev @babel/preset-typescript

# 在本项目中使用到了扩展运算符等
npm install --save-dev @babel/polyfill
```

4. 安装 tslint

vscode 安卓 tslint 插件（注意，又一个同名 tslint 已经废弃了）

项目中安装：

```bash
npm i -D tslint-config-prettier
npm i -D tslint
npm i -D typescript # tslint 依赖
```

如果全局安装了 tslint 就不需要项目安装，另外，编辑器安装了 prettier 好像就不需要本地再安装一遍了。

tslint.json 更多[配置](https://github.com/microsoft/TypeScript/blob/master/tslint.json)

tsconfig 更多介绍？

5. 压缩代码

使用 rollup-plugin-terser 

