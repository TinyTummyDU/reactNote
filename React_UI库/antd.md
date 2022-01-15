

[TOC]



# 1_material-ui(国外)

1. 官网: http://www.material-ui.com/#/
2. github: https://github.com/callemall/material-ui





# 2_ant-design(国内蚂蚁金服)

1. 官网: https://ant.design/index-cn
2. Github: https://github.com/ant-design/ant-design/

Antd-for-vue







## 安装

yarn add antd



## 文档

2020的时候，4.x版本，文档就不太详细了

推荐看3.x版本的文档，官网可以选择



## 按需引入样式



```jsx
//这样会把所有组件的所有样式都引进来，这样不太好，因为文件很大
//import "antd/dist/antd.css";
```





这个例子在实际开发中还有一些优化的空间，比如无法进行主题配置，而且上面的例子加载了全部的 antd 组件的样式（gzipped 后一共大约 60kb）。

此时我们需要对 create-react-app 的**默认配置**进行自定义，这里我们使用 [react-app-rewired](https://github.com/timarney/react-app-rewired) （一个对 create-react-app 进行自定义配置的社区解决方案）。

引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) 版本的关系，你还需要安装 [customize-cra](https://github.com/arackaf/customize-cra)。



## 不是非要暴露react配置才能按需引用样式

### yarn add react-app-rewired customize-cra



注意，改了package.json以后的原来的yarn start就会使用"react-app-rewired start"

```null

/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

### 使用 babel-plugin-import

注意：antd 默认支持基于 ES module 的 tree shaking，js 代码部分不使用这个插件也会有按需加载的效果。

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](https://3x.ant.design/docs/react/getting-started-cn#按需加载)），现在我们尝试安装它并修改 `config-overrides.js` 文件。

```
$ yarn add babel-plugin-import
```

```bash

+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```

然后移除前面在 `src/App.css` 里全量添加的 `@import '~antd/dist/antd.css';` 样式代码，并且按下面的格式引入模块。

```diff
  // src/App.js
  import React, { Component } from 'react';
- import Button from 'antd/es/button';
+ import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }

  export default App;
```

最后重启 `yarn start` 访问页面，antd 组件的 js 和 css 代码都会按需加载，你在控制台也不会看到这样的[警告信息](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png)。关于按需加载的原理和其他方式可以阅读[这里](https://3x.ant.design/docs/react/getting-started-cn#按需加载)。



报错

TypeError: this.getOptions is not a function

解决

把lessload换版本

yarn add less@3.9.0 less-loader@7.1.0 --save

## 暴露react配置

**很容易改坏的，不要这样！**

react把webpack文件夹被隐藏了，那么如何把脚手架配置暴露出来呢

暴露配置

package.json里面有一个eject命令

yarn,eject

会多一个config和scripts的文件夹

<img src="/Users/dyq/Desktop/React_UI库/pics/before_eject.png" alt="before_eject" style="zoom:50%;" />

<img src="/Users/dyq/Desktop/React_UI库/pics/after_eject.png" alt="after_eject" style="zoom:50%;" />

webpack.config.js在config下面

# 3_按需引入总结

尚硅谷 p95



1.安装依赖：yarn add react-app-rewired customize-cra babel-plugin-import less less-loader

2.修改package.json

​    ....

​        "scripts": {

​            "start": "react-app-rewired start",

​            "build": "react-app-rewired build",

​            "test": "react-app-rewired test",

​            "eject": "react-scripts eject"

​        },

​    ....

3.根目录下创建config-overrides.js

​    //配置具体的修改规则

​    const { override, fixBabelImports,addLessLoader} = require('customize-cra');

​    module.exports = override(

​        fixBabelImports('import', {

​            libraryName: 'antd',

​            libraryDirectory: 'es',

​            style: true,

​        }),

​        addLessLoader({

​            lessOptions:{

​                javascriptEnabled: true,

​                modifyVars: { '@primary-color': 'green' },

​            }

​        }),

​    );

4.备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉





# 4_antd自定义组件

antd本来是是less写的，编译成了css

所以我们要自定义一个主题，比如改antd按钮的颜色，改的就是antd less文件

官网：https://3x.ant.design/docs/react/use-with-create-react-app-cn





按照 [配置主题](https://3x.ant.design/docs/react/customize-theme-cn) 的要求，自定义主题需要用到 less 变量覆盖功能。我们可以引入 `customize-cra` 中提供的 less 相关的函数 [addLessLoader](https://github.com/arackaf/customize-cra#addlessloaderloaderoptions) 来帮助加载 less 样式，同时修改 `config-overrides.js` 文件如下。

```
$ yarn add less less-loader
```



```bash

- const { override, fixBabelImports } = require('customize-cra');
+ const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
-   style: 'css',
+   style: true,
  }),
+ addLessLoader({
+   javascriptEnabled: true,
+   modifyVars: { '@primary-color': '#1DA57A' },
+ }),
);
```

这里利用了 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 来进行主题配置，变量和其他配置方式可以参考 [配置主题](https://3x.ant.design/docs/react/customize-theme-cn) 文档。

修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

> 你也可以使用 [craco](https://github.com/sharegate/craco) 和 [craco-antd](https://github.com/FormAPI/craco-antd) 来实现和 customize-cra 一样的修改 create-react-app 配置的功能。























# 5_vue for react(国内饿了吗)



# 6_Vant for vue(移动端)





