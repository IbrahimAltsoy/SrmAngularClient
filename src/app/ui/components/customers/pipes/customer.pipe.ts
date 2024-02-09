import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerPipe',
  standalone: true
})
export class CustomerPipe implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    if(filterText==""){return value;}
    return value.filter(p=>{
      const identityNumber = p.identityNumber.toLowerCase().includes(filterText.toLowerCase());
      const companyName = p.companyName.toLowerCase().includes(filterText.toLowerCase());
      return identityNumber+ companyName;
    })
  }

}
