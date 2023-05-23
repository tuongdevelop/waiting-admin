import { Directive, HostBinding, HostListener  } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[expandMenu]'
})
export class ExpandMenuDirective {

  constructor() { }

  @HostBinding('class.active') isOpen = false;
  @HostListener('click') toggleOpen($event) {
    this.isOpen = !this.isOpen;
  }
}
