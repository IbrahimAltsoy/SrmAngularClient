import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salesPipe',
  standalone: true
})
export class SalesPipe implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    if(filterText==""){return value;}
    return value.filter(p=>{
      const name = p.name.toLowerCase().includes(filterText.toLowerCase());
      const employeeUserId = p.employeeUserId.toLowerCase().includes(filterText.toLowerCase());
      return name+ employeeUserId;
    })
  }

}

