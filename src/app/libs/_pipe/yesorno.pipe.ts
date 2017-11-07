import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesorno'
})
export class YesornoPipe implements PipeTransform {
  transform(value: any, format: Array<any> = [], option: Array<any> = []): string {
    let result = value;
    if (Array.isArray(format) && Array.isArray(option)) {
      format.forEach((obj, i) => {
        if (value == obj) {
          result = option[i] || result;
        }
      });
    }
    return result;
  }
}
