import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[validInput]',
  standalone: true
})
export class ValidInputDirective {
@Input("validInput") validInput:boolean =true;
  constructor(
    private el: ElementRef<HTMLElement>
  ) { }
@HostListener("keyup") keyup(){
  if(this.validInput)
    this.el.nativeElement.className ="form-control is-valid"

  else
    this.el.nativeElement.className ="form-control is-invalid"

}
}
