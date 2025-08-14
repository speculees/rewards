import { Directive } from '@angular/core';

@Directive({
  selector: '[ruiPrefix]',
  host: {
    '[class.rui-prefix]': 'true',
  },
})
export class PrefixDirective {
  constructor() {}
}
