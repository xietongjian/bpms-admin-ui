# 集成飞书
> 主要对流程集成飞书app,支持在第三方应用内进行审批、查阅和操作相关的流程状态流转。
>

## 1、创建应用
飞书管理后台地址：[https://ziqbon515he.feishu.cn/admin/index](https://ziqbon515he.feishu.cn/admin/index)

登录飞书管理后台，选择工作台-应用管理菜单，如下图所示：
![image](/docs/integration/feishu/imgs/应用管理.png)

创建新的应用
![image](/docs/integration/feishu/imgs/添加应用.png)

创建企业自建应用
![image](/docs/integration/feishu/imgs/创建应用.png)

输入名称、应用描述、应用图标

![image](/docs/integration/feishu/imgs/应用信息填写.png)

点击“创建”按钮，就完成了应用的新建

![image](/docs/integration/feishu/imgs/完成创建.png)


## 2、创建发布版本

![image](/docs/integration/feishu/imgs/创建版本.png)

填写版本号、版本说明

![image](/docs/integration/feishu/imgs/填写版本.png)

编辑成员权限

![image](/docs/integration/feishu/imgs/成员权限.png)


申请线上发布

![image](/docs/integration/feishu/imgs/线上发布.png)


## 3、开通权限
> 因为要对接飞书相关的接口，所以需要在飞书开通相关接口权限
>

![image](/docs/integration/feishu/imgs/开通权限.png)

审批下的接口

<font style="color:rgb(143, 149, 158);background-color:rgb(239, 240, 241);">approval:approval</font>

<font style="color:rgb(143, 149, 158);background-color:rgb(239, 240, 241);">approval:approval.list:readonly</font>

<font style="color:rgb(143, 149, 158);">approval:approval:readonly</font>

![image](/docs/integration/feishu/imgs/权限管理.png)

搜索用户，关于用户相关的接口权限

<font style="color:rgb(143, 149, 158);">contact:contact</font>

<font style="color:rgb(143, 149, 158);background-color:rgb(239, 240, 241);">contact:contact:readonly_as_app</font>

<font style="color:rgb(143, 149, 158);">contact:department.base:readonly</font>

<font style="color:rgb(143, 149, 158);">contact:department.organize:readonly</font>

<font style="color:rgb(143, 149, 158);">contact:functional_role</font>

<font style="color:rgb(143, 149, 158);background-color:rgb(239, 240, 241);">contact:user.department:readonly</font>

<font style="color:rgb(143, 149, 158);">contact:group:readonly</font>

<font style="color:rgb(143, 149, 158);">contact:user.employee_id:readonly</font>

<font style="color:rgb(143, 149, 158);">contact:user.id:readonly</font>

<font style="color:rgb(143, 149, 158);">contact:user:search</font>

![image](/docs/integration/feishu/imgs/搜索权限.png)


## 4、设置白名单
> 飞书为了安全考虑，调用它平台的接口，需要设置对应的白名单id地址
>

![image](/docs/integration/feishu/imgs/设置白名单.png)



## 5、后台配置飞书信息
> 在流程引擎管理后台配置飞书的appkey和秘钥
>
查看飞书平台配置信息

![image](/docs/integration/feishu/imgs/查看飞书配置信息.png)
新增：

![image](/docs/integration/feishu/imgs/平台配置.png)

## 6、同步飞书用户数据
> 同步飞书后台的用户数据到流程引擎后台的组织用户表，就行数据绑定。
>

前提条件：人员管理列表的手机号必须和飞书登录的手机号一致

![image](/docs/integration/feishu/imgs/同步用户数据.png)



## 7、项目配置文件新增配置
> 在springboot项目的yml配置文件中新增开关和配置信息
>

```yaml
dragon-flow:
  platform:
    #是否开启配置,默认false
    enabled: true
    #对接平台类型，feishu和dingtalk,默认feishu
    type: feishu
    #推送消息类型，rabbit和redis,默认rabbit
    mq-type: rabbit
    apps:
      - flow
```

## 8、查看效果
当准备完上面的配置，发起一个新流程之后，当前节点的待办人即可在飞书APP端和PC端应用中的审批中心看到一条新的待办消息
![image](/docs/integration/feishu/imgs/审批入口.png)

查看待办、已办数据，如果是待办，可点击待办进去详情页进行审核、驳回、转办等操作
![image](/docs/integration/feishu/imgs/查看效果.png)
