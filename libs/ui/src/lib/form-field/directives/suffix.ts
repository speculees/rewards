import { Directive } from '@angular/core';

@Directive({
  selector: '[ruiSuffix]',
  standalone: true,
  host: {
    '[class.rui-suffix]': 'true',
  },
})
export class SuffixDirective {}
