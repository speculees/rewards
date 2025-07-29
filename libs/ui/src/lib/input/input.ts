import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rui-input',
  template: '<ng-content></ng-content>',
  styleUrl: './input.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.rui-input]': 'true',
    '[class.rui-input--focused]': 'focused',
    '[class.rui-input--disabled]': 'disabled',
  }
})
export class InputComponent {

  private el = inject(ElementRef);

  get disabled() {
    return this.el.nativeElement.querySelector('input').disabled;
  }

  get focused() {
    return document.activeElement === this.el.nativeElement.querySelector('input');
  }
}
