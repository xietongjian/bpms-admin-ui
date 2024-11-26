# 系统集成 - SDK文档
<h1 id="HeSow"><font style="color:rgb(56, 56, 56);">Java SDK集成指南</font></h1>
<font style="color:rgb(56, 56, 56);">Java SDK提供了流程引擎API的请求封装、响应解释等功能，您可以直接使用SDK实现流程引擎的相关接口直接调用。</font>

<font style="color:rgb(56, 56, 56);">我们提供了Java SDK示例，可方便用户低成本集成到项目中，快速实现相关业务接口对接，实现敏捷迭代开发。</font>

<h2 id="w8zlw"><font style="color:rgb(56, 56, 56);">环境依赖</font></h2>
<font style="color:rgb(56, 56, 56);">JDK版本：1.8及以上</font>

<font style="color:rgb(56, 56, 56);">SDK文件说明：prodflow-openapi-sdk-springcloud</font>

<font style="color:rgb(55, 60, 67);">增加配置：</font>

```yaml
dragon-flow:
  api:
    app-sn: flow
    app-secret-key: Fu9E9N9m19b52@H9A6YWa0**********nO9du1SP9m71X7bk@0551hVGG!K7
    service-id: flow-center
    enable-verify: true
```

如何申请appSn和appSecretKey，如下图所示：

![image](/docs/integration/sdk/imgs/应用配置新增.png)

<h2 id="VWzjK"><font style="color:rgb(56, 56, 56);">集成方法：</font></h2>
<font style="color:rgb(56, 56, 56);">方法1：直接将SDK的中jar文件引入到项目的Classpath下。</font>

<font style="color:rgb(56, 56, 56);">方法2：Maven构建</font>

<font style="color:rgb(56, 56, 56);">将</font>prodflow-openapi-sdk<font style="color:rgb(56, 56, 56);">.jar移动到您的Maven中央仓库目录中：  
</font><font style="color:rgb(56, 56, 56);">添加以下依赖到您的项目pom文件中：rest的sdk 和springcloud的sdk</font>

```xml
<dependency>
  <groupId>com.dragon</groupId>
  <artifactId>prodflow-openapi-sdk-rest</artifactId>
  <version>最新版本</version>
</dependency>
```

```xml
<dependency>
  <groupId>com.dragon</groupId>
  <artifactId>prodflow-openapi-sdk-springcloud</artifactId>
  <version>最新版本</version>
</dependency>
```


<h2 id="qCO5r"><font style="color:rgb(56, 56, 56);">调用方法：</font></h2>
<h4 id="Cf6OL">一：基础数据相关</h4>


<font style="color:rgb(56, 56, 56);">通过注解方式直接调用</font>

<font style="color:rgb(56, 56, 56);">初始化：</font>

```java
@Autowired
private FlowOpenApiClient client;
```

##### 1:获取分类列表
```java
/**
 * 获取所有分类
 *
 * @return
 */
@Test
public void testGetCategories() {
    CategoryRequest request = new CategoryRequest();
    ReturnResponse<List<CategoryResponse>> categories = client.baseData().getCategories(request);
    for (Object response : categories.getData()) {
        System.out.println(response.toString());
    }
}
```



##### 2:获取应用列表
```java
/**
 * 获取应用列表
 *
 * @return
 */
@Test
public void testGetApps() {
    ReturnResponse<List<AppResponse>> categories = client.baseData().getApps();
    for (Object response : categories.getData()) {
        System.out.println(response.toString());
    }
}
```

##### 3:获取字典列表
```java
/**
 * 获取所有的应用列表
 *
 * @return
 */
@Test
public void testGetApps() {
    ReturnResponse<List<AppResponse>> categories = client.baseData().getApps();
    for (Object response : categories.getData()) {
        System.out.println(response.toString());
    }
}
```

##### 4:获取字典值列表
```java
/**
 * 获取字典值列表
 *
 * @return
 */
@Test
public void testGetDictionaryItems() {
    DicItemRequest request = new DicItemRequest();
    //字典主表id
    request.setMainId("b21108cfbf9e88a1b6b3566395cbb232");
    ReturnResponse<List<DicItemResponse>> categories = client.baseData().getDictionaryItems(request);
    for (Object response : categories.getData()) {
        System.out.println(response.toString());
    }
}
```

<h4 id="dcXA2">二：表单操作相关</h4>

##### 1:获取自定义表单数据
```java
/**
 * 获取自定义表单数据
 */
@Test
public void testGetCustomFormInfoVoByModelKeyAndBusinessKey() {
    GetCustomFormInfoRequest request = new GetCustomFormInfoRequest();
    String modelKey = "cshr_00062";
    request.setModelKey(modelKey);
    String procInstId = "9216a88da6f511eda128a864f1302d85";
    request.setProcInstId(procInstId);
    String businessKey = "cshr_00062_3";
    request.setBusinessKey(businessKey);
    ReturnResponse<CustomFormInfoResponse> customFormInfoResponse = client.form().getCustomFormInfoVoByModelKeyAndBusinessKey(request);
    System.out.println(JSON.toJSON(customFormInfoResponse));
}
```

##### 2:启动业务流程
```java
/**
 * 启动业务流程/重新发起流程
 */
@Test
public void testStartBizFormProcess() {
    StartBizFormRequest params = new StartBizFormRequest();
    params.setBusinessKey("cshr_00062_69");
    params.setAppSn("businessFlow");
    params.setProcessDefinitionKey("testaaaab");
    params.setFormName("自定义表单");
    ReturnResponse<String> result = client.form().startBizFormProcess(params);
    System.out.println(result);
}
```

##### 3:启动自定义表单
```java
/**
 * 启动自定义表单
 */
@Test
public void testStartCustomFormProcess() {
    StartCustomFormRequest params = new StartCustomFormRequest();
    params.setModelKey("cshr_00062");
    params.setUserCode("10000");
    ReturnResponse<CustomFormOperationResponse> customFormOperationResponse = client.form().startCustomFormProcess(params);
    System.out.println(JSON.toJSON(customFormOperationResponse));
}
```

##### 4:修改流程表单数据
```java
/**
 * 修改流程表单数据
 */
@Test
public void testUpdateCustomFormData() {
    StartFormProcessRequest params = new StartFormProcessRequest();
    params.setModelKey("cshr_00062");
    params.setUserCode("10000");
    params.setDataJson("流程表单json数据");
    ReturnResponse<String> result = client.form().updateCustomFormData(params);
    System.out.println(result);
}
```

<h4 id="HY19I">三：流程操作相关</h4>

##### 1:委派任务
```java
 /**
 * 委派任务
 */
@Test
public void testDelegateTask() {
    DelegateTaskRequest delegateTaskRequest = new DelegateTaskRequest();
    delegateTaskRequest.setDelegateUserCode("10001");//委派人
    delegateTaskRequest.setUserCode("10000");
    delegateTaskRequest.setTaskId("c9765db6b28711edb41a766c80182d43");
    ReturnResponse<String> result = client.flowOperate().delegateTask(delegateTaskRequest);
    System.out.println(result);
}
```

##### 2:签收任务
```java
/**
 * 签收任务
 */
@Test
public void testClaimTask() {
    ClaimTaskRequest claimTaskRequest = new ClaimTaskRequest();
    claimTaskRequest.setUserCode("10001");
    claimTaskRequest.setTaskId("c9765db6b28711edb41a766c80182d43");
    ReturnResponse<String> result = client.flowOperate().claimTask(claimTaskRequest);
    System.out.println(result);
}
```

##### 3:反签收任务
```java
/**
 * 反签收任务
 */
@Test
public void testUnClaimTask() {
    ClaimTaskRequest claimTaskRequest = new ClaimTaskRequest();
    claimTaskRequest.setUserCode("10003");
    claimTaskRequest.setTaskId("c9765db6b28711edb41a766c80182d43");
    ReturnResponse<String> result = client.flowOperate().unClaimTask(claimTaskRequest);
    System.out.println(result);
}
```

##### 4:终止流程
```java
/**
 * 终止流程
 */
@Test
public void testStopProcess() {
    EndRequest endRequest = new EndRequest();
    endRequest.setUserCode("10000");
    endRequest.setTaskId("c9765db6b28711edb41a766c80182d43");
    ReturnResponse<String> result = client.flowOperate().stopProcess(endRequest);
    System.out.println(result);
}
```

##### 5:转办任务
```java
/**
 * 转办任务
 */
@Test
public void testTurnTask() {
    TurnTaskRequest request = new TurnTaskRequest();
    request.setTurnUserId("10000");
    request.setTurnToUserId("10002");
    request.setTaskId("dba411ffb83a11edb64ea864f1302d85");
    ReturnResponse<String> result = client.flowOperate().turnTask(request);
    System.out.println(result);
}
```

##### 6:驳回任务
```java
/**
 * 驳回任务
 */
@Test
public void testBackToStep() {
    BackRequest request = new BackRequest();
    request.setDistFlowElementId("startEvent1");
    request.setUserCode("10000");
    request.setTaskId("2a3f078cb83311edac0ba864f1302d85");
    request.setProcessInstanceId("823c0b13a6f311edbfbaa864f1302d85");
    ReturnResponse<String> result = client.flowOperate().backToStep(request);
    System.out.println(result);
}
```

##### 7:驳回到发起人
```java
/**
 * 驳回到发起人
 */
@Test
public void testBckToSubmitter() {
    BackToSubmitterRequest request = new BackToSubmitterRequest();
    request.setUserCode("10000");
    request.setProcessInstanceId("c49cdc31b05b11ed9ea1766c80182d43");
    request.setTaskId("c4b08a52b05b11ed9ea1766c80182d43");
    ReturnResponse<String> result = client.flowOperate().backToSubmitter(request);
    System.out.println(result);
}
```

##### 8:前加签
```java
/**
 * 前加签
 */
@Test
public void testBeforeAddSign() {
    SignRequest request = new SignRequest();
    request.setUserCode("10000");
    request.setSignPersonals(Arrays.asList("10001"));
    request.setTaskId("4440608faed511edb39b766c80182d43");
    ReturnResponse<String> result = client.flowOperate().beforeAddSign(request);
    System.out.println(result);
}
```

##### 9:后加签
```java
/**
 * 后加签
 */
@Test
public void testAfterAddSign() {
    SignRequest request = new SignRequest();
    request.setUserCode("10004");
    request.setSignPersonals(Arrays.asList("10001"));
    request.setTaskId("4440608faed511edb39b766c80182d43");
    ReturnResponse<String> result = client.flowOperate().afterAddSign(request);
    System.out.println(result);
}
```

##### 10:暂存
```java
/**
 * 暂存
 */
@Test
public void testHoldtask() {
    HoldTaskRequest request = new HoldTaskRequest();
    request.setUserCode("10004");
    request.setProcessStatusEnum(ProcessStatusEnum.ZC);
    request.setTaskId("4440608faed511edb39b766c80182d43");
    request.setMessage("暂存一下");
    request.setProcessInstanceId("443060rf5ed511edb39b766c80182d41");
    request.setCommentTypeEnum(CommentTypeEnum.ZC);
    ReturnResponse<String> result = client.flowOperate().holdtask(request);
    System.out.println(result);
}
```

##### 11:审批流程
```java
/**
 * 审批流程
 */
@Test
public void testComplete() {
    CompleteTaskRequest completeTaskRequest = new CompleteTaskRequest();
    completeTaskRequest.setUserCode("10001");
    completeTaskRequest.setTaskId("3a03bb72b10111ed9a15766c80182d43");
    ReturnResponse<String> result = client.flowOperate().complete(completeTaskRequest);
    System.out.println(result);
}
```

<h4 id="HmIX3">四：流程查询相关</h4>

##### 1:通过流程实例id获取头部信息
```java
/**
 * 通过流程实例id获取头部信息
 */
@Test
public void testGetStartHeadInfoVoByProcessInstanceId() {
    String proceId = "9eb3dd76b73911edbeb936e660a2d0eb";
    ReturnResponse<StartHeadInfoResponse> responseReturnVo = client.flowQuery().getStartHeadInfoVoByProcessInstanceId(proceId);
    System.out.println(responseReturnVo.getData());
}
```

##### 2:分页查询我发起的流程列表
```java
/**
 * 分页查询我发起的流程列表
 */
@Test
public void testFindMyProcessinstancesPagerModel() {
    ParamRequest<InstanceQueryRequest> params = new ParamRequest<>();
    InstanceQueryRequest request = new InstanceQueryRequest();
    request.setUserCode("10000");
    params.setEntity(request);
    params.setQuery(new Query());
    ReturnResponse<PagerModel<ProcessInstanceResponse>> returnVo = client.flowQuery().findMyProcessinstancesPagerModel(params);
    System.out.println(returnVo);
}
```

##### 3:查询待办任务总记录数
```java
 /**
 * 查询待办任务总记录数
 */
@Test
public void testGetAppingTaskCount() {
    TaskQueryRequest request = new TaskQueryRequest();
    request.setUserCode("10000");
    ReturnResponse<Long> appingTaskCount = client.flowQuery().getAppingTaskCount(request);
    System.out.println(appingTaskCount.getData());
}
```

##### 4:分页查询待办任务列表
```java
/**
 * 分页查询待办任务列表
 */
@Test
public void testGetAppingTasksPagerModel() {
    ParamRequest<TaskQueryRequest> params = new ParamRequest<>();
    TaskQueryRequest request = new TaskQueryRequest();
    request.setUserCode("10000");
    params.setEntity(request);
    params.setQuery(new Query());
    ReturnResponse<PagerModel<TaskResponse>> taskResponseList = client.flowQuery().getAppingTasksPagerModel(params);
    System.out.println(taskResponseList.getData());
}
```

##### 5:查询已办任务列表
```java
/**
 * 查询已办任务列表
 */
@Test
public void testGetApplyedTasksPagerModel() {
    ParamRequest<TaskQueryRequest> params = new ParamRequest<>();
    TaskQueryRequest request = new TaskQueryRequest();
    request.setUserCode("10000");
    params.setEntity(request);
    params.setQuery(new Query());
    ReturnResponse<PagerModel<TaskResponse>> taskResponseList = client.flowQuery().getApplyedTasksPagerModel(params);
    System.out.println(taskResponseList.getData());
}
```

##### 6:查询可驳回节点列表
```java
/**
 * 查询可驳回节点列表
 */
@Test
public void testFindBackNodesByTaskId() {
    String taskId = "c28c7fdbb26211ed8b842c8db159cacd";
    ReturnResponse<List<FlowNodeResponse>> flowNodeResponse = client.flowQuery().findBackNodesByTaskId(taskId);
    System.out.println(flowNodeResponse.getData());
}
```

##### 7:通过流程实例id获取业务表单数据
```java
/**
 * 通过流程实例id获取业务表单数据
 */
@Test
public void testGetBizDataInfoByProcessInstanceId() {
    String processInstanceId = "5af0a5ebbd7f11ed801336e660a2d0eb";
    ReturnResponse<ExtendHisprocinstResponse> bizDataInfoResponse = client.flowQuery().getBizDataInfoByProcessInstanceId(processInstanceId);
    System.out.println(bizDataInfoResponse.getData());
}
```

##### 8:通过modelkey获取模型对象
```java
/**
 * 通过modelkey获取模型对象
 */
@Test
public void testLoadBpmnXmlByModelKey() {
    String modelKey = "ht_00114";
    ReturnResponse<ModelInfoResponse> modelInfoResponse = client.flowQuery().loadBpmnXmlByModelKey(modelKey);
    System.out.println(modelInfoResponse.getData());
}
```

##### 9:通过流程实例id获取审批意见列表
```java
 /**
 * 通过流程实例id获取审批意见列表
 */
@Test
public void testGetCommentInfosByProcessInstanceId() {
    String processInstanceId = "43d564ac91c011eda93236e660a2d0eb";
    ReturnResponse<List<CommentInfoResponse>> commentInfoResponseList = client.flowQuery().getCommentInfosByProcessInstanceId(processInstanceId);
    System.out.println(JSON.toJSONString(commentInfoResponseList));
}
```

##### 10:分页查询流程模板列表
```java
/**
 * 分页查询流程模板列表
 */
@Test
public void testGetPagerModelModelInfo() {
    ParamRequest<ModelInfoRequest> params = new ParamRequest<>();
    ModelInfoRequest request = new ModelInfoRequest();
    params.setEntity(request);
    params.setQuery(new Query());
    ReturnResponse<PagerModel<ModelInfoResponse>> modelInfoResponsePage = client.flowQuery().getPagerModelModelInfo(params);
    System.out.println(JSON.toJSONString(modelInfoResponsePage));
}
```

##### 11:获取高亮线和节点
```java
/**
 * 获取高亮线和节点
 */
@Test
public void testGetHighLightedNodeVoByProcessInstanceId() {
    String processInstanceId = "43d564ac91c011eda93236e660a2d0eb";
    ReturnResponse<HighLightedNodeResponse> highLightedNodeResponse = client.flowQuery().getHighLightedNodeVoByProcessInstanceId(processInstanceId);
    System.out.println(JSON.toJSONString(highLightedNodeResponse));
}
```

##### 12:分页获取关联流程
```java
/**
 * 分页获取关联流程
 */
@Test
public void testGetPagerModelRelateFlow() {
    ParamRequest<RelateFlowRequest> params = new ParamRequest<>();
    RelateFlowRequest request = new RelateFlowRequest();
    request.setUserCode("10000");
    params.setEntity(request);
    params.setQuery(new Query());
    ReturnResponse<PagerModel<RelateFlowResponse>> relateFlowResponsePage = client.flowQuery().getPagerModelRelateFlow(params);
    System.out.println(JSON.toJSONString(relateFlowResponsePage));
}
```

##### 13:模拟自定义流程高亮线接口
```java
/**
 * 模拟自定义流程高亮线接口
 */
@Test
public void testGetCustomFlowSequenceFlows() {
    StartFormProcessRequest request = new StartFormProcessRequest();
    request.setModelKey("ht_00114");
    request.setUserCode("10000");
    ReturnResponse<List<String>> relateFlowResponsePage = client.flowQuery().getCustomFlowSequenceFlows(request);
    System.out.println(JSON.toJSONString(relateFlowResponsePage));
}
```

##### 14:查询当前待办人列表
```java
/**
 * 查询当前待办人列表
 */
@Test
public void testGetCurrTaskApplyersByBusinessKey() {
    ReturnResponse<List<PersonalResponse>> relateFlowResponsePage = client.flowQuery().getCurrTaskApplyersByBusinessKey("cwej_00093_9");
    System.out.println(JSON.toJSONString(relateFlowResponsePage));
}
```

<h4 id="NzR4Z">五：组织操作相关</h4>

##### 1:获取组织列表
```java
/**
 * 获取组织列表
 */
@Test
public void testGetOrgTree() {
    ReturnResponse<List<OrgTreeResponse>> orgTreeResponseList = client.org().getOrgTree();
    System.out.println(JSON.toJSON(orgTreeResponseList.getData()));
}
```

##### 2:获取公司树
```java
 /**
 * 获取公司树
 */
@Test
public void testGetCompanyTree() {
    ReturnResponse<List<OrgTreeResponse>> orgTreeResponseList = client.org().getCompanyTree();
    System.out.println(JSON.toJSON(orgTreeResponseList.getData()));
}
```

##### 3:获取人员选择器列表
```java
/**
 * 获取人员选择器列表
 */
@Test
public void testGetPagePersonal() {
    ParamRequest<PersonalRequest> params = new ParamRequest<>();
    PersonalRequest request = new PersonalRequest();
    params.setEntity(request);
    params.setQuery(new Query());
    ReturnResponse<PagerModel<PersonalResponse>> personalResponsePage = client.org().getPagePersonal(params);
    System.out.println(JSON.toJSON(personalResponsePage.getData()));
}
```

##### 4:通过工号获取人员信息
```java
/**
 * 通过工号获取人员信息
 */
@Test
public void testGetPersonalByCode() {
    String code = "10000";//工号
    ReturnResponse<PersonalResponse> personalResponse = client.org().getPersonalByCode(code);
    System.out.println(JSON.toJSON(personalResponse));
}
```

##### 5:同步公司数据
```java
/**
 * 同步公司数据
 */
@Test
public void testSyncCompany() {
    List<SyncCompanyRequest> companyList = new ArrayList<>();
    SyncCompanyRequest syncCompanyRequest = new SyncCompanyRequest();
    syncCompanyRequest.setCname("山东蓝翔科技");
    syncCompanyRequest.setCode("12345");
    SyncCompanyRequest syncCompanyRequestTow = new SyncCompanyRequest();
    syncCompanyRequestTow.setCname("山东蓝翔科技2");
    syncCompanyRequestTow.setCode("12346");
    companyList.add(syncCompanyRequest);
    companyList.add(syncCompanyRequestTow);
    ReturnResponse<String> personalResponse = client.org().syncCompany(companyList);
    System.out.println(JSON.toJSON(personalResponse));
}
```

##### 6:同步部门数据
```java
/**
 * 同步部门数据
 */
@Test
public void testSyncDepartment() {
    List<SyncDepartmentRequest> personalList = new ArrayList<>();
    SyncDepartmentRequest syncDepartmentRequest = new SyncDepartmentRequest();
    syncDepartmentRequest.setCompanyId("1");
    syncDepartmentRequest.setName("研发部");
    syncDepartmentRequest.setCode("20002");
    personalList.add(syncDepartmentRequest);
    ReturnResponse<String> personalResponse = client.org().syncDepartment(personalList);
    System.out.println(JSON.toJSON(personalResponse));
}
```

##### 7:同步用户数据
```java
/**
 * 同步用户数据
 */
@Test
public void testSyncPersonal() {
    List<SyncPersonalRequest> personalList = new ArrayList<>();
    SyncPersonalRequest syncPersonalRequest = new SyncPersonalRequest();
    syncPersonalRequest.setCompanyId("1");
    syncPersonalRequest.setCode("100001");
    syncPersonalRequest.setName("刘德华");
    personalList.add(syncPersonalRequest);
    ReturnResponse<String> personalResponse = client.org().syncPersonal(personalList);
    System.out.println(JSON.toJSON(personalResponse));
}
```



<h2 id="JEqAB"><font style="color:rgb(56, 56, 56);">调用流程：</font></h2>

![image](/docs/integration/sdk/imgs/调用流程.png)
