import { FormBase, FormType } from './form-base';

export class FormDatetime extends FormBase<Date | string> {
  controlType?: FormType = FormType.datetime;

  constructor(options: FormDatetime) {
    super(options);
  }
}
