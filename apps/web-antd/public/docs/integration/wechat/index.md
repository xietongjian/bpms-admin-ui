# 第三方平台集成 - 微信

安装yarn
```
npm install -g yarn
```

# 前端打包步骤
## 一、流程设计器打包到到开源项目的步骤
### A、打包给开源项目的后台使用
1、修改 /prodflow-bpmn-designer/src/utils/request.js 第8行
  ``` 
  axios.defaults.baseURL = IS_PROD?'/':'/dragon-api';//接口请求地址 
  改成：
  axios.defaults.baseURL = IS_PROD?'/':'';//接口请求地址 
  ```
2、修改 /prodflow-bpmn-designer/vue.config.js 第32行
  ``` 
  // 打包给开源项目后台使用时需要去掉-front，改成/flow-bpmn
  publicPath: process.env.NODE_ENV === 'os'?"/flow-bpmn-front":"/flow-bpmn", // 打包相对路径 
  ```
3、进入项目：prodflow-bpmn-designer  
运行命令  
``` yarn run build:os ```  
4、打包成功后进入开源项目flow-admin-ui
运行命令  
``` yarn run build ```
