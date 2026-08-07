import { defineComponent, h } from 'vue';
import { useAccess } from '@vben/access';
import { VbenTableAction as VbenTableActionCore } from '@vben/common-ui';

export { VbenTableAction } from '@vben/common-ui';
export type { ActionItem, TableActionProps } from '@vben/common-ui';

export const TableAction = defineComponent(
  (props: Record<string, any>, { attrs, slots }) => {
    const { hasAccessByCodes } = useAccess();
    function hasPermission(auth?: string | string[]) {
      if (!auth) return true;
      return hasAccessByCodes(Array.isArray(auth) ? auth : [auth]);
    }
    return () =>
      h(VbenTableActionCore, { hasPermission, ...props, ...attrs }, slots);
  },
  {
    name: 'VbenTableAction',
    inheritAttrs: false,
  },
);

export default TableAction;
