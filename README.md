# WELIAN-FE

## 主要插件

 - NUXT + Vuex + Vue-router + Axios

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production
npm run build
npm start

```

## 网站发布

使用yarn或npm进行代码编译

```
yarn run build
```
```
npm run build
```

将 `.nuxt  static server` 文件夹及`config.js  nuxt.config.js pm2.config.js, package.js` 文件放到服务器指定目录中 如 `/usrlocal/www/website`文件夹

先在目录下安装依赖, 执行
```
yarn  或 npm install
```

使用 pm2 提供网站服务, 命令中提及的config文件为本项目根目录下的 pm2.config.js 文件
```
pm2 start pm2.config.js
```
至此，项目启动完成。


# 项目分支

## master 
    master 项目主分支，若需要修改网站共同内容， 需要在此分支开发， 然后合并到对应发布分支
