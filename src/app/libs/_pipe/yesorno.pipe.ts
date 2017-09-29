import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesorno'
})
export class YesornoPipe implements PipeTransform {
  transform(value: any, format: string = ''): string {
    return value && (value == format ? '否' : '是') || '';
  }
}
