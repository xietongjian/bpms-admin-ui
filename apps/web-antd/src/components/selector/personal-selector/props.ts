import type { PropType } from 'vue';
import {OrgSelectType} from "./types";

export const basicProps = {
  helpText: {
    type: String as PropType<string>,
    default: '',
  },
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  formType: {
    type: Number as PropType<number>,
    default: -1,
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  title: {
    type: String as PropType<string>,
    default: '',
  },
  selectType: {
    type: String as PropType<any>,
    default: OrgSelectType.ORG,
  },
  /*uploadParams: {
    type: Object as PropType<any>,
    default: {},
  },*/
  defaultSelectedOrgKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  extendParams: {
    type: Object as PropType<any>,
    default: {},
  },
};

export const selectorContainerProps = {
  value: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  ...basicProps,
};

export const modelInfoProps = {
  value: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  ...basicProps,
};

/*
export const previewProps = {
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
};
*/

/*
export const fileListProps = {
  columns: {
    type: [Array] as PropType<FileBasicColumn[]>,
    default: null,
  },
  actionColumn: {
    type: Object as PropType<FileBasicColumn>,
    default: null,
  },
  dataSource: {
    type: Array as PropType<any[]>,
    default: null,
  },
};
*/
