import { requestClient } from '#/api/request';
// import qs from 'qs';
import { doDownload } from '#/utils/domUtils';
import { formatToDateTime, getDatesArray } from '#/utils/dateUtil';

enum Api {
  GetFlowCountReport = '/flow/report/count/getFlowCountReport', // 统计数量
  GetMyProcessDetail = '/flow/report/count/getMyProcessDetail', // 查询发起的
  GetTaskProcessDetail = '/flow/report/count/getTaskProcessDetail', // 查询待办，已办
  DownloadMyProcessDetail = '/flow/report/count/downloadMyProcessDetail', // 导出发起的
  DownloadTaskProcessDetail = '/flow/report/count/downloadTaskProcessDetail', // 导出待办，已办
  GetProcessCountBi = '/flow/report/count/geGetProcessCountBi', // 导出待办，已办

  // 编程统计
  // /flow/bi/countProcInst/api
  CountLatestNumDaysProcInst = '/flow/bi/countProcInst/api/countLatestNumDaysProcInst',
  CountLatestNumDaysTask = '/flow/bi/countTask/api/countLatestNumDaysTask',
  CountProcInstTask = '/flow/bi/countProcInstTask/api/countProcInstTask',
  // countLatestNumDaysFastSlowTaskAssignee
  // 获取最近几天的最快或最慢的流程任务
  CountLatestNumDaysFastSlowTaskAssignee = '/flow/bi/countTask/api/countLatestNumDaysFastSlowTaskAssignee',
  // 获取最近几天的最快或最慢的流程实例
  CountLatestNumDaysFastSlowProcInst = '/flow/bi/countProcInst/api/countLatestNumDaysFastSlowTaskAssignee',
}

// 查询对象转换

const convertSearchInfo = (entity: any) => {
  if (entity) {
    if (entity.userNo && entity.userNo.length > 0) {
      entity.userNo = entity.userNo[0].code;
    } else {
      entity.userNo = '';
    }
    if (entity.deptId && entity.deptId.length > 0) {
      entity.deptId = entity.deptId[0].id;
    } else {
      entity.deptId = '';
    }
    if (entity.companyId && entity.companyId.length > 0) {
      entity.companyId = entity.companyId[0].id;
    } else {
      entity.companyId = '';
    }
    delete entity.dateRange;
  }
  return entity;
};

export const getFlowCountReport = (params: any) => {
  let entity = params || {};
  entity = convertSearchInfo(entity);
  return requestClient.post<any>({ url: Api.GetFlowCountReport, params: entity });
};

// 查询已发
export const getMyProcessDetail = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  let entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    entity = convertSearchInfo(entity);
  }
  const queryParam = { query, entity } as BasicPageSearchParams<any>;
  return requestClient.post<any>({ url: Api.GetMyProcessDetail, params: queryParam });
};

// 查询待办，已办 taskFinishFlag： true已办  false待办
export const getTaskProcessDetail = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  let entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    entity = convertSearchInfo(entity);
  }
  const queryParam = { query, entity } as BasicPageSearchParams<any>;
  return requestClient.post<any>({ url: Api.GetTaskProcessDetail, params: queryParam });
};

// 下载Excel已发
export const downloadMyProcessDetail = (params: any) => {
  let entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    entity = convertSearchInfo(entity);
  }
  // const comValue = qs.stringify(entity);

  const downUrl = import.meta.env.VITE_GLOB_API_URL + Api.DownloadMyProcessDetail;

  doDownload(downUrl);
  return Promise.resolve('success');
};

// 下载Excel待办，已办 taskFinishFlag： true已办  false待办
export const downloadTaskProcessDetail = (params: any) => {
  let entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    entity = convertSearchInfo(entity);
  }
  const comValue = qs.stringify(entity);

  const downUrl =
    import.meta.env.VITE_GLOB_API_URL + Api.DownloadTaskProcessDetail + '?' + comValue;

  doDownload(downUrl);

  return Promise.resolve('success');
};

// 获取流程数据统计
export const getProcessCountBi = async (params: any) => {
  params.num = params.dateRangeCount;
  delete params.dateRangeCount;
  const taskCounts = await defHttp
    .post<any>({ url: Api.CountLatestNumDaysTask, params: params })
    .then((res) => {
      res.forEach((item) => {
        item.date = item.statName;
        item.taskCount = item.total;
      });
      return Promise.resolve(res);
    });
  const taskDates = {};
  taskCounts.forEach((item) => {
    taskDates[item.date] = item;
  });

  return requestClient.post<any>({ url: Api.CountLatestNumDaysProcInst, params: params }).then((res) => {
    const dateItemMap = {};
    res.forEach((item) => {
      item.date = item.statName;
      item.instCount = item.total || 0;
      item.taskCount = taskDates[item.date]?.total || 0;
      dateItemMap[item.statName] = item;
    });
    const result = getDatesArray(new Date(), params.num-1, 0);

    const resultRes = [];
    result.forEach((item) => {
      const date = formatToDateTime(item, 'YYYY-MM-DD');
      let dateItem = dateItemMap[date];
      if (!dateItem) {
        dateItem = {};
        dateItem['date'] = date;
        dateItem['instCount'] = 0;
        dateItem['taskCount'] = 0;
      } else {
      }
      resultRes.push(dateItem);
    });

    return Promise.resolve(resultRes);
  });
};

// 获取流程数据统计
export const countProcInstTask = () => {
  return requestClient.get<any>(Api.CountProcInstTask ).then((res) => {
    const countData = [];
    for (const itm in res) {
      switch (itm) {
        case 'countRunProcInst':
          countData.push({
            path: '/flowoperation/processInst',
            title: '运行的流程实例',
            icon: 'ant-design:bars-outlined',
            value: res[itm],
            color: 'green',
          });
          break;
        case 'countHisProcInst':
          countData.push({
            path: '/flowoperation/processInst',
            title: '历史流程实例',
            icon: 'ant-design:bar-chart-outlined',
            value: res[itm],
            color: 'green',
          });
          break;
        case 'countAppingTask':
          countData.push({
            path: '/flowoperation/processTask',
            title: '当前任务总数',
            icon: 'ant-design:menu-unfold-outlined',
            value: res[itm],
            color: 'green',
          });
          break;
        case 'countApplyedTask':
          countData.push({
            path: '/flowoperation/processTask',
            title: '历史任务数',
            icon: 'ant-design:bar-chart-outlined',
            value: res[itm],
            color: 'green',
          });
          break;
      }
    }
    return Promise.resolve(countData);
  });
};

// 获取最近几天的最快或最慢的流程任务
export const countLatestNumDaysFastSlowTaskAssignee = (params) => {
  return requestClient
    .post<any>({ url: Api.CountLatestNumDaysFastSlowTaskAssignee, params })
    .then((res) => {
      res.forEach((item) => {});
      return Promise.resolve(res);
    });
};

// 获取最近几天的最快或最慢的流程任务
export const countLatestNumDaysFastSlowProcInst = (params) => {
  return requestClient.post<any>({ url: Api.CountLatestNumDaysFastSlowProcInst, params }).then((res) => {
    res.forEach((item) => {});
    return Promise.resolve(res);
  });
};
