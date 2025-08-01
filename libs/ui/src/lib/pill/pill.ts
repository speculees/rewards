import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rui-pill',
  template: '<ng-content></ng-content>',
  styleUrl: './pill.scss',
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.rui-pill]': 'true',
    '[class.rui-pill--success]': `variant === 'success'`,
    '[class.rui-pill--error]': `variant === 'error'`,
  },
})
export class PillComponent {
  @Input() variant = 'success';
}
