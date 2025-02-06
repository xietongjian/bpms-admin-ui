import { requestClient } from '#/api/request';
import { Base64 } from 'js-base64';

enum Api {
  GetDmnPagerModel = '/flow/dmnDesigner/prod/api/getDmnPagerModel',
  PublishDmn = '/flow/dmnDesigner/prod/api/publishDmn',
  StopDmn = '/flow/dmnDesigner/prod/api/stopDmn',
  Delete = '/flow/flowable/dmn/deleteByIds',
  CheckEntityExist = '/flow/dmnDesigner/prod/api/checkEntityExist',
  SaveOrUpdate = '/flow/dmnDesigner/prod/api/saveModelInfo',
  SaveDmnModel = '/flow/dmnDesigner/prod/api/saveDmnModel',
  GetByModelId = '/flow/dmnDesigner/prod/api/getDmnInfo',
  GetDmnSimulatorInputParamsByModelKey = '/flow/dmn/getInputParamsByModelKey',
  CalcDmnSimulatorOutput = '/flow/dmn/simulateExecuteDecision',
}

export const getDmnPagerModel = (params: any) => {
  return requestClient.post<any>(Api.GetDmnPagerModel, params);
};

export const publishDmn = (params: any) =>
  requestClient.post(Api.PublishDmn + '/' + params, { }, { responseReturn: 'body' });

export const stopDmn = (params: any) =>
  requestClient.post(Api.StopDmn + '/' + params , {}, { responseReturn: 'body' });

export const deleteByIds = (params?: Array<string>) => requestClient.post(Api.Delete, params, {responseReturn: 'body'});

export const saveOrUpdate = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.modelXml = Base64.encode(params.modelXml);
  return requestClient.post(Api.SaveOrUpdate, params, { responseReturn: 'body' });
};


export const saveDmnModel = (params: any) =>
  requestClient.post(Api.SaveDmnModel, params, { responseReturn: 'body' });

export const getByModelId = (params: any) =>
  requestClient.get(Api.GetByModelId + '/' + params.modelId);

export const getDmnSimulatorInputParamsByModelKey = (params: any) => {
  return requestClient
    .get(Api.GetDmnSimulatorInputParamsByModelKey + '/' + params.modelKey)
    .then((res) => {
      const result = [] as Array<any>;
      if (res) {
        res.forEach((item) => {
          if (item && item.variable) {
            result.push({
              ...item,
              fieldName: item.variable,
              fieldLabel: item.label,
            });
          }
        });
      }
      return Promise.resolve(result);
    });
};

export const calcDmnSimulatorOutput = (params: any) => {
  return requestClient.post( Api.CalcDmnSimulatorOutput, params);
};

export const singleDecisionXml = (params) => `<?xml version="1.0" encoding="UTF-8"?>
<definitions
        xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/"
        xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/"
        xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/"
        id="dish_${params.key || 'TEMP___KEY'}" name="${params.name || 'TEMP___NAME'}"
        namespace="http://camunda.org/schema/1.0/dmn"
        exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="11.0.2">
    <decision id="${params.key || 'TEMP___KEY'}" name="${params.name || 'TEMP___NAME'}">
        <decisionTable id="DecisionTable_${params.key || 'TEMP___KEY'}">
            <input id="InputClause_1hmm6z2">
                <inputExpression id="LiteralExpression_0eaabht" typeRef="string"/>
            </input>
            <output id="OutputClause_1ua72fu" typeRef="string"/>
        </decisionTable>
    </decision>
</definitions>
`;

export const decisionServiceXml = (params) => `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" id="dish_${params.key || 'TEMP___KEY'}" name="${params.name || 'TEMP___NAME'}" namespace="http://camunda.org/schema/1.0/dmn" exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="11.0.2">
  <decisionService id="${params.key || 'TEMP___KEY'}" name="${params.name || 'TEMP___NAME'}" />
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="DMNDiagram_1buk29a" />
  </dmndi:DMNDI>
</definitions>`;

/**
 * 初始化决策表
 * @param params
 * @returns {string}
 */
export const initDmnDiagram = async (params) => {
  const result = { success: true, code: '100', data: {} };
  const modelXml = params.dmnType == 0 ? singleDecisionXml(params) : decisionServiceXml(params);
  result.data = { modelXml: modelXml };
  return Promise.resolve(result);
};

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
