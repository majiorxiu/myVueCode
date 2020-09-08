# vue-2-code

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
--------------------------------------------------------------------------------------------------------

│  .gitignore
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│  vue.config.js
## 打包目录
├─dist
## 依赖包目录
├─node-modules
## 网站入口       
├─public
## 程序主目录
└─[src](./src)
  ### 程序入口
    │  App.vue
    │  main.js
  ### 样式及样式相关文件
    ├─[assets](./src/assets)
  #### 样式文件
    │  └─[css](./src/assets/css)
  ##### 组件样式重写
    │          components-reset.css
  ##### 全局样式表
    │          global.scss
  ##### 浏览器样式重写
    │          reset.css
  ### 自定义组件
    ├─[components](./src/components)
  #### 图表相关
    │  ├─[echart](./src/components/echart)
  #### element-ui 二次扩展
    │  └─[element](./src/components/element)
  ##### 筛选条件组件
    │      ├─[filter-assembly](./src/components/element/filter-assembly)
  ##### 表格组件
    │      └─[grid](./src/components/element/grid)
  ### 自定义指令  
    ├─[directive](./src/directive)
  ### 外部js文件
    ├─[js](./src/js)
  #### 页面全局常量
    │  └─[global](./src/js/global)
  ### vue混入功能         
    ├─[mixin](./src/mixin)
  ### 页面组件目录 
    ├─[page](./src/page)
  #### 错误页面
    │  ├─[errorPage](./src/page/errorPage)
  #### 登录后首页
    │  ├─[index](./src/page/index)
  #### 页面框架组件
    │  └─[layout](./src/page/layout)
  #### 子页面
    │  └─[views](./src/page/views)
  ### 页面全局方法    
    ├─[plugin](./src/plugin)
  ### 路由配置
    ├─[router](./src/router)
  ### api服务请求
    ├─[server](./src/server)
  #### 按目录封装请求
    │  └─[api](./src/server/api)
  ### vue store 功能   
    └─[store](./src/store)
            
