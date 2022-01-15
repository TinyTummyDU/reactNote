//配置具体的修改规则，去执行修改，修改完了，再按照package.json去启动

//利用common.js去暴露一个函数

// const { override, fixBabelImports } = require('customize-cra');
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  // 按需引入
  fixBabelImports("import", {
    libraryName: "antd",
    // es规范
    libraryDirectory: "es",
    // 对css按需引入
    // style: "css",
    style: true,
  }),

  //这是一个webpack最简单的loader了，过时了
  //   addLessLoader({
  //     //less
  //     javascriptEnabled: true,
  //     //修改哪个变量
  //     modifyVars: { "@primary-color": "#1DA57A" },
  //   })

  //Lessloader更新了，和文档脱节了
  addLessLoader({
    lessOptions: {
      //less
      javascriptEnabled: true,
      //修改哪个变量
      modifyVars: { "@primary-color": "#1DA57A" },
    },
  })
);
