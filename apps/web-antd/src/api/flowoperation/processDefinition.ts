import { requestClient } from '#/api/request';

enum Api {
  FindHisProcessDefinitionPagerModel = '/flow/flowoperation/processdefinition/findHisProcessDefinitionPagerModel',
  ActivateProcessDefinition = '/flow/flowoperation/processdefinition/activateProcessDefinition',
  SuspendProcessDefinition = '/flow/flowoperation/processdefinition/suspendProcessDefinition',
  LoadXmlByProcessDefinitionId = '/flow/flowoperation/processdefinition/loadXmlByProcessDefinitionId',
  // /flow/flowoperation/processdefinition/suspendProcessDefinition/{id}
}

/**
 * 查询分页
 * @param params
 */
export const findHisProcessDefinitionPagerModel = (params: any) => {
  return requestClient.post<any>(Api.FindHisProcessDefinitionPagerModel, params);
};

/**
 * 激活流程定义
 * @param params
 */
export const activateProcessDefinition = (params: any) =>
  requestClient.post<any>(
    Api.ActivateProcessDefinition + '/' + params.id, {},
    { responseReturn: 'body' },
  );

/**
 * 挂起流程定义
 * @param params
 */
export const suspendProcessDefinition = (params: any) =>
  requestClient.post<any>(Api.SuspendProcessDefinition + '/' + params.id, {},
    { responseReturn: 'body' },
  );

/**
 * 加载xml
 * @param params
 */
export const loadXmlByProcessDefinitionId = (params: any) =>
  requestClient.post<any>(Api.LoadXmlByProcessDefinitionId + '/' + params.processDefinitionId, {});
