# 系统集成 - restful文档

<h1 id="HeSow">准备工作</h1>
<font style="color:rgb(55, 60, 67);">在使用流程接口之前，首先你需要在流程中心后台管理中的应用管理中创建一个应用，并获得应用的 appSn 和 appSecretKey。</font>

![image](/docs/integration/restful/imgs/查看配置.png)

<h1 id="Oe1A5">整体流程</h1>

![image](/docs/integration/restful/imgs/流程.png)

<h1 id="v0079"></h1>
<h1 id="wwWPc">接口鉴权</h1>
<h2 id="VEAFZ">获取token接口</h2>
允许已授权的应用通过此接口获取访问授权码。

### 前端请求示例

```injectedfreemarker

**URL**：`/api/flow/token/getJwtToken`
**Method**：`POST`
**需要登录**：<font style="background:#F8CED3;color:#70000D">否</font>
**需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

```

<h3 id="HHKu4">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `appSn` | String | 是 | 应用标识 |
| `appSecretKey` | String | 是 | 应用私钥 |


:::tips

💡 注意，appSn 和 appSecretKey 的值为流程引擎后台生成。

:::

### 返回参数
| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | String | 临时授权码 |


<h3 id="mdVQN">示例</h3>
<h4 id="cwFb0">请求示例</h4>

```json
{
    "appSn": "flow",
    "appSecretKey": "Fu9E9N9m19b52@H9A6YWa0t8T2&$1Y~lt0d2nO9du1SP9m71X7bk@0551hVGG!K7"
}
```

<h4 id="i91Nm">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": "eyJhbGciOiJIUzUxMiJ9.eyJu...ZQaAJx9Qo8UuB0opg",
    "success": true
}
```



<h1 id="LcAeD">流程操作</h1>
<h2 id="OUPou">启动流程-业务流程-不存储业务表单数据</h2>
用于业务系统调用，在流程系统中不存储业务表单的数据，在审批页面渲染表单数据时，需要调用业务系统获取表单数据。一般用于业务表单较复杂、审批时表单数据会根据业务需求而变动的情况。

<h3 id="aRCTz">请求</h3>
:::tips
+ **URL**：`/api/flow/operate/startProcessInstanceByKey`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="tV98P">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="ONX7J">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processDefinitionKey` | String | 是 | 流程定义key |
| `businessKey` | String | 是 | 业务单据编码 |
| `variables` | Map<String, String> | 是 | 流程中使用的变量[💡](https://www.yuque.com/bpm-port/flowable/mmee8stcrv1ln6r4?inner=u82807834)，如：<br/>```json {     "param1": "111",     "param2": "222",     "param3": "333" } ```  |
| `currentUserCode` | String | 是 | 流程发起人工号 |
| `appSn` | String | 是 | 应用标识 |
| `formName` | String | 是 | 流程名称，审批者看到的流程名称 |
| `creator` | String | 否 | 创建人工号，默认为流程发起人 |
| `deptId` | String | 否 | 发起人部门ID |


:::info
💡 注意，variables 为流程中使用的变量，使用是需要用`form.属性名`，如：在此处传入的变量为param1，在流程中需要用来做条件流转的判断，在流程中配置变量为：${form.param1 == '10000'}

:::

<h3 id="Iljbv">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | String | 流程实例ID |


<h3 id="MxRHg">示例</h3>
<h4 id="CIG9e">请求示例</h4>

```json
{
    "processDefinitionKey": "api_test_business",
    "businessKey": "API-TEST-20230215-{{$randomInt}}",
    "variables": {
        "param1": "111",
        "param2": "222",
        "param3": "333"
    },
    "currentUserCode": "10000",
    "appSn": "mdm",
    "formName": "接口测试-业务流程-20230215-{{$randomInt}}",
    "creator": "10000",
    "deptId": "29"
}
```

<h4 id="uqM0c">返回示例</h4>

```json
{
    "code": "100",
    "msg": "发起流程成功！",
    "data": "e995c77facf711ed89cb766c80182d43",
    "success": true
}
```



<h2 id="nz6x4">启动流程-业务流程-存储业务表单数据</h2>
用于业务系统调用，在整个审批过程中数据不会因为业务审批 而改变的情况可以使用此接口。提交流程业务系统保存相应的表单数据外，还需要将表单（能匹配后台表单设计器数据渲染）的数据传入接口，流程中心会将相应的表单数据存储在对应的流程实例中。在审批页面渲染表单数据时，不需要调用业务系统获取表单数据。

<h3 id="V3hgO">请求</h3>

:::tips
+ **URL**：`/api/flow/bizform/process/startBizFormProcess`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="IFgAU">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="wuXjS">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processDefinitionKey` | String | 是 | 流程定义key |
| `businessKey` | String | 是 | 业务单据编码 |
| `variables` | Map<String, String> | 是 | 流程中使用的变量[💡](https://www.yuque.com/bpm-port/flowable/mmee8stcrv1ln6r4?inner=u82807834)，如：<br/>```json {     "param1": "111",     "param2": "222",     "param3": "333" } ```  |
| `currentUserCode` | String | 是 | 流程发起人工号 |
| `formData` | String | 是 | 表单数据-json字符串<br/>后台表单设计器接收的数据结构；如：<br/>```json {     "name":"张三",     "companyName":"XXXX股份有限公司",     "visitDate":"2023-02-15",     "remark":"参加互联网大会" } ```  需要转换成字符串传入formData中 |
| `appSn` | String | 是 | 应用标识 |
| `formName` | String | 是 | 流程名称，审批者看到的流程名称 |
| `creator` | String | 是 | 流程提交人工号，通常和申请人工号一致即可 |
| `deptId` | String | 否 | 发起人部门ID |


:::info

💡 注意，variables 为流程中使用的变量，使用是需要用`form.属性名`，如：在此处传入的变量为param1，在流程中需要用来做条件流转的判断，在流程中配置变量为：${form.param1 == '10000'}

:::

<h3 id="molEU">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | String | 流程实例ID |


<h3 id="K2GYP">示例</h3>
<h4 id="Ncub3">请求示例</h4>

```json
{
    "processDefinitionKey": "api_test_business",
    "formData": "{\"name\":\"张三\",\"companyName\":\"XXXX股份有限公司\",\"visitDate\":\"2023-02-15\",\"remark\":\"参加互联网大会\"}",
    "creator": "10000",
    "businessKey": "API-TEST-20230215-{{$randomInt}}",
    "variables": {
        "param1": "111",
        "param2": "222",
        "param3": "333"
    },
    "currentUserCode": "10000",
    "appSn": "mdm",
    "formName": "接口测试-业务流程-20230215-{{$randomInt}}",
    "deptId": "29"
}
```

<h4 id="p2FvH">返回示例</h4>

```json
{
    "code": "100",
    "msg": "启动成功!",
    "data": "f96bc665aeca11ed8039766c80182d43",
    "success": true
}
```



<h2 id="bfRdJ">启动流程-自定义流程</h2>
一般审批流，与业务系统不相关或小关联的审批，只能调用后台自定义表单模块的流程模板。流程中心会自动将表单数据存储在对应流程中，业务系统不需要存储表单数据。

<h3 id="jglSQ">请求</h3>

:::tips

+ **URL**：`/api/flow/form/process/startCustomFormProcess`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="IBq8v">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="zfjwz">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 是 | 流程定义Key |
| `formDraftStatus` | String | 是 | 发起的状态 ，1：保存；2：提交 |
| `userCode` | String | 是 | 发起人的工号 |
| `dataJson` | String | 是 | 表单数据。数据结构为Json字符串，defaultFormDataVo：Object对象，code为表单数据编码；<br/>makFormDataVo：后台表单设计器接收的数据结构；如：<br/>```json {     "defaultFormDataVo":{         "code":""     },     "makFormDataVo":{         "name":"张三",         "companyName":"XXXX股份有限公司",         "visitDate":"2023-02-15",         "remark":"参加互联网大会"     } } ```  需要转换成字符串传入dataJson属性中 |
| `procInstId` | String | 否 | 流程实例id，如果没有流程实例则不用传入，一般在流程被驳回后重新发起时需要传入此参数，和defaultFormDataVo的code属性 |


:::info
💡 注意，makFormDataVo 跟后台设计的表单字段需要一一对应。

:::

<h3 id="yjKEp">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | FormOperationVo | 返回流程实例及表单编码，如：<br/>```json { 	"procInstId": "流程实例ID", 	"formDataCode": "表单编码" } ```  |


<h3 id="utqNJ">示例</h3>
<h4 id="Ucin3">请求示例</h4>

```json
{
    "modelKey": "cshr_00111",
    "formDraftStatus": 2,
    "dataJson": "{\"defaultFormDataVo\":{\"code\":\"\"},\"makFormDataVo\":{\"name\":\"张三\",\"companyName\":\"XXXX股份有限公司\",\"visitDate\":\"2023-02-15\",\"remark\":\"参加互联网大会\"}}",
    "userCode": "10000"
}
```

<h4 id="c08h1">返回示例</h4>

```json
{
    "code": "100",
    "msg": "发起流程成功",
    "data": {
        "procInstId": "b2d3a9fbacfe11ed89cb766c80182d43",
        "taskId": null,
        "formDataCode": "cshr_00111_3"
    },
    "success": true
}
```



<h2 id="THwIm">审批</h2>

:::tips
+ **URL**：`/api/flow/operate/complete`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="KyhKo">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="O0I0w">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 审批人工号 |
| `message` | String | 否 | 审批备注信息 |
| `commentTypeEnum` | String | 是 | 审批类型："SP" |


<h3 id="rkRRc">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="FkvJ6">示例</h3>
<h4 id="Ii79o">请求示例</h4>

```json
{
    "taskId": "94d514ffacf911ed89cb766c80182d43",
    "userCode": "10000",
    "message": "同意",
    "commentTypeEnum": "SP"
}
```

<h4 id="w07Dt">返回示例</h4>

```json
{
    "code": "100",
    "msg": "审批成功！",
    "data": null,
    "success": true
}
```



<h2 id="RiBd5">拒绝-终止</h2>

:::tips
+ **URL**：`/api/flow/operate/complete`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="lKH60">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="iPcbI">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 审批人工号 |
| `message` | String | 是 | 审批备注信息 |
| `commentTypeEnum` | String | 是 | 审批意见类型："LCZZ" |
| `processStatusEnum` | String | 是 | 流程实例状态："ZZ" |


<h3 id="L8LFm">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="XLmK5">示例</h3>
<h4 id="mQo9b">请求示例</h4>

```json
{
    "processInstanceId": "1b98b66fad0811ed89cb766c80182d43",
    "taskId": "1b9904a0ad0811ed89cb766c80182d43",
    "userCode": "10000",
    "message": "终止流程",
    "commentTypeEnum": "LCZZ",
    "processStatusEnum":"ZZ"
}
```

<h4 id="Zskl7">返回示例</h4>

```json
{
    "code": "100",
    "msg": "流程已拒绝！",
    "data": null,
    "success": true
}
```



<h2 id="dFxiD">转办</h2>

:::tips
+ **URL**：`/api/flow/operate/turnTask`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="PBMlT">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="YlOsz">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 当前登录人工号 |
| `turnToUserId` | String | 是 | 转给指定人工号 |
| `turnUserId` | String | 是 | 转办操作人工号，与`userCode`设置成一样 |
| `message` | String | 是 | 转办备注信息 |


<h3 id="dwC3e">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="Ul5ds">示例</h3>
<h4 id="wNaNA">请求示例</h4>

```json
{
    "turnToUserId": "10001",
    "turnUserId": "10000",
    "taskId": "9ebb967bad0c11ed89cb766c80182d43",
    "processInstanceId": "9ebb6f5aad0c11ed89cb766c80182d43",
    "userCode": "10000",
    "message": "请帮忙处理一下。"
}
```

<h4 id="UTkaW">返回示例</h4>

```json
{
    "code": "100",
    "msg": "转办成功!",
    "data": null,
    "success": true
}
```



<h2 id="Unino">重新提交-驳回到提交人后重新提交</h2>

:::tips
+ **URL**：`/api/flow/operate/completeByProcessInstanceId/{processInstanceId}`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="cv72W">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="dF6o1">Path参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |


<h3 id="hYBf0">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| formTitle | String | 是 | 流程标题 |
| `variables` | Map<String, String> | 是 | 流程中使用的变量[💡](https://www.yuque.com/bpm-port/flowable/mmee8stcrv1ln6r4?inner=u82807834)，如：<br/>```json {     "param1": "111",     "param2": "222",     "param3": "333" } ```  |
| `userCode` | String | 是 | 审批人工号 |
| `message` | String | 否 | 备注信息 |


<h3 id="Qw9Dx">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="z4gWi">示例</h3>
<h4 id="Zr85J">请求示例</h4>

```json
{
    "taskId": "014eaeeafcc611ebb15000ff6db6e2b2",
    "formTitle": "接口测试-业务流程-20230215-{{$randomInt}}",
    "variables": {
        "param1": "111",
        "param2": "222",
        "param3": "333"
    },
    "userCode": "10000",
    "message": "重新提交"
}
```

<h4 id="BsKLi">返回示例</h4>

```json
{
    "code": "100",
    "msg": "操作成功！",
    "data": null,
    "success": true
}
```



<h2 id="nDpnc">驳回-驳回到指定节点</h2>

:::tips
+ **URL**：`/api/flow/operate/backToStep`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="axAOr">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="UwmhA">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `distFlowElementId` | String | 是 | 流程节点ID，通过获取可驳回的节点信息的接口获取 |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 当前登录人工号 |
| `message` | String | 是 | 驳回备注信息 |


<h3 id="Aickh">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="hyCyb">示例</h3>
<h4 id="j3Fr3">请求示例</h4>

```json
{
    "distFlowElementId": "Activity_1bfzkt4",
    "taskId": "d5e32700ad1711ed89cb766c80182d43",
    "processInstanceId": "c8cc2b5aad1711ed89cb766c80182d43",
    "userCode": "10003",
    "message": "驳回到指定节点"
}
```

<h4 id="Tf60N">返回示例</h4>

```json
{
    "code": "100",
    "msg": "驳回成功！",
    "data": null,
    "success": true
}
```





<h2 id="YN8eu">驳回-驳回到提交人</h2>

:::tips
+ **URL**：`/api/flow/operate/backToSubmitter`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="NEdie">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="fe8rF">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 当前登录人工号 |
| `message` | String | 是 | 驳回备注信息 |


<h3 id="jQELK">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="vUdGs">示例</h3>
<h4 id="M7bIN">请求示例</h4>

```json
{
    "taskId": "d5e32700ad1711ed89cb766c80182d43",
    "processInstanceId": "c8cc2b5aad1711ed89cb766c80182d43",
    "userCode": "10003",
    "message": "驳回到提交人"
}
```

<h4 id="VPlq8">返回示例</h4>

```json
{
    "code": "100",
    "msg": "驳回成功！",
    "data": null,
    "success": true
}
```



<h2 id="Z44e2">前加签-加签审批完后回到我审批</h2>

:::tips
+ **URL**：`/api/flow/operate/beforeAddSign`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="Wz9DU">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="MjeMH">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 当前登录人工号 |
| `signPersonals` | List<String> | 是 | 加签给指定人工号 |
| `signPerson` | String | 是 | 加签操作人工号，与`userCode`设置成一样 |
| `message` | String | 是 | 转办备注信息 |


<h3 id="aG84b">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="ROB1Q">示例</h3>
<h4 id="eDoaQ">请求示例</h4>

```json
{
    "signPersonals": ["10002"],
    "signPerson": "10000",
    "taskId": "9ebb967bad0c11ed89cb766c80182d43",
    "processInstanceId": "9ebb6f5aad0c11ed89cb766c80182d43",
    "userCode": "10000",
    "message": "请帮忙处理一下，加签审批完会回到我审批。"
}
```

<h4 id="dDzeR">返回示例</h4>

```json
{
    "code": "100",
    "msg": "加签成功!",
    "data": null,
    "success": true
}
```



<h2 id="CrLpM">后加签-加签审批完后直接跳转到下一节点</h2>

:::tips
+ **URL**：`/api/flow/operate/afterAddSign`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="AQBDm">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="e7AWn">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 当前登录人工号 |
| `signPersonals` | List<String> | 是 | 加签给指定人工号 |
| `signPerson` | String | 是 | 加签操作人工号，与`userCode`设置成一样 |
| `message` | String | 是 | 转办备注信息 |


<h3 id="coLcq">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="WCfRY">示例</h3>
<h4 id="W03fd">请求示例</h4>

```json
{
    "signPersonals": ["10002"],
    "signPerson": "10000",
    "taskId": "9ebb967bad0c11ed89cb766c80182d43",
    "processInstanceId": "9ebb6f5aad0c11ed89cb766c80182d43",
    "userCode": "10000",
    "message": "请帮忙处理一下，加签审批完直接跳转到下一节点。"
}
```

<h4 id="hF2tj">返回示例</h4>

```json
{
    "code": "100",
    "msg": "后加签成功!",
    "data": null,
    "success": true
}
```



<h2 id="rNTK2">签收</h2>
对于多实例的节点，如有多人同时审批时，签收动作是把多人审批的权限收回到当前审批人上。

:::tips
+ **URL**：`/api/flow/operate/claimTask`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="FVzNb">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="rJTqv">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 当前登录人工号 |
| `message` | String | 是 | 转办备注信息 |


<h3 id="dBhg1">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="lpLKU">示例</h3>
<h4 id="dl9mB">请求示例</h4>

```json
{
    "taskId": "e33c310cb75111edbd8b766c80182d43",
    "processInstanceId": "e33bbbceb75111edbd8b766c80182d43",
    "userCode": "10000",
    "message": "我签收了该任务！"
}
```

<h4 id="Y4Y71">返回示例</h4>

```json
{
    "code": "100",
    "msg": "签收成功",
    "data": null,
    "success": true
}
```



<h2 id="wOsra">反签收</h2>
对于多实例的节点，如有多人同时审批时，签收动作是把多人审批的权限收回到当前审批人上。

:::tips
+ **URL**：`/api/flow/operate/unClaimTask`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="I9Dzx">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="ibNHF">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `processInstanceId` | String | 是 | 流程实例ID |
| `taskId` | String | 是 | 任务ID |
| `userCode` | String | 是 | 当前登录人工号 |
| `message` | String | 是 | 转办备注信息 |


<h3 id="jZPUC">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |


<h3 id="dRS13">示例</h3>
<h4 id="vVKbk">请求示例</h4>

```json
{
    "taskId": "e33c310cb75111edbd8b766c80182d43",
    "processInstanceId": "e33bbbceb75111edbd8b766c80182d43",
    "userCode": "10000",
    "message": "我反签收了该任务！"
}
```

<h4 id="r6Zut">返回示例</h4>

```json
{
    "code": "100",
    "msg": "反签收成功",
    "data": null,
    "success": true
}
```



<h1 id="AverT">流程查询</h1>
<h2 id="UZjpb">查询我的待办任务</h2>

:::info
+ **URL**：`/api/flow/query/getAppingTasksPagerModel`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="kek2B">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="SSzgy">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 否 | 流程定义Key |
|  appSn | String | 是 | 应用标识 |
| `userCode` | String | 是 | 发起人的工号 |


<h3 id="rSrJB">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | PagerModel | 返回数据<br/>```json {     "total": 34,     "rows": List<TaskVo> } ```  |


TaskVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| businessKey | String | 业务流程key |
| name | String | 流程标题 |
| taskId | String | 任务id |
| processStatus | String | 流程状态 |
| processStatusName | String | 流程状态名称 |
| formName | String | 表单名称 |
| processInstanceId | String | 流程实例id |
| startPersonCode | String | 提交人工号 |
| startPersonName | String | 提交人姓名 |
| appName | String | 所属系统名称 |
| totalTime | String | 审核总时间 |
| processDefinitionId | String | 流程定义id |
| processDefinitionKey | String | 流程定义key |


<h3 id="rFtxZ">示例</h3>
<h4 id="MdxS8">请求示例</h4>

```json
{
  "entity":{
    "userCode": "10000",
    "keyword": ""
  },
  "query": {
    "pageSize": 15,
    "pageNum": 1
  }
}
```

<h4 id="FZaO3">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": {
        "total": 34,
        "rows": [
            {
                "businessKey": "cshr_00111_13",
                "name": "经理",
                "taskId": "d2ae3e01ad1b11ed89cb766c80182d43",
                "taskDefKey": "Activity_1bfzkt4",
                "assignee": "10000",
                "assigneeName": null,
                "createTime": "2023-02-15 18:30:52",
                "stayHour": "19分 10秒",
                "processInstanceId": "c8cc2b5aad1711ed89cb766c80182d43",
                "parentId": null,
                "processDefinitionId": "cshr_00111:2:bd9c8d69ad1711ed89cb766c80182d43",
                "processDefinitionKey": "cshr_00111",
                "processDefinitionType": 1,
                "formType": 0,
                "processStatus": "SPZ",
                "processStatusName": "审批中",
                "taskType": null,
                "status": 0,
                "userId": null,
                "userName": null,
                "groupIds": null,
                "finished": false,
                "finishedTime": null,
                "formName": "接口测试-业务流程-20230215-441",
                "startPersonCode": "10000",
                "startPersonName": "易烊千玺",
                "startTime": "2023-02-15 18:01:58",
                "endTime": null,
                "appName": "流程中心",
                "totalTime": "48分 5秒",
                "businessUrl": null,
                "candidateFlag": false,
                "type": 0,
                "currentAssignees": null,
                "currentAssigneeNos": null
            },
            ...
        ]
    },
    "success": true
}
```



<h2 id="yNpSQ">查询我的待办任务总条数</h2>

:::tips
+ **URL**：`/api/flow/query/getAppingTaskCount`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="WKuuO">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="pSmsX">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| <font style="color:black;">userCode</font> | <font style="color:black;">String</font> | 是 | <font style="color:black;">用户的工号</font> |
| <font style="color:black;">appSn</font> | <font style="color:black;">String</font> | 是 | <font style="color:black;">系统标识</font> |
| <font style="color:black;">appSns</font> | <font style="color:black;">List<String></font> | 否 | <font style="color:black;">系统标识列表</font> |
| <font style="color:black;">formName</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">表单名称</font> |
| <font style="color:black;">startTime</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">开始时间</font> |
| <font style="color:black;">endTime</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">结束时间</font> |
| <font style="color:black;">businessKey</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">业务主键</font> |
| <font style="color:black;">assignee</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">待办人</font> |
| <font style="color:black;">orderFlag</font> | <font style="color:black;">Integer</font> | 否 | <font style="color:black;">排序字段</font><font style="color:black;"> 1 </font><font style="color:black;">升序</font><font style="color:black;">  </font><font style="color:black;">0 </font><font style="color:black;">降序</font> |
| <font style="color:black;">processInstanceId</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">流程实例</font><font style="color:black;">ID</font> |
| <font style="color:black;">modelKey</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">流程模型</font><font style="color:black;">key</font> |
| <font style="color:black;">flowStatus</font> | <font style="color:black;">Integer</font> | 否 | <font style="color:black;">流程状态</font><font style="color:black;"> 1 </font><font style="color:black;">审批中，</font><font style="color:black;">2</font><font style="color:black;">结束</font> |
| <font style="color:black;">keyword</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">查询关键字</font> |
| <font style="color:black;">taskName</font> | <font style="color:black;">String</font> | 否 | <font style="color:black;">节点名称</font> |
| <font style="color:black;">orderbyMap</font> | <font style="color:black;">Map<String, ORDERBY></font> | 否 | <font style="color:black;">排序 key：字段</font><br/><font style="color:black;"> value 是规则，</font>ORDERBY枚举：DESC,<br/>ASC |


<h3 id="ohn2B">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | Long | 返回总条数，如：<br/>```json 19 ```  |




<h3 id="i21Q1">示例</h3>
<h4 id="GE8PG">请求示例</h4>

```plain
/api/flow/query/getAppingTaskCont
```



```json
{
  "userCode":"10000",
  "appSn":"flow"
}
```

<h4 id="MWOdk">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": 19,
    "success": true
}
```



<h2 id="UmrSx">查询我的已办任务</h2>

:::info
+ **URL**：`/api/flow/query/getApplyedTasksPagerModel`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="GZnJC">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="R1enp">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 是 | 流程定义Key |
| `formDraftStatus` | String | 是 | 发起的状态 ，1：保存；2：提交 |
| `userCode` | String | 是 | 发起人的工号 |


<h3 id="dQ3gb">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | PagerModel | 返回数据<br/>```json {     "total": 15,     "rows": List<TaskVo> } ```  |


TaskVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| businessKey | String | 业务流程key |
| name | String | 流程标题 |
| taskId | String | 任务id |
| processStatus | String | 流程状态 |
| processStatusName | String | 流程状态名称 |
| formName | String | 表单名称 |
| processInstanceId | String | 流程实例id |
| startPersonCode | String | 提交人工号 |
| startPersonName | String | 提交人姓名 |
| appName | String | 所属系统名称 |
| totalTime | String | 审核总时间 |
| processDefinitionId | String | 流程定义id |
| processDefinitionKey | String | 流程定义key |


<h3 id="EnxPz">示例</h3>
<h4 id="Zarvl">请求示例</h4>

```json
{
  "entity":{
    "userCode": "10000",
    "keyword": ""
  },
  "query": {
    "pageSize": 1,
    "pageNum": 1
  }
}
```

<h4 id="rmsDf">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": {
        "total": 79,
        "rows": [
            {
                "processInstanceId": "7dd8ae2e922911eda93236e660a2d0eb",
                "processDefinitionId": "second_00056:2:18d3ce69691011ec9473a864f1302d88",
                "processDefinitionName": "测试大数据类型011",
                "processDefinitionKey": "second_00056",
                "processDefinitionType": null,
                "processDefinitionVersion": null,
                "categoryCode": null,
                "deploymentId": null,
                "businessKey": "second_00056_0",
                "assignees": null,
                "appId": null,
                "appSn": "flow",
                "createTime": null,
                "reason": null,
                "startedUserId": "10000",
                "startedUserName": null,
                "startedUserIds": null,
                "startedUserDept": null,
                "startedUserDeptName": null,
                "startedUserCom": null,
                "startedUserComName": null,
                "finishFlag": false,
                "processStatus": "SPZ",
                "processStatusName": "审批中",
                "formName": "易烊千玺发起的测试大数据类型011-SECOND_00056_0",
                "startPersonName": "易烊千玺",
                "startTime": "2023-01-12 11:30:42",
                "endTime": null,
                "startTimeStr": null,
                "endTimeStr": null,
                "appName": "流程中心",
                "businessUrl": null,
                "totalTime": "37天 10时 42分 45秒",
                "currentAssignees": [
                    {
                        "type": "user",
                        "code": "10000",
                        "name": "易烊千玺",
                        "mobile": "18689203258"
                    }
                ],
                "queryType": null,
                "newVersion": null,
                "proInstanceIdList": null,
                "tableName": null,
                "pstate": null
            }
        ]
    },
    "success": true
}
```



<h2 id="mn4BB">查询我发起的流程</h2>

:::info
+ **URL**：`/api/flow/query/findMyProcessinstancesPagerModel`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="Lmuko">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="oEt3I">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 是 | 流程定义Key |
| `formDraftStatus` | String | 是 | 发起的状态 ，1：保存；2：提交 |
| `userCode` | String | 是 | 发起人的工号 |


<h3 id="KHxO9">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | PagerModel | 返回数据<br/>```json {     "total": 15,     "rows": List<TaskVo> } ```  |


TaskVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| businessKey | String | 业务流程key |
| name | String | 流程标题 |
| taskId | String | 任务id |
| processStatus | String | 流程状态 |
| processStatusName | String | 流程状态名称 |
| formName | String | 表单名称 |
| processInstanceId | String | 流程实例id |
| startPersonCode | String | 提交人工号 |
| startPersonName | String | 提交人姓名 |
| appName | String | 所属系统名称 |
| totalTime | String | 审核总时间 |
| processDefinitionId | String | 流程定义id |
| processDefinitionKey | String | 流程定义key |


<h3 id="rBdei">示例</h3>
<h4 id="KP7uE">请求示例</h4>

```json
{
  "entity":{
    "userCode": "10000",
    "keyword": ""
  },
  "query": {
    "pageSize": 15,
    "pageNum": 1
  }
}
```

<h4 id="CHNdy">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": {
        "total": 131,
        "rows": [
            {
                "businessKey": "ht_00110_2",
                "name": null,
                "taskId": "43d84aea91c011eda93236e660a2d0eb",
                "taskDefKey": "Activity_0bgkcls",
                "assignee": "10000",
                "assigneeName": null,
                "createTime": "2023-01-11 22:57:27",
                "stayHour": null,
                "processInstanceId": "43d564ac91c011eda93236e660a2d0eb",
                "parentId": null,
                "processDefinitionId": "ht_00110:1:c4cca42b91bf11eda93236e660a2d0eb",
                "processDefinitionKey": "ht_00110",
                "processDefinitionType": null,
                "formType": null,
                "processStatus": "BJ",
                "processStatusName": "办结",
                "taskType": null,
                "status": 0,
                "userId": null,
                "userName": null,
                "groupIds": null,
                "finished": false,
                "finishedTime": "2023-01-11 23:03:37",
                "formName": "易烊千玺发起的wm测试表单-HT_00110_2",
                "startPersonCode": "10000",
                "startPersonName": "易烊千玺",
                "startTime": "2023-01-11 22:57:27",
                "endTime": "2023-01-11 23:01:38",
                "appName": "流程中心",
                "totalTime": "4分 11秒",
                "businessUrl": null,
                "candidateFlag": false,
                "type": 0,
                "currentAssignees": null,
                "currentAssigneeNos": null
            },
            {
                "businessKey": "ht_00109_21",
                "name": "经理",
                "taskId": "e0fc9e9a670611edac30766c80182d43",
                "taskDefKey": "Activity_0ru0nf5",
                "assignee": "10000",
                "assigneeName": null,
                "createTime": "2022-11-18 14:04:36",
                "stayHour": null,
                "processInstanceId": "e0fc7778670611edac30766c80182d43",
                "parentId": null,
                "processDefinitionId": "ht_00109:8:9275a64d670311edb230766c80182d43",
                "processDefinitionKey": "ht_00109",
                "processDefinitionType": null,
                "formType": null,
                "processStatus": "SPZ",
                "processStatusName": "审批中",
                "taskType": null,
                "status": 0,
                "userId": null,
                "userName": null,
                "groupIds": null,
                "finished": false,
                "finishedTime": null,
                "formName": "易烊千玺发起的测试流程使用变量BB-HT_00109_21",
                "startPersonCode": "10000",
                "startPersonName": "易烊千玺",
                "startTime": "2022-11-18 14:04:36",
                "endTime": "2022-11-18 14:05:50",
                "appName": "流程中心",
                "totalTime": "1分 13秒",
                "businessUrl": null,
                "candidateFlag": false,
                "type": 0,
                "currentAssignees": null,
                "currentAssigneeNos": null
            },
          ...
        ]
    },
    "success": true
}
```

<h4 id="USLlU"></h4>
<h2 id="CShkw">通过任务id获取可驳回节点列表</h2>

:::tips
+ **URL**：`/api/flow/query/findBackNodesByTaskId`/{taskId}
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::



<h3 id="zINeR">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="UwxV7">Path参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| taskId | String | 是 | 任务id |


<h3 id="D3Lqr">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | List<FlowNodeVo> | 返回数据列表<br/>```json [     {         "nodeId": "节点ID",         "nodeName": "节点名称",         "userCode": "审批人工号",         "userName": "审批人姓名",         "endTime": 1676455318308     } ] ```  |


FlowNodeVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| nodeId | String | 节点ID |
| nodeName | String | 节点名称 |
| userCode | String | 审批人工号 |
| userName | String | 审批人姓名 |
| endTime | String | 结束时间 |


<h3 id="EsAV0">示例</h3>
<h4 id="gPfeZ">请求示例</h4>

```plain
/api/flow/query/findBackNodesByTaskId/d5e32700ad1711ed89cb766c80182d43
```

<h4 id="OGguM">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": [
        {
            "nodeId": "Activity_1alj3y8",
            "nodeName": "提交人",
            "userCode": "10000",
            "userName": "易烊千玺",
            "endTime": 1676455318308
        },
        {
            "nodeId": "Activity_1bfzkt4",
            "nodeName": "经理",
            "userCode": "10000",
            "userName": "易烊千玺",
            "endTime": 1676455340249
        }
    ],
    "success": true
}
```

<h4 id="llyOE"></h4>
<h2 id="cYsPR">通过流程实例id获取业务单据数据</h2>

:::tips
+ **URL**：`/api/flow/bizform/process/getBizDataInfoByProcessInstanceId/{processInstanceId}`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="DE4vV">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="kJFuO">Path参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| processInstanceId | String | 是 | 流程实例id |


<h3 id="ZWtup">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | BizDataInfo | 返回数据列表<br/>```json { 	"modelKey":"ht_ce01",   "formCode":"100031",   "businessKey":"",   "processInstanceId":"d5e32700ad1711ed89cb766c80182d43",   "formData":"" } ```  |




BizDataInfo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| modelKey | String | 流程定义key |
| formCode | String | 表单编码 |
| businessKey | String | 业务单据id |
| processInstanceId | String | 流程实例id |
| formData | String | 表单数据 |


<h3 id="Odo8Y">示例</h3>
<h4 id="DRKJY">请求示例</h4>

```plain
/api/flow/bizform/process/getBizDataInfoByProcessInstanceId/d5e32700ad1711ed89cb766c80182d43
```

<h4 id="GUC9U">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data":   {
    	"modelKey":"ht_ce01",
      "formCode":"100031",
      "businessKey":"",
      "processInstanceId":"d5e32700ad1711ed89cb766c80182d43",
      "formData":""
    },
    "success": true
}
```



<h2 id="yroN6">通过modelkey和businesskey和procInstId获取自定义表单信息</h2>

:::tips
+ **URL**：`/api/flow/query/getCustomFormInfoVoByModelKeyAndBusinessKey/{modelKey}`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="Ib5Ee">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="IqIX1">Path参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 是 | 流程模板Key |


<h3 id="HxRhG">Query参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `businessKey` | String | 是 | 业务单号 |
| procInstId | String | 是 | 流程实例ID |


<h3 id="zeXOi">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | ModelInfoVo | 返回数据<br/>```json {         "id": null,         "modelId": "fbf2681238ca11edaeb6766c80182d43",         "modelKey": "notice_children_00098",         "modelName": "aaa",         "fileName": "aaa",         "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",         "appSn": null,         "categoryCode": null     } ```  |


ModelInfoVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| modelId | String | 模板ID |
| modelKey | String | 模板标识 |
| modelName | String | 模板名称 |
| modelXml | String | 模板XML |


<h3 id="LvTGQ">示例</h3>
<h4 id="wFtio">请求示例</h4>

```json
api/flow/query/loadBpmnXmlByModelKey?modelKey=notice_children_00098
```

<h4 id="HXD7H">返回示例</h4>

```json
{
    "code": "100",
    "msg": "获取数据成功！",
    "data": {
        "id": null,
        "modelId": "fbf2681238ca11edaeb6766c80182d43",
        "modelKey": "notice_children_00098",
        "modelName": "aaa",
        "fileName": "aaa",
        "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",
        "appSn": null,
        "categoryCode": null
    },
    "success": true
}
```

<h4 id="kNoGT"></h4>
<h2 id="iPXsX">预览自定义流程图 模拟自定义流程高亮线接口</h2>

:::tips
+ **URL**：`/api/flow/form/process/getCustomFlowSequenceFlows/{modelKey}`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="x3Tio">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="U7VUS">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 是 | 流程模板Key |


<h3 id="wq0vW">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | ModelInfoVo | 返回数据<br/>```json {         "id": null,         "modelId": "fbf2681238ca11edaeb6766c80182d43",         "modelKey": "notice_children_00098",         "modelName": "aaa",         "fileName": "aaa",         "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",         "appSn": null,         "categoryCode": null     } ```  |


ModelInfoVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| modelId | String | 模板ID |
| modelKey | String | 模板标识 |
| modelName | String | 模板名称 |
| modelXml | String | 模板XML |


<h3 id="lZ10o">示例</h3>
<h4 id="EOQft">请求示例</h4>

```json
api/flow/query/loadBpmnXmlByModelKey?modelKey=notice_children_00098
```

<h4 id="mqtpz">返回示例</h4>

```json
{
    "code": "100",
    "msg": "获取数据成功！",
    "data": {
        "id": null,
        "modelId": "fbf2681238ca11edaeb6766c80182d43",
        "modelKey": "notice_children_00098",
        "modelName": "aaa",
        "fileName": "aaa",
        "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",
        "appSn": null,
        "categoryCode": null
    },
    "success": true
}
```



<h2 id="oanfR"><font style="color:#000000;">分页查询关联流程</font></h2>

:::tips
+ **URL**：`/api/flow/form/process/getPagerModelRelateFlow/{modelKey}`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="UZH22">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="oQcNU">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 是 | 流程模板Key |


<h3 id="HaEbM">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | ModelInfoVo | 返回数据<br/>```json {         "id": null,         "modelId": "fbf2681238ca11edaeb6766c80182d43",         "modelKey": "notice_children_00098",         "modelName": "aaa",         "fileName": "aaa",         "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",         "appSn": null,         "categoryCode": null     } ```  |


ModelInfoVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| modelId | String | 模板ID |
| modelKey | String | 模板标识 |
| modelName | String | 模板名称 |
| modelXml | String | 模板XML |


<h3 id="AvzUj">示例</h3>
<h4 id="NdCIW">请求示例</h4>

```json
api/flow/query/loadBpmnXmlByModelKey?modelKey=notice_children_00098
```

<h4 id="rq5ah">返回示例</h4>

```json
{
    "code": "100",
    "msg": "获取数据成功！",
    "data": {
        "id": null,
        "modelId": "fbf2681238ca11edaeb6766c80182d43",
        "modelKey": "notice_children_00098",
        "modelName": "aaa",
        "fileName": "aaa",
        "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",
        "appSn": null,
        "categoryCode": null
    },
    "success": true
}
```



<h2 id="Ox2gL">通过modekey获取模型对象</h2>

:::tips
+ **URL**：`/api/flow/query/loadBpmnXmlByModelKey/{modelKey}`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="rnBUL">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="KlnrH">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `modelKey` | String | 是 | 流程模板Key |


<h3 id="hiuWk">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | ModelInfoVo | 返回数据<br/>```json {         "id": null,         "modelId": "fbf2681238ca11edaeb6766c80182d43",         "modelKey": "notice_children_00098",         "modelName": "aaa",         "fileName": "aaa",         "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",         "appSn": null,         "categoryCode": null     } ```  |


ModelInfoVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| modelId | String | 模板ID |
| modelKey | String | 模板标识 |
| modelName | String | 模板名称 |
| modelXml | String | 模板XML |


<h3 id="e8CxL">示例</h3>
<h4 id="ccMQY">请求示例</h4>

```json
api/flow/query/loadBpmnXmlByModelKey?modelKey=notice_children_00098
```

<h4 id="xIP2A">返回示例</h4>

```json
{
    "code": "100",
    "msg": "获取数据成功！",
    "data": {
        "id": null,
        "modelId": "fbf2681238ca11edaeb6766c80182d43",
        "modelKey": "notice_children_00098",
        "modelName": "aaa",
        "fileName": "aaa",
        "modelXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>...</definitions>",
        "appSn": null,
        "categoryCode": null
    },
    "success": true
}
```

<h4 id="ih41h"></h4>
<h2 id="a7ENp">通过modelKey获取模板信息</h2>

:::tips
+ **URL**：/api/flow/query/getProdModelInfoByModelKeyAndProcInstId/{modelKey}
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="ycCpr">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="zIRf4">Path参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| modelKey | String | 是 | 流程模板Key |


<h3 id="tsEpy">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | ProdModelInfo | 返回数据列表 |


ProdModelInfo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| modelId | String | 模板ID |
| modelKey | String | 模板标识 |
| modelName | String | 模板名称 |
| modelXml | String | 模板XML |


<h3 id="uwhNS">示例</h3>
<h4 id="Sd4VD">请求示例</h4>

```plain
/api/flow/query/getProdModelInfoByModelKeyAndProcInstId/{modelKey}
```

<h4 id="MnrEH">返回示例</h4>




<h2 id="je95R">查询当前流程的审批记录</h2>

:::tips
+ **URL**：`/api/flow/query/getCommentInfosByProcessInstanceId/{processInstanceId}`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="mAWVi">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="Sey2V">Path参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| processInstanceId | String | 是 | 流程实例ID |


<h3 id="Tjy2X">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | List<CommentInfo> | 返回数据列表<br/>```json [         {             "createTime": null,             "creator": null,             "updateTime": null,             "updator": null,             "delFlag": 1,             "keyword": null,             "id": "f7ad391d24ed77669c50db2430f9abd7",             "type": "TJ",             "typeName": "提交",             "personalCode": "10000",             "personalName": "易烊千玺",             "personalHeadImg": "data:image/png;base64,iVB...CYII=",             "time": "2022-09-27 15:03:07",             "taskId": null,             "activityId": "startEvent1",             "activityName": null,             "processInstanceId": "702652ae3e3211eda6bc766c80182d43",             "action": null,             "message": "提交"         } ] ```  |


CommentInfo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| <font style="color:black;">id</font> | String | 主键ID |
| <font style="color:black;">type</font> | String | <font style="color:black;">审批类型</font> |
| <font style="color:black;">typeName</font> | String | <font style="color:black;">审批类型名称</font> |
| <font style="color:black;">personalCode</font> | String | <font style="color:black;">用户工号</font> |
| <font style="color:black;">personalName</font> | String | <font style="color:black;">用户名</font> |
| <font style="color:black;">personalHeadImg</font> | String | <font style="color:black;">用户头像</font> |
| <font style="color:black;">time</font> | Date | <font style="color:black;">审批时间</font> |
| <font style="color:black;">taskId</font> | String | <font style="color:black;">任务id</font> |
| <font style="color:black;">activityId</font> | String | <font style="color:black;">节点id</font> |
| <font style="color:black;">activityName</font> | String | <font style="color:black;">节点名称</font> |
| <font style="color:black;">processInstanceId</font> | String | <font style="color:black;">流程实例</font><font style="color:black;">id</font> |
| <font style="color:black;">action</font> | String | <font style="color:black;">动作</font> |
| <font style="color:black;">message</font> | String | <font style="color:black;">审批意见</font> |




<h3 id="ImHHR">示例</h3>
<h4 id="zP0ad">请求示例</h4>

```plain
/api/flow/query/getCommentInfosByProcessInstanceId/702652ae3e3211eda6bc766c80182d43
```

<h4 id="L6azl">返回示例</h4>

```json
{
    "code": "100",
    "msg": "查询成功！",
    "data": [
        {
            "createTime": null,
            "creator": null,
            "updateTime": null,
            "updator": null,
            "delFlag": 1,
            "keyword": null,
            "id": "f7ad391d24ed77669c50db2430f9abd7",
            "type": "TJ",
            "typeName": "提交",
            "personalCode": "10000",
            "personalName": "易烊千玺",
            "personalHeadImg": "data:image/png;base64,iVB...II=",
            "time": "2022-09-27 15:03:07",
            "taskId": null,
            "activityId": "startEvent1",
            "activityName": null,
            "processInstanceId": "702652ae3e3211eda6bc766c80182d43",
            "action": null,
            "message": "提交"
        },
        {
            "createTime": null,
            "creator": null,
            "updateTime": null,
            "updator": null,
            "delFlag": 1,
            "keyword": null,
            "id": "82cb99806b8484cd3dfa182a5f7a3ca9",
            "type": "SP",
            "typeName": "审批",
            "personalCode": "10000",
            "personalName": "易烊千玺",
            "personalHeadImg": "data:image/png;base64,iVBO...I=",
            "time": "2022-09-27 15:03:16",
            "taskId": "7026a0df3e3211eda6bc766c80182d43",
            "activityId": "Activity_0ovvldu",
            "activityName": "经理",
            "processInstanceId": "702652ae3e3211eda6bc766c80182d43",
            "action": null,
            "message": ""
        },
        ...
        {
            "createTime": null,
            "creator": null,
            "updateTime": null,
            "updator": null,
            "delFlag": 1,
            "keyword": null,
            "id": "f63ab1e18bec3fcb82999d586613cc81",
            "type": "SPJS",
            "typeName": "审批结束",
            "personalCode": "system",
            "personalName": null,
            "personalHeadImg": null,
            "time": "2022-09-27 15:51:34",
            "taskId": null,
            "activityId": null,
            "activityName": null,
            "processInstanceId": "702652ae3e3211eda6bc766c80182d43",
            "action": null,
            "message": "审批结束"
        }
    ],
    "success": true
}
```



<h2 id="GdlEn">获取模块分页列表</h2>

:::tips
+ **URL**：`/api/flow/query/getPagerModelModelInfo`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="AbiFS">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="WtnIT">Path参数</h3>
ModelInfo

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| categoryCode | String | 否 | 分类编码 |
| keyword | String | 否 | 可模糊搜索模型名称和模型key |
| appSn | String | 否 | 系统标识 |
| formType | Integer | 否 | 模型类型: 0 自定义流程 1是业务流程 |
| status | Integer | 否 | 流程图Model状态 |
| extendStatus | Integer | 否 | 拓展信息 状态 |
| modelType | Integer | 否 | 模块类型 |


<h3 id="O5mVQ">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | PagerModel | 返回数据列表<br/>```json {     "total": 1,     "rows": List<ModelInfo> } ```  |


ModelInfo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| <font style="color:black;">id</font> | String | 主键ID |
| <font style="color:black;">modelId</font> | String | 模型id |
| <font style="color:black;">name</font> | String | <font style="color:black;">模型名称</font> |
| <font style="color:black;">modelKey</font> | String | <font style="color:black;">模型key</font> |
| <font style="color:black;">modelType</font> | Integer | <font style="color:black;"></font> |
| <font style="color:black;">formType</font> | StrIntegerng | 模型类型: 0 自定义流程 1是业务流程 |
| appSn | String | <font style="color:black;">系统标识</font> |
| categoryCode | String | 分类编码 |
| status | Integer | 流程图Model状态 |
| ownDeptId | String | 所属部们id |
| ownDeptName | String | 所属部门名称 |
| flowOwnerNo | String | 流程拥有者ID |
| flowOwnerName | String | 流程拥有者名称 |
| processDockingNo | String | 流程对接人工号 |
| processDockingName | String | 流程对接人名称 |
| applyCompanies | String(json格式) | 适用公司(多个公司，以逗号隔开) |
| superuser | String(json格式) | 授权管理人员 |
| showStatus | Integer | 流程中心是否显示 1 是 0 否 |
| extendStatus | Integer | 拓展信息 状态 |
| createTime | Date | 创建时间 |
| creator | String | 创建人 |
| update_time | Date | 修改时间 |
| updator | String | 修改人 |




<h3 id="tmhfn">示例</h3>
<h4 id="NEo4a">请求示例</h4>

```plain
{
  "entity":{
    "keyword": "aaa"
  },
  "query": {
    "pageSize": 15,
    "pageNum": 1
  }
}
```

<h4 id="YmBYc">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": {
        "total": 1,
        "rows": [
            {
                "createTime": "2021-11-08 22:00:42",
                "creator": "10100",
                "updateTime": "2021-11-16 11:30:49",
                "updator": "10100",
                "delFlag": 1,
                "keyword": null,
                "id": "17f82eb7eeb04f7a189c436629270c5d",
                "modelId": "42bc8740409c11ecb9bb00ff6db6e2b2",
                "name": "222adfasdfasd",
                "modelKey": "aaaaa3333ccccccasdfadsf",
                "modelType": 4,
                "formType": null,
                "appSn": "flow",
                "appName": "流程中心",
                "categoryCode": "rs",
                "categoryName": "人事管理",
                "status": 3,
                "statusName": "已发布",
                "extendStatus": 3,
                "extendStatusName": null,
                "ownDeptId": null,
                "ownDeptName": null,
                "flowOwnerNo": null,
                "flowOwnerName": null,
                "processDockingNo": null,
                "processDockingName": null,
                "applyCompanies": null,
                "showStatus": null,
                "appliedRange": null,
                "appliedRangeName": null,
                "authPointList": null,
                "superuser": null,
                "businessUrl": null,
                "skipSet": null,
                "modelIcon": null,
                "orderNo": null,
                "categoryCodes": null,
                "processDefinitionId": null,
                "modelXml": null
            },
          ...
        ]
    },
    "success": true
}
```

<h4 id="ftbju"></h4>
<h1 id="gh23o">基础数据操作</h1>
<h2 id="E1eJE">获取所有流程分类列表</h2>

:::info
+ **URL**：`/api/flow/base/getCategories`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="uocwL">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="gYEak">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `keyword` | String | 否 | 模糊查询条件 |


<h3 id="Jw2gC">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | Category | 返回数据<br/>```json [{     "createTime": "2021-10-21 20:48:18",     "creator": "10100",     "updateTime": "2022-10-20 10:26:04",     "updator": "10100",     "delFlag": 1,     "keyword": null,     "id": "2029992b16ba174805a6f42f5b1d82d0",     "pid": null,     "name": "业务流程审批",     "code": "businessFlow",     "frontShow": 1,     "shortName": "业务流程",     "note": null,     "orderNo": 999,     "companyId": "a9927a64fd10fe8c5cb0c274c30a89f6",     "createTimeStr": null,     "updateTimeStr": null,     "cname": null }] ```  |


Category

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| id | String | 业务流程key |
| pid | String | 流程标题 |
| name | String | 任务id |
| code | String | 流程状态 |
| frontShow | String | 流程状态名称 |
| shortName | String | 表单名称 |
| note | String | 流程实例id |
| orderNo | String | 提交人工号 |
| companyId | String | 提交人姓名 |


<h3 id="mUJSW">示例</h3>
<h4 id="I2HzM">请求示例</h4>

```json
{
    "keyword": "流程"
}
```

<h4 id="esWPw">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": [
        {
            "createTime": "2021-10-21 20:48:18",
            "creator": "10100",
            "updateTime": "2022-10-20 10:26:04",
            "updator": "10100",
            "delFlag": 1,
            "keyword": null,
            "id": "2029992b16ba174805a6f42f5b1d82d0",
            "pid": null,
            "name": "业务流程审批",
            "code": "businessFlow",
            "frontShow": 1,
            "shortName": "业务流程",
            "note": null,
            "orderNo": 999,
            "companyId": "a9927a64fd10fe8c5cb0c274c30a89f6",
            "createTimeStr": null,
            "updateTimeStr": null,
            "cname": null
        },
        {
            "createTime": "2022-08-04 13:58:55",
            "creator": "10100",
            "updateTime": "2022-08-04 14:00:00",
            "updator": "10100",
            "delFlag": 1,
            "keyword": null,
            "id": "5586fc987908e91eb99ae51f25e56e69",
            "pid": "8a948c78589a8f4101589a92c5b10001",
            "name": "发文子流程",
            "code": "NOTICE_CHILDREN",
            "frontShow": 1,
            "shortName": "发文子流程",
            "note": "发文子流程",
            "orderNo": 100,
            "companyId": "a9927a64fd10fe8c5cb0c274c30a89f6",
            "createTimeStr": null,
            "updateTimeStr": null,
            "cname": null
        }
      ...
    ]
}
```

<h4 id="jGgLE"></h4>
<h2 id="AfZIh">获取所有应用列表</h2>

:::info
+ **URL**：`/api/flow/base/getApps`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="Vsfi5">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="ys8M2">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | Category | 返回数据<br/>```json [   {       "createTime": "2021-05-19 15:04:55",       "creator": null,       "updateTime": null,       "updator": null,       "delFlag": 1,       "keyword": null,       "id": "1376919254872035330",       "name": "门户",       "sn": "portal",       "status": 1,       "url": "http://localhost:8000",       "indexUrl": "/index",       "image": "ant-design:account-book-filled",       "note": null,       "orderNo": 1   },   {       "createTime": "2021-05-19 15:05:02",       "creator": null,       "updateTime": null,       "updator": null,       "delFlag": 1,       "keyword": null,       "id": "1376919486070460417",       "name": "流程中心",       "sn": "flow",       "status": 1,       "url": "http://localhost:8989",       "indexUrl": "/index.html",       "image": null,       "note": null,       "orderNo": 1   } ] ```  |


Category

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| id | String | 主键 |
| name | String | 名称 |
| sn | String | 系统标示 |
| secretKey | String | 秘钥 |
| status | String | 状态 |
| url | String | 系统url前缀 |
| indexUrl | String | 系统首页URL |
| image | String | 系统的图标 |
| note | String | 系统备注 |
| orderNo | Integer | 排序号 |


<h3 id="CzPiH">示例</h3>
<h4 id="VW6nl">请求示例</h4>

```json
/api/flow/base/getApps
```

<h4 id="Buyhs">返回示例</h4>

```json
{
  "code": "100",
  "msg": "OK",
  "data": [
      {
          "createTime": "2021-05-19 15:04:55",
          "creator": null,
          "updateTime": null,
          "updator": null,
          "delFlag": 1,
          "keyword": null,
          "id": "1376919254872035330",
          "name": "门户",
          "sn": "portal",
          "secretKey": "K9909Jszc%YcleRr50c9aRO88q5QdxK#~0XeJz8FU89092MA5ytwyE%bFTL0MUwF",
          "status": 1,
          "url": "http://localhost:8000",
          "indexUrl": "/index",
          "image": "ant-design:account-book-filled",
          "note": null,
          "orderNo": 1
      },
      {
          "createTime": "2021-05-19 15:05:02",
          "creator": null,
          "updateTime": null,
          "updator": null,
          "delFlag": 1,
          "keyword": null,
          "id": "1376919486070460417",
          "name": "流程中心",
          "sn": "flow",
          "secretKey": "Fu9E9N9m19b52@H9A6YWa0t8T2&$1Y~lt0d2nO9du1SP9m71X7bk@0551hVGG!K7",
          "status": 1,
          "url": "http://localhost:8989",
          "indexUrl": "/index.html",
          "image": null,
          "note": null,
          "orderNo": 1
      },
    ...
  ]
}
```



<h2 id="n1oud">上传附件</h2>

:::info
+ **URL**：`/api/flow/base/uploadFile`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="m9PmK">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="jIYlz">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `multipartFile` | File | 是 | 文件对象 |


<h3 id="k2Afi">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | String | 文件绝对地址：如<br/>```json https://xxx-1302811146.cos.ap-chengdu.myqcloud.com/portal/2023/2/23/8a868f1b867d0ab201867d0ab2940000.jpg ```  |


<h3 id="FBXFn">示例</h3>
<h4 id="xjnde">请求示例</h4>

```json
/api/flow/base/uploadFile
```

<h4 id="Vrm4f">返回示例</h4>

```json
{
    "code": "100",
    "msg": "上传文件成功！",
    "data": "https://xxx-1302811146.cos.ap-chengdu.myqcloud.com/portal/2023/2/23/8a868f1b867d0ab201867d0ab2940000.jpg",
    "success": true
}
```



<h2 id="UmXNw">获取字典列表</h2>

:::info
+ **URL**：`/api/flow/base/getDictionarys`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="li4PZ">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="LNySx">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| dicTypeId | String | 否 | 字典分类 |
| code | String | 否 | 字典标识 |


<h3 id="xl0Ak">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | Dictionary | 返回数据<br/>```json [   {       "createTime": "2021-06-22 14:17:46",       "creator": "10100",       "updateTime": "2021-06-22 14:18:01",       "updator": "10100",       "delFlag": 1,       "keyword": null,       "id": "320bf113fbad87e4f1ec9d76aa3c57c4",       "dicTypeId": "0318080d217e0e1dfdce9eba43adf29d",       "code": "3333333",       "ename": null,       "cname": "33",       "remark": "333"   } ] ```  |


Dictionary

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| id | String | 主键 |
| dicTypeId | String | 数据字典id |
| code | String | 编码 |
| ename | String | 英文名称 |
| cname | String | 中文名称 |
| remark | String | 备注 |


<h3 id="kc8I4">示例</h3>
<h4 id="MkTzc">请求示例</h4>

```json
{
    "code": "",
    "dicTypeId": "0318080d217e0e1dfdce9eba43adf29d"
}
```

<h4 id="Nxtjq">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": [
        {
            "createTime": "2021-06-22 14:17:46",
            "creator": "10100",
            "updateTime": "2021-06-22 14:18:01",
            "updator": "10100",
            "delFlag": 1,
            "keyword": null,
            "id": "320bf113fbad87e4f1ec9d76aa3c57c4",
            "dicTypeId": "0318080d217e0e1dfdce9eba43adf29d",
            "code": "3333333",
            "ename": null,
            "cname": "33",
            "remark": "333"
        },
      ...
    ],
    "success": true
}
```



<h2 id="gFgbs">获取字典项列表</h2>

:::info
+ **URL**：`/api/flow/base/getDictionaryItems`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="jBpS6">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="C8gk7">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| mainId | String | 否 | 字典ID |


<h3 id="o7aLf">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | DicItem | 返回数据<br/>```json [   {       "createTime": "2021-06-22 14:17:53",       "creator": "10100",       "updateTime": "2021-06-22 14:17:58",       "updator": "10100",       "delFlag": 1,       "keyword": null,       "id": "7b3bb65c13c16f4b731ee8a152088c53",       "code": "4444",       "cname": "444",       "ename": null,       "mainId": "320bf113fbad87e4f1ec9d76aa3c57c4",       "orderNo": 55   },   {       "createTime": "2021-06-22 14:18:06",       "creator": "10100",       "updateTime": null,       "updator": null,       "delFlag": 0,       "keyword": null,       "id": "5c8ef471adc8f0498678c20ffdbec578",       "code": "66",       "cname": "66",       "ename": null,       "mainId": "320bf113fbad87e4f1ec9d76aa3c57c4",       "orderNo": 66   } ] ```  |


DicItem

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| id | String | 主键 |
| code | String | 编码 |
| cname | String | 中文 |
| ename | String | 英文 |
| mainId | String | 主表id |
| orderNo | Integer | 排序号 |


<h3 id="JbUbe">示例</h3>
<h4 id="SZ8fz">请求示例</h4>

```json
{
    "mainId": "320bf113fbad87e4f1ec9d76aa3c57c4"
}
```

<h4 id="VblBi">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": [
        {
            "createTime": "2021-06-22 14:17:53",
            "creator": "10100",
            "updateTime": "2021-06-22 14:17:58",
            "updator": "10100",
            "delFlag": 1,
            "keyword": null,
            "id": "7b3bb65c13c16f4b731ee8a152088c53",
            "code": "4444",
            "cname": "444",
            "ename": null,
            "mainId": "320bf113fbad87e4f1ec9d76aa3c57c4",
            "orderNo": 55
        },
        {
            "createTime": "2021-06-22 14:18:06",
            "creator": "10100",
            "updateTime": null,
            "updator": null,
            "delFlag": 0,
            "keyword": null,
            "id": "5c8ef471adc8f0498678c20ffdbec578",
            "code": "66",
            "cname": "66",
            "ename": null,
            "mainId": "320bf113fbad87e4f1ec9d76aa3c57c4",
            "orderNo": 66
        }
    ],
    "success": true
}
```



<h1 id="UqJ44">组织人员相关</h1>
<h2 id="g7DUP">得到组织树</h2>

:::info
+ **URL**：`/api/flow/org/getOrgTree`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="hApjN">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="YCMr8">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | List<OrgTreeVo> | 返回数据<br/>```json [   {       "id": "05c18946c76d579d45e808c55531c21c",       "pid": "a9927a64fd10fe8c5cb0c274c30a89f6",       "code": null,       "name": "成都XX贸易有限公司",       "shortName": "成都XX贸易有限公司",       "companyId": null,       "companyName": null,       "sourceType": "1",       "leaderCode": null,       "leaderName": null   },   {       "id": "0e799879c0aed7373a30907732c81573",       "pid": "a9927a64fd10fe8c5cb0c274c30a89f6",       "code": null,       "name": "云南XXXX有限公司",       "shortName": "云南XXXX有限公司",       "companyId": null,       "companyName": null,       "sourceType": "1",       "leaderCode": null,       "leaderName": null   } ] ```  |


OrgTreeVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| id | String | id |
| pid | String | 父id |
| code | String | 编码 |
| name | String | 名称 |
| sourceType | String | 来源类型 |
| shortName | String | 简称 |
| leaderCode | String | 上级编码 |
| leaderName | String | 上级名称 |


<h3 id="O8Vj1">示例</h3>
<h4 id="z79Hl">请求示例</h4>

```json
/api/flow/org/getOrgTree
```

<h4 id="dP8sS">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": [
        {
            "id": "00a086cd9f823d5baa32899814a72c0e",
            "pid": "04fc30761b56c6a0081a1fae4de5119b",
            "code": "TLKJ_ZHGC",
            "name": "智慧工厂",
            "shortName": "智慧工厂",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "04fc30761b56c6a0081a1fae4de5119b",
            "pid": null,
            "code": "TLKJ001",
            "name": "砼联数字科技有限公司",
            "shortName": "砼联科技",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "1",
            "pid": null,
            "code": "1000",
            "name": "中国石化",
            "shortName": "中国石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "1111",
            "pid": null,
            "code": "1000111",
            "name": "三一重工集团123",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "2",
            "pid": "1",
            "code": "100001",
            "name": "北京市石化",
            "shortName": "北京市石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "22222",
            "pid": null,
            "code": "100022",
            "name": "三一重工集团",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "3",
            "pid": "1",
            "code": "100002",
            "name": "天津市石化",
            "shortName": "天津市石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "333",
            "pid": null,
            "code": "10003333",
            "name": "三一重工集团333",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "3def79b7a9de49061fa46966443e3a30",
            "pid": "1",
            "code": "eeeeee",
            "name": "eeeee",
            "shortName": "eeee",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "4",
            "pid": "1",
            "code": "100003",
            "name": "河北省石化",
            "shortName": "河北省石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a1163bdc0000",
            "pid": null,
            "code": "123",
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a11eccc80003",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a120803e0004",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a1212e9d0005",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a122b8fc0006",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a12462a90007",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a12859f10008",
            "pid": null,
            "code": null,
            "name": null,
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a13b6f3b000c",
            "pid": null,
            "code": "1234",
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "a9dc37e16f97a407eec18d3fcd397d6b",
            "pid": "1",
            "code": "hnszgsh",
            "name": "湖南省长沙市中国石化集团有限公司",
            "shortName": "湖南省长沙市中国石化集团有限公司",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "1111",
            "pid": "1",
            "code": null,
            "name": "开发部",
            "shortName": "开发部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "33333",
            "pid": "1",
            "code": null,
            "name": "开发部1",
            "shortName": "开发部1",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "2f155c26ed26693a3f3def17b73e148c",
            "pid": "21",
            "code": null,
            "name": "研发一部",
            "shortName": "研发一部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": "10001",
            "leaderName": "徐峥"
        },
        {
            "id": "8280808186a1163b0186a11bd0310001",
            "pid": "1",
            "code": null,
            "name": "研发部",
            "shortName": "研发部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a13ec20c000d",
            "pid": "1",
            "code": null,
            "name": "研发部",
            "shortName": "研发部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "ebcd2927a98bab6bf94e096ecc1fd5bc",
            "pid": "2f155c26ed26693a3f3def17b73e148c",
            "code": null,
            "name": "Java研发",
            "shortName": "Java研发",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "20",
            "pid": "a9dc37e16f97a407eec18d3fcd397d6b",
            "code": null,
            "name": "人资部",
            "shortName": "人资部",
            "companyId": "a9dc37e16f97a407eec18d3fcd397d6b",
            "companyName": "湖南省长沙市中国石化集团有限公司",
            "sourceType": "2",
            "leaderCode": "10001",
            "leaderName": "徐峥"
        },
        {
            "id": "28",
            "pid": "2",
            "code": null,
            "name": "人资部",
            "shortName": "人资部",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": "10002",
            "leaderName": "周冬雨"
        },
        {
            "id": "36",
            "pid": "3",
            "code": null,
            "name": "人资部",
            "shortName": "人资部",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "44",
            "pid": "4",
            "code": null,
            "name": "人资部",
            "shortName": "人资部",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "21",
            "pid": "1",
            "code": null,
            "name": "技术部",
            "shortName": "技术部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "29",
            "pid": "2",
            "code": null,
            "name": "技术部",
            "shortName": "技术部",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "37",
            "pid": "3",
            "code": null,
            "name": "技术部",
            "shortName": "技术部",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "45",
            "pid": "4",
            "code": null,
            "name": "技术部",
            "shortName": "技术部",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "22",
            "pid": "1",
            "code": null,
            "name": "产品部",
            "shortName": "产品部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "30",
            "pid": "2",
            "code": null,
            "name": "产品部",
            "shortName": "产品部",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "38",
            "pid": "3",
            "code": null,
            "name": "产品部",
            "shortName": "产品部",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "46",
            "pid": "4",
            "code": null,
            "name": "产品部",
            "shortName": "产品部",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "23",
            "pid": "1",
            "code": null,
            "name": "销售部",
            "shortName": "销售部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "31",
            "pid": "2",
            "code": null,
            "name": "销售部",
            "shortName": "销售部",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "39",
            "pid": "3",
            "code": null,
            "name": "销售部",
            "shortName": "销售部",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "47",
            "pid": "4",
            "code": null,
            "name": "销售部",
            "shortName": "销售部",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "24",
            "pid": "1",
            "code": null,
            "name": "财务部",
            "shortName": "财务部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "32",
            "pid": "2",
            "code": null,
            "name": "财务部",
            "shortName": "财务部",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "40",
            "pid": "3",
            "code": null,
            "name": "财务部",
            "shortName": "财务部",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "48",
            "pid": "4",
            "code": null,
            "name": "财务部",
            "shortName": "财务部",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "25",
            "pid": "1",
            "code": null,
            "name": "运营部",
            "shortName": "运营部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "33",
            "pid": "2",
            "code": null,
            "name": "运营部",
            "shortName": "运营部",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "41",
            "pid": "3",
            "code": null,
            "name": "运营部",
            "shortName": "运营部",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "49",
            "pid": "4",
            "code": null,
            "name": "运营部",
            "shortName": "运营部",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "26",
            "pid": "1",
            "code": null,
            "name": "市场部",
            "shortName": "市场部",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "34",
            "pid": "2",
            "code": null,
            "name": "市场部",
            "shortName": "市场部",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "42",
            "pid": "3",
            "code": null,
            "name": "市场部",
            "shortName": "市场部",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "50",
            "pid": "4",
            "code": null,
            "name": "市场部",
            "shortName": "市场部",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "27",
            "pid": "1",
            "code": null,
            "name": "领导班子",
            "shortName": "领导班子",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "35",
            "pid": "2",
            "code": null,
            "name": "领导班子",
            "shortName": "领导班子",
            "companyId": "2",
            "companyName": "北京市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "43",
            "pid": "3",
            "code": null,
            "name": "领导班子",
            "shortName": "领导班子",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "51",
            "pid": "4",
            "code": null,
            "name": "领导班子",
            "shortName": "领导班子",
            "companyId": "4",
            "companyName": "河北省石化",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "067df20939bcc88e0ec3e76b180003a1",
            "pid": "3def79b7a9de49061fa46966443e3a30",
            "code": null,
            "name": "dsfadsfasdf",
            "shortName": "dsfadsfasdf",
            "companyId": "3def79b7a9de49061fa46966443e3a30",
            "companyName": "eeeee",
            "sourceType": "2",
            "leaderCode": "10001",
            "leaderName": "徐峥"
        },
        {
            "id": "7328faaa4ad0c411ce190f81255b8550",
            "pid": "3",
            "code": null,
            "name": "33333444",
            "shortName": "33333444",
            "companyId": "3",
            "companyName": "天津市石化",
            "sourceType": "2",
            "leaderCode": "10000",
            "leaderName": "易烊千玺"
        },
        {
            "id": "8c1d7fbd8f9859a383f3b62558b4a002",
            "pid": "00a086cd9f823d5baa32899814a72c0e",
            "code": null,
            "name": "事业部",
            "shortName": "事业部",
            "companyId": "00a086cd9f823d5baa32899814a72c0e",
            "companyName": "智慧工厂",
            "sourceType": "2",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8def0165ad28ce29907c5c3abcc57f68",
            "pid": "067df20939bcc88e0ec3e76b180003a1",
            "code": null,
            "name": "asdfasdf",
            "shortName": "asdfasdf",
            "companyId": "1",
            "companyName": "中国石化",
            "sourceType": "2",
            "leaderCode": "10002",
            "leaderName": "周冬雨"
        },
        {
            "id": "2f420e0b646db15a45f8fbb8b6b92835",
            "pid": "067df20939bcc88e0ec3e76b180003a1",
            "code": null,
            "name": "asdfasdf",
            "shortName": "asdfasdf",
            "companyId": "3def79b7a9de49061fa46966443e3a30",
            "companyName": "eeeee",
            "sourceType": "2",
            "leaderCode": "10001",
            "leaderName": "徐峥"
        }
    ],
    "success": true
}
```



<h2 id="VnTI2">得到公司树</h2>

:::info
+ **URL**：`/api/flow/base/getCompanyTree`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="A5gH4">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="udJsN">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | List<OrgTreeVo> | 返回数据<br/>```json [         {             "id": "00a086cd9f823d5baa32899814a72c0e",             "pid": "04fc30761b56c6a0081a1fae4de5119b",             "code": "TLKJ_ZHGC",             "name": "智慧工厂",             "shortName": "智慧工厂",             "companyId": null,             "companyName": null,             "sourceType": "1",             "leaderCode": null,             "leaderName": null         } ] ```  |


OrgTreeVo

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| id | String | id |
| pid | String | 父id |
| code | String | 编码 |
| name | String | 名称 |
| sourceType | String | 来源类型 |
| shortName | String | 简称 |
| leaderCode | String | 上级编码 |
| leaderName | String | 上级名称 |


<h3 id="OEnsS">示例</h3>
<h4 id="YuPG2">请求示例</h4>

```json
/api/flow/org/getCompanyTree
```

<h4 id="rFuRV">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": [
        {
            "id": "00a086cd9f823d5baa32899814a72c0e",
            "pid": "04fc30761b56c6a0081a1fae4de5119b",
            "code": "TLKJ_ZHGC",
            "name": "智慧工厂",
            "shortName": "智慧工厂",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "04fc30761b56c6a0081a1fae4de5119b",
            "pid": null,
            "code": "TLKJ001",
            "name": "砼联数字科技有限公司",
            "shortName": "砼联科技",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "1",
            "pid": null,
            "code": "1000",
            "name": "中国石化",
            "shortName": "中国石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "1111",
            "pid": null,
            "code": "1000111",
            "name": "三一重工集团123",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "2",
            "pid": "1",
            "code": "100001",
            "name": "北京市石化",
            "shortName": "北京市石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "22222",
            "pid": null,
            "code": "100022",
            "name": "三一重工集团",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "3",
            "pid": "1",
            "code": "100002",
            "name": "天津市石化",
            "shortName": "天津市石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "333",
            "pid": null,
            "code": "10003333",
            "name": "三一重工集团333",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "3def79b7a9de49061fa46966443e3a30",
            "pid": "1",
            "code": "eeeeee",
            "name": "eeeee",
            "shortName": "eeee",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "4",
            "pid": "1",
            "code": "100003",
            "name": "河北省石化",
            "shortName": "河北省石化",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a1163bdc0000",
            "pid": null,
            "code": "123",
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a11eccc80003",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a120803e0004",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a1212e9d0005",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a122b8fc0006",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a12462a90007",
            "pid": null,
            "code": null,
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a12859f10008",
            "pid": null,
            "code": null,
            "name": null,
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "8280808186a1163b0186a13b6f3b000c",
            "pid": null,
            "code": "1234",
            "name": "山东蓝翔科技",
            "shortName": null,
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        },
        {
            "id": "a9dc37e16f97a407eec18d3fcd397d6b",
            "pid": "1",
            "code": "hnszgsh",
            "name": "湖南省长沙市中国石化集团有限公司",
            "shortName": "湖南省长沙市中国石化集团有限公司",
            "companyId": null,
            "companyName": null,
            "sourceType": "1",
            "leaderCode": null,
            "leaderName": null
        }
    ],
    "success": true
}
```



<h2 id="L8Dds">人员选择器列表</h2>

:::info
+ **URL**：`/api/flow/org/getPagePersonal`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="RiP0A">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="rY9fw">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | Personal | 返回数据<br/>```json {         "total": 113,         "rows": [             {                 "createTime": "2023-03-02 14:57:42",                 "creator": null,                 "updateTime": null,                 "updator": null,                 "delFlag": 1,                 "keyword": null,                 "id": "8280808186a1163b0186a11cc2a90002",                 "code": null,                 "name": "老王",                 "leaderCode": null,                 "leaderName": null,                 "headImg": null,                 "mobile": null,                 "email": null,                 "deptId": "2",                 "deptName": null,                 "companyId": "1",                 "companyName": null,                 "status": 1,                 "leaveDate": null,                 "ddUserid": null,                 "sex": 0,                 "address": null,                 "fax": null,                 "positionCode": null,                 "positionName": null,                 "jobGradeCode": null,                 "jobGradeName": null,                 "deptCode": null,                 "companyCode": null,                 "roles": null,                 "companyIds": null,                 "deptIds": null             }         ]     } ```  |


Personal

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| id | String | 是 | 主键 |
| companyId | String | 是 | 公司id |
| companyName | String | 否 | 公司名称 |
| deptId | String | 是 | 部门id |
| deptName | String | 否 | 部门名称 |
| name | String | 是 | 人员名称 |
| code | String | 是 | 人员编码（工号） |
| mobile | String | 否 | 手机号 |
| email | String | 否 | 邮箱 |
| leaderCode | String | 否 | 领导的工号 |
| headImg | String | 否 | 头像 |
| sex | Integer | 否 | 性别1：男；2：女 |
| address | String | 否 | 地址 |
| positionCode | String | 否 | 岗位编码 |
| status | Integer | 否 | 状态（1：在职，0：离职） |
| leaveDate | Date | 否 | 离职时间 |
| fax | String | 否 | 传真 |
| createTime | Date | 否 | 创建时间 |
| creator | String | 否 | 创建人 |
| updateTime | Date | 否 | 修改时间 |
| updator | String | 否 | 修改人 |
| delFlag | Integer | 否 | 上删除标识 |


<h3 id="qSWbm">示例</h3>
<h4 id="IhjsX">请求示例</h4>

```json
{
  "entity":{
    "code": "10000",
    "name": ""
  },
  "query": {
    "pageSize": 1,
    "pageNum": 1
  }
}
```

<h4 id="Gyzg0">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK",
    "data": {
        "total": 113,
        "rows": [
            {
                "createTime": "2023-03-02 14:57:42",
                "creator": null,
                "updateTime": null,
                "updator": null,
                "delFlag": 1,
                "keyword": null,
                "id": "8280808186a1163b0186a11cc2a90002",
                "code": null,
                "name": "老王",
                "leaderCode": null,
                "leaderName": null,
                "headImg": null,
                "mobile": null,
                "email": null,
                "deptId": "2",
                "deptName": null,
                "companyId": "1",
                "companyName": null,
                "status": 1,
                "leaveDate": null,
                "ddUserid": null,
                "sex": 0,
                "address": null,
                "fax": null,
                "positionCode": null,
                "positionName": null,
                "jobGradeCode": null,
                "jobGradeName": null,
                "deptCode": null,
                "companyCode": null,
                "roles": null,
                "companyIds": null,
                "deptIds": null
            }
        ]
    },
    "success": true
}
```

<h4 id="FkSH0"></h4>
<h2 id="p3EEz">通过工号得到人员数据</h2>

:::info
+ **URL**：`/api/flow/org/getPersonalByCode`/{code}
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="D6qyY">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="G28WH">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | Personal | 返回数据<br/>```json {         "createTime": "2023-02-01 17:14:42",         "creator": "10000",         "updateTime": null,         "updator": null,         "delFlag": 1,         "keyword": null,         "id": "b840f4c95f2f666c0fbad0b41441f17d",         "code": "001",         "name": "张鹏",         "leaderCode": null,         "leaderName": null,         "headImg": "",         "mobile": "17781751135",         "email": null,         "deptId": "8c1d7fbd8f9859a383f3b62558b4a002",         "deptName": "事业部",         "companyId": "00a086cd9f823d5baa32899814a72c0e",         "companyName": "智慧工厂",         "status": 1,         "leaveDate": null,         "ddUserid": null,         "sex": 1,         "address": null,         "fax": null,         "positionCode": "1a0eceeb20dd432ca4dec32ab2537221",         "positionName": null,         "jobGradeCode": "9fed2001aafccc0a378c66439cbdeb31",         "jobGradeName": null,         "deptCode": null,         "companyCode": null,         "roles": null,         "companyIds": null,         "deptIds": null     } ```  |


Personal

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| id | String | 是 | 主键 |
| companyId | String | 是 | 公司id |
| companyName | String | 否 | 公司名称 |
| deptId | String | 是 | 部门id |
| deptName | String | 否 | 部门名称 |
| name | String | 是 | 人员名称 |
| code | String | 是 | 人员编码（工号） |
| mobile | String | 否 | 手机号 |
| email | String | 否 | 邮箱 |
| leaderCode | String | 否 | 领导的工号 |
| headImg | String | 否 | 头像 |
| sex | Integer | 否 | 性别1：男；2：女 |
| address | String | 否 | 地址 |
| positionCode | String | 否 | 岗位编码 |
| status | Integer | 否 | 状态（1：在职，0：离职） |
| leaveDate | Date | 否 | 离职时间 |
| fax | String | 否 | 传真 |
| createTime | Date | 否 | 创建时间 |
| creator | String | 否 | 创建人 |
| updateTime | Date | 否 | 修改时间 |
| updator | String | 否 | 修改人 |
| delFlag | Integer | 否 | 上删除标识 |


<h3 id="iuCHG">示例</h3>
<h4 id="hsuMk">请求示例</h4>

```json
/api/flow/org/getPersonalByCode/001
```

<h4 id="PrbKq">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK！",
    "data": {
        "createTime": "2023-02-01 17:14:42",
        "creator": "10000",
        "updateTime": null,
        "updator": null,
        "delFlag": 1,
        "keyword": null,
        "id": "b840f4c95f2f666c0fbad0b41441f17d",
        "code": "001",
        "name": "张鹏",
        "leaderCode": null,
        "leaderName": null,
        "headImg": "",
        "mobile": "17781751135",
        "email": null,
        "deptId": "8c1d7fbd8f9859a383f3b62558b4a002",
        "deptName": "事业部",
        "companyId": "00a086cd9f823d5baa32899814a72c0e",
        "companyName": "智慧工厂",
        "status": 1,
        "leaveDate": null,
        "ddUserid": null,
        "sex": 1,
        "address": null,
        "fax": null,
        "positionCode": "1a0eceeb20dd432ca4dec32ab2537221",
        "positionName": null,
        "jobGradeCode": "9fed2001aafccc0a378c66439cbdeb31",
        "jobGradeName": null,
        "deptCode": null,
        "companyCode": null,
        "roles": null,
        "companyIds": null,
        "deptIds": null
    },
    "success": true
}
```



<h2 id="pswS1">通过工号List集合得到人员列表数据</h2>

:::info
+ **URL**：`/api/flow/org/getPersonalByCodes`
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="jugIo">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="GPKS9">Body参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| codes | List<String> | 是 | 员工工号 |


<h3 id="kO9wN">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | List<Personal> | 返回数据<br/>```json  [         {             "createTime": "2023-02-01 17:14:42",             "creator": "10000",             "updateTime": null,             "updator": null,             "delFlag": 1,             "keyword": null,             "id": "b840f4c95f2f666c0fbad0b41441f17d",             "code": "001",             "name": "张鹏",             "leaderCode": null,             "leaderName": null,             "headImg": "",             "mobile": "17781751135",             "email": null,             "deptId": "8c1d7fbd8f9859a383f3b62558b4a002",             "deptName": "事业部",             "companyId": "00a086cd9f823d5baa32899814a72c0e",             "companyName": "智慧工厂",             "status": 1,             "leaveDate": null,             "ddUserid": null,             "sex": 1,             "address": null,             "fax": null,             "positionCode": "1a0eceeb20dd432ca4dec32ab2537221",             "positionName": null,             "jobGradeCode": "9fed2001aafccc0a378c66439cbdeb31",             "jobGradeName": null,             "deptCode": null,             "companyCode": null,             "roles": null,             "companyIds": null,             "deptIds": null         },         {             "createTime": "2023-02-01 17:20:12",             "creator": "10000",             "updateTime": null,             "updator": null,             "delFlag": 1,             "keyword": null,             "id": "745e850513723c4435422dab02bcb035",             "code": "002",             "name": "韩登",             "leaderCode": null,             "leaderName": null,             "headImg": "",             "mobile": "17777777777",             "email": null,             "deptId": "8c1d7fbd8f9859a383f3b62558b4a002",             "deptName": "事业部",             "companyId": "00a086cd9f823d5baa32899814a72c0e",             "companyName": "智慧工厂",             "status": 1,             "leaveDate": null,             "ddUserid": null,             "sex": 1,             "address": null,             "fax": null,             "positionCode": "8584039861e14e7ea040c001dac2871b",             "positionName": null,             "jobGradeCode": "da8227a117bc2ba6b59d1b6e70a29cd2",             "jobGradeName": null,             "deptCode": null,             "companyCode": null,             "roles": null,             "companyIds": null,             "deptIds": null         }     ] ```  |


Personal

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| id | String | 是 | 主键 |
| companyId | String | 是 | 公司id |
| companyName | String | 否 | 公司名称 |
| deptId | String | 是 | 部门id |
| deptName | String | 否 | 部门名称 |
| name | String | 是 | 人员名称 |
| code | String | 是 | 人员编码（工号） |
| mobile | String | 否 | 手机号 |
| email | String | 否 | 邮箱 |
| leaderCode | String | 否 | 领导的工号 |
| headImg | String | 否 | 头像 |
| sex | Integer | 否 | 性别1：男；2：女 |
| address | String | 否 | 地址 |
| positionCode | String | 否 | 岗位编码 |
| status | Integer | 否 | 状态（1：在职，0：离职） |
| leaveDate | Date | 否 | 离职时间 |
| fax | String | 否 | 传真 |
| createTime | Date | 否 | 创建时间 |
| creator | String | 否 | 创建人 |
| updateTime | Date | 否 | 修改时间 |
| updator | String | 否 | 修改人 |
| delFlag | Integer | 否 | 上删除标识 |




<h3 id="UGroE">示例</h3>
<h4 id="EvHCX">请求示例</h4>

```json
["001","002"]
```

<h4 id="O7pf5">返回示例</h4>

```json
{
    "code": "100",
    "msg": "OK！",
    "data": [
        {
            "createTime": "2023-02-01 17:14:42",
            "creator": "10000",
            "updateTime": null,
            "updator": null,
            "delFlag": 1,
            "keyword": null,
            "id": "b840f4c95f2f666c0fbad0b41441f17d",
            "code": "001",
            "name": "张鹏",
            "leaderCode": null,
            "leaderName": null,
            "headImg": "",
            "mobile": "17781751135",
            "email": null,
            "deptId": "8c1d7fbd8f9859a383f3b62558b4a002",
            "deptName": "事业部",
            "companyId": "00a086cd9f823d5baa32899814a72c0e",
            "companyName": "智慧工厂",
            "status": 1,
            "leaveDate": null,
            "ddUserid": null,
            "sex": 1,
            "address": null,
            "fax": null,
            "positionCode": "1a0eceeb20dd432ca4dec32ab2537221",
            "positionName": null,
            "jobGradeCode": "9fed2001aafccc0a378c66439cbdeb31",
            "jobGradeName": null,
            "deptCode": null,
            "companyCode": null,
            "roles": null,
            "companyIds": null,
            "deptIds": null
        },
        {
            "createTime": "2023-02-01 17:20:12",
            "creator": "10000",
            "updateTime": null,
            "updator": null,
            "delFlag": 1,
            "keyword": null,
            "id": "745e850513723c4435422dab02bcb035",
            "code": "002",
            "name": "韩登",
            "leaderCode": null,
            "leaderName": null,
            "headImg": "",
            "mobile": "17777777777",
            "email": null,
            "deptId": "8c1d7fbd8f9859a383f3b62558b4a002",
            "deptName": "事业部",
            "companyId": "00a086cd9f823d5baa32899814a72c0e",
            "companyName": "智慧工厂",
            "status": 1,
            "leaveDate": null,
            "ddUserid": null,
            "sex": 1,
            "address": null,
            "fax": null,
            "positionCode": "8584039861e14e7ea040c001dac2871b",
            "positionName": null,
            "jobGradeCode": "da8227a117bc2ba6b59d1b6e70a29cd2",
            "jobGradeName": null,
            "deptCode": null,
            "companyCode": null,
            "roles": null,
            "companyIds": null,
            "deptIds": null
        }
    ],
    "success": true
}
```

<h4 id="xBOYY"></h4>
<h2 id="CIHwl">同步公司数据</h2>

:::info
+ **URL**：/api/flow/org/insertOrUpdateCompanyList
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="MajZ8">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="YLapg">Body参数</h3>
SyncCompanyRequest

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| id | String | 是 | 主键 |
| pid | String | 否 | 父id |
| cname | String | 是 | 公司中文名 |
| shortName | String | 否 | 公司简称 |
| ename | String | 否 | 英文名 |
| code | String | 是 | 公司编码 |
| descr | String | 否 | 公司描述 |
| orderNo | Integer | 否 | 排序号 |
| status | Integer | 否 | 状态 |
| createTime | Date | 否 | 创建时间 |
| creator | String | 否 | 创建人 |
| updateTime | Date | 否 | 修改时间 |
| updator | String | 否 | 修改人 |
| delFlag | Integer | 否 | 上删除标识 |


<h3 id="WeeAI">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | String | 返回数据<br/> |


<h3 id="JznQb">示例</h3>
<h4 id="TRl7v">请求示例(body入参)</h4>

```json
[
  {
    "id":"1",
    "pid":null,
    "cname":"三一重工集团",
    "code":"1000"
	},
  ...
]
```

<h4 id="BdZwO">返回示例</h4>

```json
{
    "code": "101",
    "msg": "同步失败,公司编码1000已存在!",
    "data": null,
    "success": false
}
```



<h2 id="IoV28">同步部门数据</h2>

:::info
+ **URL**：/api/flow/org/insertOrUpdateDeptList
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="KleB5">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="EEkLZ">Body参数</h3>
SyncDepartmentRequest

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| id | String | 是 | 主键 |
| pid | String | 否 | 父id |
| companyId | String | 是 | 公司id |
| name | String | 是 | 部门名称 |
| code | String | 是 | 部门编码 |
| note | String | 否 | 描述 |
| orderNo | Integer | 否 | 排序号 |
| leaderCode | Integer | 否 | 是否父节点 |
| createTime | Date | 否 | 创建时间 |
| creator | String | 否 | 创建人 |
| updateTime | Date | 否 | 修改时间 |
| updator | String | 否 | 修改人 |
| delFlag | Integer | 否 | 上删除标识 |


<h3 id="wNEQV">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | String | 返回数据<br/> |


<h3 id="O8iG7">示例</h3>
<h4 id="B34Fu">请求示例(body入参)</h4>

```json
[
  {
    "id":"1",
    "pid":null,
    "companyId":"1",
    "name":"研发部",
    "code":"1000"
	},
  ...
]
```

<h4 id="YFPQh">返回示例</h4>

```json
{
  "code": "100",
  "msg": "OK",
  "data": "同步成功!"
}
```

<h4 id="KiZKZ"></h4>
<h2 id="hf7RN">同步用户数据</h2>

:::info
+ **URL**：/api/flow/org/insertOrUpdatePersonalList
+ **Method**：`POST`
+ **需要登录**：<font style="background:#DBF1B7;color:#2A4200">是</font>
+ **需要鉴权**：<font style="background:#DBF1B7;color:#2A4200">是</font>

:::

<h3 id="P21i0">Header参数</h3>

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | String | 是 | 临时授权码，[参考](#VEAFZ) |


<h3 id="sUZZe">Body参数</h3>
SyncPersonalRequest

| 名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| id | String | 是 | 主键 |
| companyId | String | 是 | 公司id |
| companyName | String | 否 | 公司名称 |
| deptId | String | 是 | 部门id |
| deptName | String | 否 | 部门名称 |
| name | String | 是 | 人员名称 |
| code | String | 是 | 人员编码（工号） |
| mobile | String | 否 | 手机号 |
| email | String | 否 | 邮箱 |
| leaderCode | String | 否 | 领导的工号 |
| headImg | String | 否 | 头像 |
| sex | Integer | 否 | 性别1：男；2：女 |
| address | String | 否 | 地址 |
| positionCode | String | 否 | 岗位编码 |
| status | Integer | 否 | 状态（1：在职，0：离职） |
| leaveDate | Date | 否 | 离职时间 |
| fax | String | 否 | 传真 |
| createTime | Date | 否 | 创建时间 |
| creator | String | 否 | 创建人 |
| updateTime | Date | 否 | 修改时间 |
| updator | String | 否 | 修改人 |
| delFlag | Integer | 否 | 上删除标识 |


<h3 id="oVGfA">返回参数</h3>

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `success` | boolean | 成功状态：true/false |
| `code` | String | 状态码：100/101 |
| `msg` | String | 提示信息 |
| `data` | String | 返回数据<br/> |


<h3 id="dVP1U">示例</h3>
<h4 id="T1ScC">请求示例(body入参)</h4>

```json
[
  {
    "id":"1",
    "companyId":"1",
    "deptId":"1",
    "name":"研发部",
    "code":"1000"
	},
  ...
]
```

<h4 id="tcMQg">返回示例</h4>

```json
{
  "code": "100",
  "msg": "OK",
  "data": "同步成功!"
}
```
