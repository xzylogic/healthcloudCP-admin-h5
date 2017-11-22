import { Pipe, PipeTransform } from '@angular/core';

/**
 * 数据对应转换 [value] | yesorno:[list-origin]:[list-transform]
 */
@Pipe({
  name: 'yesorno'
})
export class YesornoPipe implements PipeTransform {
  /**
   * 数据转换 条件成立进行转换 不成立返回原始值
   * @param value 原始值
   * @param {Array<any>} origin 原始值数组
   * @param {Array<any>} format 转换值数组
   * @returns {string}
   */
  transform(value: any, origin: Array<any> = [], format: Array<any> = []): string {
    let result = value;
    if (Array.isArray(origin) && Array.isArray(format)) {
      origin.forEach((obj, i) => {
        if (value == obj) {
          result = format[i] || result;
        }
      });
    }
    return result;
  }
}
