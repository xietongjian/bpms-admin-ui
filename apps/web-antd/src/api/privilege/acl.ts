import { requestClient } from '#/api/request';

import { forEach, listToTree } from '#/utils/helper/treeHelper';
import type {
  AclInfo,
  AclSaveByGroupModuleParam,
  AclSaveByModuleParam,
} from './model/aclModel';
import type { ModuleInfo, ModuleParams } from './model/moduleModel';

enum Api {
  SetAcl = '/flow/privilege/acl/setAcl',
  GetModuleAclsByGroupId = '/flow/privilege/acl/getModuleAclsByGroupId',
  SetAllAcl = '/flow/privilege/acl/setAllAcl',
  SetAclModuleList = '/flow/privilege/acl/setAclModuleList',
  SetAclByModule = '/flow/privilege/acl/setAclByModule',
}

export const getModuleAclsByGroupId = (params: any) => {
  return requestClient.get<any>(Api.GetModuleAclsByGroupId + '/' + params.groupId).then((res: any) => {
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

export const setAcl = (params: AclSaveByModuleParam) =>
  requestClient.post<any>(Api.SetAcl + '/' + params.position + '/' + params.checked, params.aclInfo);

export const setAllAcl = (params: AclSaveByModuleParam) =>
  requestClient.post<any>(Api.SetAllAcl + `/${params.checked}`, params.aclInfo);

export const setAclByModule = (params: AclSaveByModuleParam) =>
  requestClient.post<any>(Api.SetAclByModule + '/' + params.checked, params.aclInfo);

export const setAclModuleList = (params: AclSaveByGroupModuleParam) =>
  requestClient.post<any>(Api.SetAclModuleList + `/${params.moduleId}/${params.groupId}`, params.aclList);
