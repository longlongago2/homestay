# 项目名称：homeStay

## 1.目录结构
```
└─homestay
    ├─.idea                      // IDE 配置文件 忽略
    │  └─inspectionProfiles
    ├─doc                        // 接口文档
    ├─mock                       // 模拟后台接口和数据
    └─src                        // 源码文件
        ├─components             // view层，组件：只负责视图层设计    
        ├─HOCs                   // 高阶组件：负责组件的附加功能
        ├─models                 // model层，数据模型：只负责数据模型的操作
        ├─routes                 // 页面维度，连接view层和model层
        │  ├─homeStayDetail
        │  ├─indexPage
        │  └─regionDetailPage
        ├─services                // service层：只负责与后台接口的交互
        ├─statics                 // 静态资源文件，存放图片等文件
        └─utils                   // 常用模块
```
      
## 2.JS 框架

* [dva (Base on react react-saga react-redux react-router)](https://github.com/dvajs/dva)

* 使用es6语法结合react

## 3.UI 库

* [antd-mobile (ant-design-mobile 蚂蚁金服企业级UI库)](https://ant.design/docs/react/introduce-cn)

## 4.环境搭建

* 一、安装git客户端，[点击进入下载页](https://git-scm.com/download/win)
* 二、安装NodeJs，[点击进入下载页](https://nodejs.org/en/)
* 三、安装openSSL，[点击进入下载页](http://slproweb.com/products/Win32OpenSSL.html)
  * 1.配置环境变量（系统变量=>path=>opensl安装根路径\bin）方便全局使用openssl命令
  * 2.测试是否安装成功 cmd -> openssl -> version （打开cmd输入openssl，切换到openssl，然后输入version 查看版本，如果成功打印说明安装成功！）
* 四、打开控制台（cmd）,使用npm包管理器，clone项目到本地
  * 1.如果你想将项目clone到某个文件夹，则按住shift键并右击您要clone到的文件夹，选择‘在此处打开命令窗口’
  * 2.键入命令 git clone github地址，详情见[调试 => 启动](#start)

## 5.调试部署

### 5.1.<a id="start">启动</a>

 运行命令

 `git clone https://github.com/longlongago2/homestay.git`
 
 `cd homestay`
 
 `npm install`
 
 `npm start`
 
 会自动打开浏览器并启动本地mock服务，可以在手机上查看

### 5.2.打包

 运行命令

 `npm run build ` 
 
 会打包生产代码到dist文件夹，直接部署到服务器

### 5.3.接口

 src/utils/api.js 全局更改接口域名地址

