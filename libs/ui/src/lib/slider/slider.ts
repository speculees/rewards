import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  inject,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'rui-slider',
  template: '<ng-content></ng-content>',
  styleUrl: './slider.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.rui-slider]': 'true',
    '[class.rui-slider--focused]': 'focused',
    '[class.rui-slider--disabled]': 'disabled',
  },
})
export class SliderComponent {

  
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Input() step = 1;
  @Input() disabled = false;


  private el = inject(ElementRef);


    get focused(): boolean {
    const input = this.el.nativeElement.querySelector('input[type="range"]');
    return document.activeElement === input;
  }
}
