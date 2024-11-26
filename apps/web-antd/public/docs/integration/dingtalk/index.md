# 集成钉钉
> 主要对流程集成钉钉app,支持在第三方应用内进行审批、查阅和操作相关的流程状态流转。
>

## 1、创建应用
钉钉开放平台地址：[https://open-dev.dingtalk.com/fe/app#/corp/app](https://open-dev.dingtalk.com/fe/app#/corp/app)


登录钉钉开放平台，选择应用开发-钉钉应用菜单，如下图所示：

![image](/docs/integration/dingtalk/imgs/钉钉应用.png)

创建新的应用

![image](/docs/integration/dingtalk/imgs/创建钉钉应用.png)

输入应用名称、应用描述、应用图标（可选）

![image](/docs/integration/dingtalk/imgs/输入应用内容.png)

点击“保存”按钮，就完成了应用的新建

![image](/docs/integration/dingtalk/imgs/提交应用.png)


## 2、创建发布版本
先进入应用发布详情页
![image](/docs/integration/dingtalk/imgs/进入应用详情.png)

创建新版本
![image](/docs/integration/dingtalk/imgs/创建新版本.png)

填写应用版本号、版本描述和选择应用可用范围
![image](/docs/integration/dingtalk/imgs/版本信息设置.png)


保存版本设置信息之后，会弹出是否“直接发布”按钮，点击“直接发布”即发布新版本成功。
![img.png](/docs/integration/dingtalk/imgs/直接发布版本.png)


## 3、开通权限
> 因为要对接钉钉相关的接口，所以需要在钉钉开通相关接口权限
>

![img.png](/docs/integration/dingtalk/imgs/权限管理.png)


搜索个人，关于用户相关的接口权限

![img.png](/docs/integration/dingtalk/imgs/个人权限成功.png)

点击“申请权限”即可申请对应需要的接口权限

![img.png](/docs/integration/dingtalk/imgs/个人权限开通.png)

需要开通的权限有如下：
<font style="color:rgb(143, 149, 158);">Contact.User.mobile</font>

<font style="color:rgb(143, 149, 158);">Contact.User.Read</font>

<font style="color:rgb(143, 149, 158);">snsapi_base</font>

<font style="color:rgb(143, 149, 158);">Todo.PersonalTodo.Write</font>

<font style="color:rgb(143, 149, 158);">fieldEmail</font>

<font style="color:rgb(143, 149, 158);">fieldMobile</font>

<font style="color:rgb(143, 149, 158);">qyapi_get_omp_sso_userinfo</font>

<font style="color:rgb(143, 149, 158);">qyapi_get_microapp_list</font>

<font style="color:rgb(143, 149, 158);">open_app_api_base</font>

<font style="color:rgb(143, 149, 158);">qyapi_base</font>

<font style="color:rgb(143, 149, 158);">qyapi_get_member_by_mobile</font>

<font style="color:rgb(143, 149, 158);">qyapi_get_member</font>

<font style="color:rgb(143, 149, 158);">qyapi_get_department_list</font>

审批下的接口
![img.png](/docs/integration/dingtalk/imgs/待办任务权限.png)

需要开通的权限有如下：
<font style="color:rgb(143, 149, 158);background-color:rgb(239, 240, 241);">Todo.Todo.Write</font>

<font style="color:rgb(143, 149, 158);">Yida.Task.Read</font>

<font style="color:rgb(143, 149, 158);">Todo.Todo.Read</font>


## 4、设置白名单
> 钉钉平台为了安全考虑，调用它平台的接口，需要设置对应的白名单id地址
>

![img.png](/docs/integration/dingtalk/imgs/设置白名单.png)



## 5、后台配置钉钉信息
> 在流程引擎管理后台配置钉钉的appkey和秘钥
>
查看钉钉平台配置信息
![img.png](/docs/integration/dingtalk/imgs/钉钉凭证.png)

配置BPM流程引擎管理后台钉钉平台信息
![img.png](/docs/integration/dingtalk/imgs/平台配置.png)

## 6、同步钉钉用户数据
> 同步钉钉后台的用户数据到流程引擎后台的组织用户表，就行数据绑定。
>

前提条件：人员管理列表的手机号必须和钉钉登录的手机号一致
![img.png](/docs/integration/dingtalk/imgs/同步用户数据.png)



## 7、项目配置文件新增配置
> 在springboot项目的yml配置文件中新增开关和配置信息
>

```yaml
dragon-flow:
  platform:
    #是否开启配置,默认false
    enabled: true
    #对接平台类型，feishu和dingtalk,默认feishu
    type: dingtalk
    #推送消息类型，rabbit和redis,默认rabbit
    mq-type: rabbit
    apps:
      - flow
```

## 8、查看效果
当准备完上面的配置，发起一个新流程之后，当前节点的待办人即可在钉钉APP端和PC端应用中的审批中心看到一条新的待办消息
![image](/docs/integration/dingtalk/imgs/审批入口.png)

查看待办、已办数据，如果是待办，可点击待办进去详情页进行审核、驳回、转办等操作
![image](/docs/integration/dingtalk/imgs/待办列表.png)
