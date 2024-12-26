export type FormTemplateParams = {
  keyword?: string;
};

export interface FormTemplate {
  id: string;
  name: string;
  status: number;
  formJson: string;
}
