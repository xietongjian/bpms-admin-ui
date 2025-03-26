import { requestClient } from '#/api/request';

import { listToTree, forEach } from '#/utils/helper/treeHelper';
// import { CheckExistParams } from '@/api/model/baseModel';
import { Base64 } from 'js-base64';

enum Api {
  GetFrameworkList = '/flow/bpm/framework/getFrameworkList',
  SaveOrUpdate = '/flow/bpm/framework/saveOrUpdate',
  GetById = '/flow/bpm/framework/getById',
  Delete = '/flow/bpm/framework/delete',
  CheckEntityExist = '/flow/bpm/framework/checkEntityExist',
  GetAllParentsById = '/flow/bpm/framework/getAllParentsById',

  MoveFramework = '/flow/bpm/framework/updateFrameworkPid',
  DownloadFrameWorkTemplate = '/flow/bpm/framework/download',
  MultiUploadFrameWork = '/flow/bpm/framework/upload',
}

// 下载架构模板
export const downloadFrameWorkTemplate = async () => {
  return requestClient.post<any>(Api.DownloadFrameWorkTemplate, {},
    { responseType: 'blob', responseReturn: 'body' },
  );
};

// 批量导入架构
export const multiUploadFrameWork = async (id: string, data: any) => {
  return requestClient.uploadFile<any>(Api.MultiUploadFrameWork + '/' + id, data);
};

// 拖拽移动架构
export const moveFramework = (params: { id: string; pid: string }) => {
  const url = `${Api.MoveFramework}/${params.id}/${params.pid}`;
  return requestClient.post<boolean>(url, {},
      {successMessageMode: 'message'});
}

export const getFrameworkList = (params: any) => {
  const result = requestClient.post<any>(Api.GetFrameworkList, params);
  return Promise.resolve(result).then((res: any) => {
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'pid' });
    forEach(
      treeData,
      (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'id', children: 'children', pid: 'pid' },
    );
    return treeData;
  });
};
export const saveOrUpdate = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.diagramsInfoXml = Base64.encode(params.diagramsInfoXml);
  return requestClient.post<any>(Api.SaveOrUpdate, params, { responseReturn: 'body' });
};

export const deleteByIds = (params?: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, { responseReturn: 'body' });

export const getById = (params: any) => requestClient.get<any>(Api.GetById + '/' + params.id);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const getAllParentsById = (params: any) =>
  requestClient.get<any>(Api.GetAllParentsById + '/' + params.frameworkId);
