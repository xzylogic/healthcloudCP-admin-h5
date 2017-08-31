import { FormBase, FormType } from './form-base';

export class FormFile extends FormBase<string | string[]> {
  controlType?: FormType = FormType.file;
  url: string;
  multiple?: boolean; // 是否多张图片上传 // 暂时未启用图片上传功能

  constructor(options: FormFile) {
    super(options);
    this.multiple = options['multiple'] || false;
    this.url = options['url'] || '';
  }
}
