import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rui-pill-group',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './pill-group.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.rui-pill-group]': 'true',
  },
})
export class PillGroupComponent {}
