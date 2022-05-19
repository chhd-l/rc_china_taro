# Getting Started with Taro

This project was bootstrapped with [taro](https://taro-docs.jd.com/taro/docs/GETTING-STARTED).

## Available Scripts

In the project directory, you can run:

### `yarn dev:weapp`(以微信小程序为例，本地调试)

在微信开发者工具打开项目查看效果及调试

### `yarn build:weapp`(以微信小程序为例，打包编译)

## 文件命名语义化

1、assets ---资源（icon、bg、btn、img.'-'连接）\
2、components---组件，1 级文件夹命名与 pages 下文件夹命名保持一致，二级文件夹首字母大写，eg:ProductCard \
3、framework---数据处理层，文件命名与 [postman](https://www.postman.com/devrel/workspace/commercetools) 保持一致 \
4、pages---展示，文件命名采用驼峰命名

## iconfont 库引用

1、更新需要去 iconfont 生成新的连接，替换 iconfont.json 里的 symbol_url
2、运行 npx iconfont-taro
