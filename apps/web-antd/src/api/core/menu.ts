import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>('/flow/main/getLoginModules').then(res => {
    const menuTree = genMenuTree(res);
    return Promise.resolve(menuTree);
  });
}


function genMenuTree(menus){
  menus.filter(item => item.path !== '/analysis').forEach(item => {
    const sn = item.sn;
    item.path = item.url;
    item.component = (item.component === 'LAYOUT' ? 'BasicLayout' : item.component);
    item.meta = {
      title: item.name,
      icon: item.image,
      hideMenu: item.showStatus === 0,
    };
    item.name = sn;
  });
  menus.push({
    id: '100002',
    pid: '',
    component: 'BasicLayout',
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'aaa',
    },
    name: 'Dashboardccc',
    path: '/',
  });
  menus.push({
    id: '33',
    pid: '100002',
    name: 'Analyticsbbb',
    path: '/analytics',
    component: '/views/dashboard/analytics/index',
    meta: {
      affixTab: true,
      icon: 'lucide:area-chart',
      title: '主页',
    }
  });

  const menuTree = listToTree(menus);

  console.log(menuTree);
  return menuTree;
}



export function listToTree<T = any>(list: any[], config): T[] {
  const conf = {  id: 'id',
    children: 'children',
    pid: 'pid'};
  const nodeMap = new Map();
  const result: T[] = [];
  const { id, children, pid } = conf;

  for (const node of list) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid]);
    (parent ? parent[children] : result).push(node);
  }
  return result;
}
