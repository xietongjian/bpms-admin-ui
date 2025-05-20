import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';
import {listToTree, forEach} from "#/utils/helper/treeHelper";

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
    item.path = !item.pid && item.url.indexOf('/') !== 0 ? ("/" + item.url) : item.url;
    item.component = (item.component === 'LAYOUT' ? 'BasicLayout' : item.component);
    item.meta = {
      title: item.name,
      icon: item.image,
      hideMenu: item.showStatus === 0,
    };
    item.name = sn;
  });
  const menuTree = listToTree(menus);

  // 如果是中间层级的目录，则去除component属性
  forEach(menuTree, (node) => {
    if(node.children && node.children.length > 0 && !!node.pid){
      delete node.component;
    }
  })

  console.log(menuTree);
  return menuTree;
}

