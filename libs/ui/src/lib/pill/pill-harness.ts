import { ComponentHarness } from '@angular/cdk/testing';

export default class PillHarness extends ComponentHarness {
  static hostSelector = 'rui-pill';

  async getVariant(): Promise<string | null> {
    const host = await this.host();
    const classes = (await host.getAttribute('class')) || '';

    if (classes.includes('rui-pill--success')) return 'success';
    if (classes.includes('rui-pill--error')) return 'error';
    return null;
  }
}
