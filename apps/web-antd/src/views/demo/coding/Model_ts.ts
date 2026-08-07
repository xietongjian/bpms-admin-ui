const getFieldType = (dataType: string) => {
  if (dataType === 'varchar') {
    return 'string';
  } else if (dataType === 'int') {
    return 'number';
  }
  return 'any';
};

const genFieldItem = (item: any) => {
  return `${item.fieldName}?: ${getFieldType(item.dataType)};
  `;
};

export default (formData: any) => {
  const fields = formData.fields;
  const fieldItems = fields
    .filter((item: any) => item.showInTable)
    .map((item: any) => {
      return genFieldItem(item);
    });
  return `import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';

export type ${formData.className}Params = {
  keyword?: string;
};

export type ${formData.className}PageParams = BasicPageParams & ${formData.className}Params;

export type ${formData.className}Info = {
  ${fieldItems.join('')}
};

/**
 * @description: Request list return value
 */
export type ${formData.className}PageListGetResultModel = BasicFetchResult<${formData.className}Info>;
`;
};
