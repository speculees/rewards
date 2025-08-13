import { booleanAttribute, Component, Input, ViewEncapsulation } from '@angular/core';

export type ButtonType = 'primary' | 'secondary' | 'white' | 'tertiary' | 'pill' | 'icon';

@Component({
  selector: '[ruiButton]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: './button.scss',
  host: {
    '[class.rui-button]': 'true',
    '[class.rui-button--primary]': 'type === "primary"',
    '[class.rui-button--secondary]': 'type === "secondary"',
    '[class.rui-button--white]': 'type === "white"',
    '[class.rui-button--tertiary]': 'type === "tertiary"',
    '[class.rui-button--pill]': 'type === "pill"',
    '[class.rui-button--icon]': 'type === "icon"',
    '[class.rui-button--disabled]': 'disabled',
    '[attr.disabled]': 'disabled || null',
  },
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input({ transform: booleanAttribute }) disabled = false;
}