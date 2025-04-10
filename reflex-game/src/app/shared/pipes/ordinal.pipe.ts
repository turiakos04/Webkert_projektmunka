import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ 
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {
  transform(value: number): string {
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = value % 100;
    return value + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
  }
}

