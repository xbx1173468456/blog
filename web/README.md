# SMARTPM
## 准备工作
```
- node.js环境（npm包管理器）
- cnpm  npm的淘宝镜像
- webpack 环境
```

## 开发运行
```bash
   # 安装依赖
   npm install
   #如网速慢，可用淘宝仓库cnpm安装依赖
     # 配置cnpm   
        # 通过cnpm使用
        npm install -g cnpm --registry=https://registry.npm.taobao.org
      # 安装依赖
      cnpm install
    
    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:9527

## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
    
```
## 部署nginx配置
```
  location / {
        # 指向我们打包后上传的前端文件
        root /opt/nginx/dist;
        index index.html;
    }
    location /jwt/ {
        # 转发请求到后端服务器
        proxy_pass http://127.0.0.1:8765/jwt/;
    }
    location /api/ {
        # 转发请求到后端服务器
        proxy_pass http://127.0.0.1:8765/api/;
     }
```
## 部署
```
  构建生成环境之后，放入nginx配置好的环境
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── jquery
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 状态管理
```
  user和app配置相关状态使用vuex，其它数据都由每个业务页面对应功能目录结构进行管理。
```

## 编写VUE规范，参照VUE官网(vue版本2.5.17)
```
  官网发布VUE编写规范地址：https://cn.vuejs.org/v2/style-guide/
```
## 分支说明
```
  版本阶段说明
  
  ## 低版本地址:http://192.168.0.3:8801/smartpm/front.git
  用户管理：user_info

  ## 合并用户管理分支升级后地址：http://192.168.0.3:8801/smartpm/web.git

  ##分支说明
   开发分支：dev
   测试分支：release
    
  ##版本说明
   version = 'v1.0.0' 2019/4/18 17:15 2019/5/15 08:55 2019/5/16 08:38
   version = 'v1.0.1' 2019/6/3 14:30
   ##v1.0.1  5月份开发功能，见禅道bug解决版本v1.0.1版本
   ##v1.0.2  5月份开发功能，见禅道bug解决版本v1.0.2版本
   ##v1.0.3  6月份开发功能，见禅道bug解决版本v1.0.3版本
   ##v1.0.4  6月份开发功能，见禅道bug解决版本v1.0.4版本
```



