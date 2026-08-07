import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';
import { listToTree, forEach, findPathAll } from '#/utils/helper/treeHelper';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient
    .get<RouteRecordStringComponent[]>('/flow/main/getLoginModules', {
      responseReturn: 'body',
    })
    .then((res) => {
      console.log('[Menu API] 原始响应:', res);
      const menus = res?.data || res;
      console.log('[Menu API] 解析后菜单数据量:', Array.isArray(menus) ? menus.length : typeof menus);
      const menuTree = genMenuTree(menus);
      return Promise.resolve(menuTree);
    });
}

// 后端组件路径 → 前端实际文件路径映射（处理后端路径与项目文件结构不一致的情况）
const COMPONENT_PATH_MAP: Record<string, string> = {
  '/bpm/institutionClassification/index.vue':
    '/institution/institutionClassification/index.vue',
  '/bpm/institutionManagement/index.vue':
    '/institution/institutionManagement/index.vue',
};

function genMenuTree(menus: any[]) {
  if (!Array.isArray(menus)) return [];

  // 过滤掉不需要的菜单
  const validMenus = menus.filter((item) => item && item.path !== '/analysis');

  // 记录需要隐藏的菜单ID
  const hideMenuIds: string[] = [];
  let hasWorkbenchFlag = false;

  validMenus.forEach((item) => {
    const sn = item.sn;

    // 路径处理
    const rawUrl = item.url;
    item.path =
      !item.pid && item.url && !item.url.startsWith('/')
        ? `/${item.url}`
        : item.url || item.path;

    // 组件映射：LAYOUT → BasicLayout
    item.component =
      item.component === 'LAYOUT' ? 'BasicLayout' : item.component;

    // 路径修正：当 url 是相对路径(如 "workbench")，而 component 是绝对路径且包含目录时，
    // 使用 component 目录作为路由 path (如 "/dashboard/workbench/index" → "/dashboard/workbench")
    if (
      rawUrl &&
      !rawUrl.startsWith('/') &&
      item.component &&
      typeof item.component === 'string' &&
      item.component.startsWith('/') &&
      item.component !== 'BasicLayout'
    ) {
      const compDir = item.component.replace(/\/index(\.vue)?$/, '');
      if (compDir !== item.path) {
        item.path = compDir;
      }
    }

    // 组件路径映射：处理后端路径与实际文件路径不一致的情况
    if (item.component && COMPONENT_PATH_MAP[item.component]) {
      item.component = COMPONENT_PATH_MAP[item.component];
    }

    // 菜单元数据
    item.meta = {
      title: item.name,
      icon: item.image,
      order: item.orderNo,
      hideInMenu: item.showStatus === 0,
    };

    item.name = sn;

    if (item.showStatus === 0) {
      hideMenuIds.push(item.id);
    }

    if (item.name === 'Workbench') {
      hasWorkbenchFlag = true;
    }
  });

  // 如果没有首页菜单，默认添加一个
  if (!hasWorkbenchFlag) {
    console.log('[Menu] 后端未返回 Workbench，插入默认首页');
    validMenus.unshift({
      id: 'default-workbench',
      name: 'Workbench',
      meta: {
        title: '首页',
        icon: 'ant-design:home-outlined',
        order: 0,
        hideInMenu: false,
      },
      url: '/dashboard/workbench',
      path: '/dashboard/workbench',
      sn: 'Workbench',
      orderNo: 0,
      pid: null,
      component: '/dashboard/workbench/index',
    } as any);
  } else {
    const wb = validMenus.find((m) => m.name === 'Workbench');
    console.log('[Menu] 后端返回的 Workbench:', JSON.stringify(wb));
  }

  // flat list → tree
  const menuTree = listToTree(validMenus, {
    id: 'id',
    children: 'children',
    pid: 'pid',
  });

  // 处理隐藏菜单的 activeMenu，保证选中正确的父菜单
  forEach(menuTree, (item) => {
    if (hideMenuIds.includes(item.id)) {
      const allPath = findPathAll(
        menuTree,
        (it: any) => it.id === item.id,
      )[0];
      if (allPath && allPath.length > 0) {
        allPath.pop();
        if (allPath.length > 0) {
          item.meta.currentActiveMenu = allPath
            .map((it: any) => it.path)
            .join('/');
        }
      }
    }
  });

  // 中间层级目录去除 component 属性（有可见子菜单时）
  forEach(menuTree, (node) => {
    if (node.children && node.children.length > 0 && !!node.pid) {
      const noHideMenuIdx = node.children.findIndex(
        (itm: any) => !itm.meta?.hideInMenu,
      );
      if (noHideMenuIdx !== -1) {
        delete node.component;
      }
    }
  });

  return menuTree;
}

