import { requestClient } from '#/api/request';

enum Api {
  QueryDeadLetterJobPagerModel = '/flow/flowoperation/job/queryDeadLetterJobPagerModel',
  QueryTimerJobPagerModel = '/flow/flowoperation/job/queryTimerJobPagerModel',
  MoveDeadLetterJobToExecutableJobByJobIds = '/flow/flowoperation/job/moveDeadLetterJobToExecutableJobByJobIds',
  UpdateDuedateById = '/flow/flowoperation/job/updateDuedateById',
}

/**
 * 查询分页
 * @param params
 */
export const queryDeadLetterJobPagerModel = (params: any) => {
  // console.log('queryDeadLetterJobPagerModel...', params);
  //
  // const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  // const entity = params || {};
  // if (entity) {
  //   delete entity['pageNum'];
  //   delete entity['pageSize'];
  // }
  // const queryParam = { query, entity };
  return requestClient.post(Api.QueryDeadLetterJobPagerModel, params);
};

/**
 * 查询分页
 * @param params
 */
export const queryTimerJobPagerModel = (params: any) => {
  console.log('queryTimerJobPagerModel...', params);
  /*const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  if (params.field) {
    if (params.field === 'startTime') {
      query['sqlOrderBy'] = { 't1.START_TIME_': params['order'] === 'ascend' ? 'ASC' : 'DESC' };
    }
    delete entity['field'];
    delete entity['order'];
  } else {
    query['sqlOrderBy'] = { 't1.START_TIME_': 'DESC' };
  }*/
  // const queryParam = { query, entity };
  return requestClient.post(Api.QueryTimerJobPagerModel, params);
};

/**
 * 获取流程的审批记录
 * @param params
 * /queryTimerJobPagerModel
 */
export const getJobsCount = () => {
  return Promise.all([
    queryTimerJobPagerModel({query:{ pageNum: 1, pageSize: 0}, entity: {} }),
    queryDeadLetterJobPagerModel({query: { pageNum: 1, pageSize: 0 }, entity: {}}),
  ]).then((res) => {
    return Promise.resolve({ timerJobCount: res[0].total, deadLetterJobCount: res[1].total });
  });
};

/**
 * 批量执行
 * @param params
 * /moveDeadLetterJobToExecutableJobByJobIds
 */
export const moveDeadLetterJobToExecutableJobByJobIds = (jobIds: any) => {
  return requestClient.post<any>(Api.MoveDeadLetterJobToExecutableJobByJobIds, jobIds,
    { responseReturn: 'body' },
  );
};

/**
 * 修改执行时间
 * @param params
 * /UpdateDuedateById
 */
export const updateDuedateById = (params: any) => {
  return requestClient.post<any>(Api.UpdateDuedateById, params,
    { responseReturn: 'body' },
  );
};
