import {defHttp} from '@/utils/http/axios';

enum Api {
  GetAppliedRange = '/flow/form/modelInfo/getAppliedRange',
  GetSkipSet = '/flow/form/modelInfo/getSkipSet',

  GetFormItemShowsByTaskId = '/flow/front/form/process/getFormItemShowsByTaskId', // /getFormItemShowsByTaskId/{formType}/{taskId}

}

export const getAppliedRange = () => {
  return defHttp.get<any>({ url: Api.GetAppliedRange }).then((res: any)=>{
    res.forEach(item=>{
      item.status = parseInt(item.status);
      item.key = item.status;
      item.label = item.msg;
      item.value = item.status;
    });
    return Promise.resolve(res);
  })
};

export const getSkipSet = () => {
  return defHttp.get<any>({ url: Api.GetSkipSet }).then((res: any)=>{
    res.forEach(item=>{
      item.code = parseInt(item.code);
      item.key = item.code;
      item.label = item.message;
      item.value = item.code;
    });
    return Promise.resolve(res);
  })
};


// export const getFormItemShowsByTaskId = (params: any) => {
//   return defHttp.post({ url: Api.GetFormItemShowsByTaskId + '/' + params.formType + '/' + params.taskId }).then((res)=>{
//     return Promise.resolve(res);
//   })
// };

export const getModelIcons = () => {
  return Promise.resolve(res=>{
    return [{
      id: '',
      icon: '',
    }];
  });

  /*return defHttp.get<any>({ url: Api.GetSkipSet }).then((res: any)=>{
    res.forEach(item=>{
      item.code = parseInt(item.code);
      item.key = item.code;
      item.label = item.message;
      item.value = item.code;
    });
    return Promise.resolve(res);
  })*/
};

export const getAllFormType = () => {
// PROCESS_FORM_CUSTOM(0, "自定义流程表单"), PROCESS_FORM_BIZ(1, "业务流程表单"), PROCESS_FORM_TASK(2, "任务流程表单");PROCESS_FORM_CUSTOM(0, "自定义流程表单"), PROCESS_FORM_BIZ(1, "业务流程表单"), PROCESS_FORM_TASK(2, "任务流程表单");
  const formTypes = [
    {
      value: 0,
      label: '自定义流程表单',
    },
    {
      value: 1,
      label: '业务流程表单',
    },
    {
      value: 2,
      label: '任务流程表单',
    },
  ];
  return Promise.resolve(formTypes);
};
