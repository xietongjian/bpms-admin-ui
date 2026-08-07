import { requestClient } from '#/api/request';

enum Api {
  AddGroupApps = '/flow/privilege/groupApp/addGroupApps',
  GetApps = '/flow/privilege/groupApp/getApps',
}

export const getApps = () => {
  return requestClient.get(Api.GetApps)
};

export const addGroupApps = (params: any) => {
  return requestClient.post(Api.AddGroupApps, params)
};
