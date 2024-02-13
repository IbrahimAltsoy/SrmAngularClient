import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestPipe',
  standalone: true
})
export class RequestPipe implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    if(filterText==""){return value;}
    return value.filter(p=>{
      const description = p.description.toLowerCase().includes(filterText.toLowerCase());
      return description;
    })
  }

}
