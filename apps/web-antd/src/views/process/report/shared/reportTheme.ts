import type { EChartsOption } from 'echarts';

import { preferences } from '@vben/preferences';

export const isDarkTheme = () => {
  const theme = preferences.theme.mode;
  if (theme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return theme === 'dark';
};

/**
 * 深色主题颜色
 */
export const darkTheme = {
  '--el-bg-color': '#141414',
  '--el-color-primary': '#1890ff',
  '--el-border-color': '#303030',
  '--el-text-color-primary': '#ffffffd9',
  '--el-text-color-secondary': '#ffffff8c',
  '--el-color-info-light-9': '#0a0a0a',
};

/**
 * 浅色主题
 */
export const lightTheme = {
  '--el-bg-color': '#ffffff',
  '--el-color-primary': '#1890ff',
  '--el-border-color': '#f0f0f0',
  '--el-text-color-primary': '#000000d9',
  '--el-text-color-secondary': '#00000073',
  '--el-color-info-light-9': '#f5f5f5',
};

/**
 * 适配系统主题样式
 */
export function getThemeStyle() {
  const theme = isDarkTheme() ? darkTheme : lightTheme;
  return Object.entries(theme)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';');
}

// 饼图公共配置
export const pieOptions: EChartsOption = {};

// 柱状图公共配置
export const barOptions: EChartsOption = {};

// 折线图公共配置
export const lineOptions: EChartsOption = {};
