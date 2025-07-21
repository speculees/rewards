import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rui-input',
  template: '<ng-content></ng-content>',
  styleUrl: './input.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    '[class.rui-input]': 'true'
  }
})
export class InputComponent {}
