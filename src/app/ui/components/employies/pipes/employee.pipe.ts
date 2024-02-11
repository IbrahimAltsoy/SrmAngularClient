import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeePipe',
  standalone: true
})
export class EmployeePipe  implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    if(filterText==""){return value;}
    return value.filter(p=>{
      const name = p.name.toLowerCase().includes(filterText.toLowerCase());
      const surname = p.surname.toLowerCase().includes(filterText.toLowerCase());
      const phone = p.phone.toLowerCase().includes(filterText.toLowerCase());
      return name +surname +phone;
    })
  }

}
