import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

type RuiInputHarnessFilter = BaseHarnessFilters & {
  disabledInput: boolean
};

export default class InputHarness extends ComponentHarness {
  static hostSelector = 'rui-input';

  static with(options: RuiInputHarnessFilter) {
    return new HarnessPredicate(InputHarness, options)
      .addOption(
        'input disabled',
        options.disabledInput,
        (harness) => harness
          .isInputDisabled()
          .then((value) => value === options.disabledInput)
      );
  }

  private input = this.locatorFor('input');

  isInputDisabled() {
    return this
      .input()
      .then((input) => input.getProperty<boolean>('disabled'))
  }

  isDisabled() {
    return this
      .host()
      .then((host) => host.hasClass('rui-input--disabled'));
  }

  focusInput() {
    return this.input().then((input) => input.focus());
  }

  blurInput() {
    return this.input().then((input) => input.blur());
  }

  isFocused() {
    return this
      .host()
      .then((host) => host.hasClass('rui-input--focused'));
  }
}
