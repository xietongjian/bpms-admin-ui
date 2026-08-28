# BPMS 项目迁移记忆

## 项目信息
- **新项目**: `d:\workspace\xtj\bpms-admin-ui` (vben5, apps/web-antd)
- **老项目**: `D:\workspace\xtj\prodflow-admin-ui` (vben2)
- **迁移策略**: 从老项目拷贝缺失模块，按 vben5 模式重写

## vben5 实现模式

### 单列表页面 (参考 `views/base/app/index.vue`)
- 使用 `useVbenVxeGrid` 替代 `useTable`
- 使用 `VbenTableAction` / `TableAction` 处理操作列
- 使用 `Page` / `ColPage` 包裹
- Modal 使用 `ref()` 模式: `modalRef.setData()`, `modalRef.open()`, `modalRef.setState()`
- API 返回 `{success, msg}` 格式
- 权限使用 `v-access:code="PerPrefix + PerEnum.XXX"`
- 搜索表单通过 `formOptions.schema` 配置

### 左右布局页面 (参考 `views/flowable/bpmn/modelInfo/index.vue`)
- 使用 `ColPage` 组件
- 左侧树组件 + 右侧表格
- FlowCategoryTree: `#/views/components/leftTree/FlowCategoryTree.vue`
- OrgTree: `#/views/components/leftTree/OrgTree.vue`

### Modal 组件模式
- `useVbenModal` 返回 `[BasicModal, modalApi]`
- `defineExpose(modalApi)` 暴露 API
- `modalApi.getData<T>()` 获取传入数据
- 父组件通过 `ref.setData()`, `ref.open()`, `ref.setState()` 控制

### 导入路径约定
- `#/adapter/vxe-table` - 表格相关
- `#/adapter/form` - 表单相关 (zod验证)
- `@vben/common-ui` - 通用 UI 组件
- `#/enums/perEnum` - 权限枚举
- `#/enums/commonEnum` - 通用枚举
- `#/api/` - API 层
- `#/components/` - 公共组件
- `#/views/components/` - 视图组件

## 已完成迁移模块 (2026-08-06)

### API 层
- `api/base/fileManager.ts` - 文件管理 API
- `api/base/motivateInfo.ts` - 激励信息 API
- `api/base/calendarManage/` - 日历管理 API (3个文件)
- `api/flowoperation/serviceErrorLog.ts` - 服务错误日志 API
- `api/portal/cms/notice.ts` - 公告 API (新增 getFrontNoticePagerList)
- `api/flow/deptEfficiency.ts` - 部门效率报表 API (6个图表接口)
- `api/front/account.ts` - 前端账号管理 API

### 视图层
- `views/base/bizLibrary/` - 业务库管理 (单列表)
- `views/base/fileManager/` - 文件管理 (单列表 + 批量删除)
- `views/base/motivateInfo/` - 激励信息管理 (单列表)
- `views/base/calendarManage/type/` - 日历类型管理 (单列表)
- `views/base/calendarManage/assign/` - 日历分配 (左右布局 + OrgTree)
- `views/flowoperation/serviceErrorLogInfo/` - 服务错误日志 (单列表)
- `views/portal/front/notice/` - 前端公告列表 (单列表 + 预览Modal)
- `views/portal/front/news/` - 前端新闻列表 (单列表 + 预览Modal)
- `views/dashboard/workbench/components/NewsPreviewModal.vue` - 新闻预览 Modal (vben5)
- `views/flow/externalSystem/` - 外部系统管理 (标准CRUD)
- `views/flow/externalDatabase/` - 外部数据库管理 (标准CRUD)
- `views/flow/externalAi/externalAiType/` - AI节点类型 (标准CRUD)
- `views/flow/externalAi/externalAiNode/` - AI节点管理 (标准CRUD)
- `views/flow/externalAi/externalAiDesc/` - AI节点描述 (左右布局+FlowNodeTree)
- `views/flow/externalApi/` - 外部接口管理 (标准CRUD)
- `views/base/calendarManage/maintain/` - 日历维护 (左右布局+ColPage)
- `views/flowsetting/extend/` - 扩展设置 (活动标记配置)
- `views/base/apiDoc/manage/` - 接口文档管理
- `views/base/apiDoc/preview/` - 接口文档预览
- `views/portal/cms/notice/NoticeInput.vue` - 公告编辑页
- `views/portal/cms/news/NewsInput.vue` - 新闻编辑页
- `views/flowoperation/formDefinition/` - 表单定义
- `views/process/report/efficiency/` - 流程效率报表
- `views/report/formReportDesigner/` - 表单报表设计
- `views/process/report/deptEfficiency/` - 部门效率报表 (ECharts仪表盘 + 6个图表组件)
- `views/process/report/shared/reportTheme.ts` - 图表主题适配(暗色/亮色)
- `views/front/account/` - 前端账号管理 (CRUD + 设置密码Modal)

## 路径映射 (menu.ts COMPONENT_PATH_MAP)
- `/bpm/institutionClassification/index.vue` → `/institution/institutionClassification/index.vue`
- `/bpm/institutionManagement/index.vue` → `/institution/institutionManagement/index.vue`

### 视图层 (续)
- `views/demo/coding/` - 代码生成工具 (vxe-grid可编辑表格 + useVbenForm + 代码模板生成)
  - 代码生成器仍输出vben2风格模板（作为demo工具保留原样）

### 不需要迁移的模块
- `flowoperation/formDefinition/` - 已由 `form/custom/` 和 `form/biz/` 覆盖

## 合并记录 (2026-08-07)
- 从 vben-origin/main (vben5 最新源码) 合并到 main-bpms-admin-ui
- 合并 commit: `7c1d54212` (Merge main into main-bpms-admin-ui)
- 修复 commit: `56c6d3119` (补充 54 个 BPMS catalog 条目)
- 注意事项: 合并后 pnpm-workspace.yaml 需保留所有 BPMS 特有 catalog 条目 (bpmn-js, codemirror, diagram-js 等)，main 分支不包含这些

### Type-only import 报错
- 问题: `does not provide an export named 'XXX'` 当 `aclModel.ts` 使用 `export type`
- 原因: Vite 运行时 type-only export 被擦除，普通 `import {}` 无法找到
- 修复: 使用 `import type {}` 导入纯类型

### HTML title 显示模板变量
- 问题: `<%= VITE_APP_TITLE %>` 原样显示
- 原因: `viteHtmlPlugin` 只做 minify，不处理 EJS 模板替换
- 修复: `html.ts` 增加 `transformIndexHtml` pre-hook，用 `loadEnv` 替换 `<%= VAR %>`
- 改造: `html.ts` 拆为 `viteHtmlPlugin`(模板变量替换) + `viteMinifyPlugin`(构建压缩)
