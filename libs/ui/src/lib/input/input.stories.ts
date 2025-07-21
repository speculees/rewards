import { Meta, StoryObj } from '@storybook/angular';
import { action } from 'storybook/actions';
import { InputComponent } from './input';

const meta: Meta<unknown> = {
  title: 'Product/Input',
  component: InputComponent,
  args: {
    label: 'Button'
  }
};

export default meta;

export const Default: StoryObj<InputComponent> = {
  render: (args) => ({
    props: {
      args,
      onFocus: action('focused'),
      onBlur: action('blurred'),
      onChange: action('changed'),
    },
    template: `
      <rui-input>
        <input
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (input)="onChange($event.target.value)"
        placeholder="Input Placeholder" type="text" />
      </rui-input>
    `,
  }),
};
