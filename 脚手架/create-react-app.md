他们发布 v4.0.2 后我也遇到了这个问题。

他们提到了这一点：

> 如果您之前已`create-react-app`通过 全局安装`npm install -g create-react-app`，我们建议您使用`npm uninstall -g create-react-app`或卸载软件包`yarn global remove create-react-app`以确保`npx`始终使用最新版本。

我按照以下步骤解决了这个问题：

1. 卸载`create-react-app`v4.0.1：

   ```sh
   # for npm:
   npm uninstall -g create-react-app
   
   # for yarn:
   yarn global remove create-react-app
   ```

2. 您不需要安装`create-react-app`在本地目录中，因此如果您不想这样做，请转到第 3 步。如果您想这样做，请使用以下命令安装 v4.0.2，**而不**使用全局标志 (`-g`或`--global`)：

   ```sh
   # for npm:
   npm i create-react-app
   
   # for yarn:
   yarn add create-react-app
   ```

3. 您现在可以使用以下命令创建一个新的 React 应用程序：

   ```sh
   # for npx:
   npx create-react-app my-app
   
   # for npm:
   npm init react-app my-app
   
   # for yarn:
   yarn create react-app my-app
   ```