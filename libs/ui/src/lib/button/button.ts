import { booleanAttribute, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Button
 *
 * @description
 * A simple button component that can be used to trigger actions.
 *
 * @export
 * @class ButtonComponent
 *
 * @example
 * <button ruiButton>Button</button>
 * <a ruiButton href="#">Link</a>
 */
@Component({
  selector: '[ruiButton]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: './button.scss',
  host: {
    '[class.rui-button]': 'true',
    '[class.rui-button--contained]': 'variant === "contained"',
    '[class.rui-button--outlined]': 'variant === "outlined"',
    '[class.rui-button--text]': 'variant === "text"',
    '[class.rui-button--primary]': 'color === "primary"',
    '[class.rui-button--secondary]': 'color === "secondary"',
    '[class.rui-button--disabled]': 'disabled',
  },
})
export class ButtonComponent {
  @Input() variant = 'contained';
  @Input() color = 'primary';
  @Input({ transform: booleanAttribute }) disabled = false;
}
