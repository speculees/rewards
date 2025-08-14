import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rui-form-field',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './form-field.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: { '[class.rui-form-field]': 'true' },
})
export class FormFieldComponent {}
