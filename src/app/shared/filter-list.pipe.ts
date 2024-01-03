import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList',
  standalone: true,
})
export class FilterListPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }

    searchText = searchText?.toLowerCase();

    return items.filter((it) => {
      return it.fullName.toLowerCase().includes(searchText);
    });
  }
}
