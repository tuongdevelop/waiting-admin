import { Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[expandMenu]'
})
export class ExpandDirective {
  @HostBinding('class.active') isOpen = false;
  @HostListener('click') toggleOpen($event) {
    this.isOpen = !this.isOpen;
  }
  constructor(

  ) { }
}
