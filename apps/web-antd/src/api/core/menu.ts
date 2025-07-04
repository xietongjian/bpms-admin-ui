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
      hideInMenu: item.showStatus === 0,
      // keepAlive: true,
    };
    item.name = sn;
  });
  const menuTree = listToTree(menus);

  // 如果是中间层级的目录，则去除component属性
  forEach(menuTree, (node) => {
    if (node.children && node.children.length > 0 && !!node.pid) {
      const noHideMenuIdx = node.children.findIndex(itm => !itm.meta.hideInMenu)
      // 必需子菜单没有全部隐藏才能去除
      if (noHideMenuIdx !== -1) {
        delete node.component;
      }
    }
  })

  console.log(menuTree);
  return menuTree;
}

