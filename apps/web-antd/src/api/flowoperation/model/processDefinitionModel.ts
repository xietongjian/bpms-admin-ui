import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';

export type ProcessDefinitionParams = {
  keyword?: string;
};

export type ProcessDefinitionPageParams = BasicPageParams & ProcessDefinitionParams;

export type ProcessDefinition = {
  id?: string;
  name?: string;
  key?: string;
  category?: string;
  revision?: Number;
  localizedName?: string;
  description?: string;
  localizedDescription?: string;
  version?: Number;
  deploymentId?: string;
  resourceName?: string;
  tenantId?: string;
  historyLevel?: Number;
  diagramResourceName?: string;
  hasGraphicalNotationDefined;
  hasStartFormKey;
  suspensionState?: Number;
  isIdentityLinksInitialized;
  derivedFrom?: string;
  derivedFromRoot?: string;
  derivedVersion?: Number;
  engineVersion?: string;
  // > categories
  defKey?: string;
  keyword?: string;
};

/**
 * @description: Request list return value
 */

export type ProcessDefinitionPageListGetResultModel = BasicFetchResult<ProcessDefinition>;
