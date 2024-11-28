import { h } from 'vue';

import { globalShareState } from '@vben/common-ui';
import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { Button, Image } from 'ant-design-vue';

import { componentMap } from '#/components/view/component-map';
import { omit } from '#/utils';

import { useVbenForm } from './form';

setupVbenVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        columnConfig: {
          resizable: true,
        },
        minHeight: 180,
        formConfig: {
          // 全局禁用vxe-table的表单配置，使用formOptions
          enabled: false,
        },
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'rows',
            total: 'total',
            // list: 'items',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'small',
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellImage' },
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params;
        return h(Image, { src: row[column.field] });
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts;
        return h(
          Button,
          { size: 'small', type: 'link' },
          { default: () => props?.text },
        );
      },
    });

    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
    // 增加编辑组件
    const modelPropNameMap: any = {
      Checkbox: 'checked',
      Radio: 'checked',
      Switch: 'checked',
      // Upload: 'fileList',
    };
    const components = globalShareState.getComponents();
    Object.keys(components).forEach((key: any) => {
      const comp = components[key];
      const modelPropName = modelPropNameMap[key] || 'value';
      vxeUI.renderer.add(key, {
        renderTableEdit(renderOpts, params) {
          const { row, column } = params;
          return h(comp, {
            ...omit(renderOpts.props, ['onChange']),
            [modelPropName]: row[column.field],
            [`onUpdate:${modelPropName}`]: (value: any) => {
              renderOpts.props.onChange?.(value, params);
            },
          });
        },
      });
    });
  },
  useVbenForm,
});

export { useVbenVxeGrid };

export type * from '@vben/plugins/vxe-table';
