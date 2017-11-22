import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * 日期格式化 [value] | datex:[format]
 */
@Pipe({
  name: 'datex'
})
export class DatexPipe implements PipeTransform {
  /**
   * 转换日期
   * @param value 需要转换的内容
   * @param {string} format 需要转换的日期格式
   * @returns {string}
   */
  transform(value: any, format: string = ''): string {
    // 判断日期是否合法 合法则进行格式化 不合法则返回原始值
    return moment(value).isValid() ? moment(value).format(format) : value;
  }
}
