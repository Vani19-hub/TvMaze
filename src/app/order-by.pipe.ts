import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<object>, args: any): Array<object> {
    if (array == null) {
      return null;
    }

    const goDeep = (obj: any, desc: any) => {
      const arr = desc.split('.');
      obj = obj[arr.shift()];
      while (arr.length && obj) {
        return obj;
      }
    };

    array.sort((a: any, b: any) => {
      const aDeep = goDeep(a, args);
      const bDeep = goDeep(b, args);
      if (aDeep.average > bDeep.average) {
        return -1;
      }
    });
    return array;
  }
}
