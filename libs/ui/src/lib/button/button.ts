import { booleanAttribute, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

export type ButtonType = 'primary' | 'secondary' | 'white' | 'tertiary' | 'pill' | 'icon';

@Directive({
  selector: '[ruiAction]',
  host: {
    '[class.rui-action]': 'true',
    '[class.rui-action--primary]': 'color === "primary"',
    '[class.rui-action--secondary]': 'color === "secondary"',
    '[class.rui-action--tertiary]': 'color === "tertiary"',
    '[attr.disabled]': 'disabled || null',
  },
})
export class ActionDirective {
  @Input() type: ButtonType = 'primary';
  @Input({ transform: booleanAttribute }) disabled = false;
}

@Component({
  selector: '[ruiButton]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: './button.scss',
  hostDirectives: [ActionDirective],
  host: {
    'class': 'rui-button',
  }
})
export class ButtonComponent {
}
