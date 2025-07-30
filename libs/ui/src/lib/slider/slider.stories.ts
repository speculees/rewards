import { Meta, StoryObj } from '@storybook/angular';
import { action } from 'storybook/actions';
import { SliderComponent } from './slider';

const meta: Meta<SliderComponent> = {
  title: 'Product/Slider',
  component: SliderComponent,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
  }
};


export default meta;

export const Default: StoryObj<SliderComponent> = {
  args: {
    disabled: false, 
  },
  render: (args) => ({
    props: {
      ...args,
      onInput: action('slider input'),
    },
    template: `
<rui-slider
  [min]="0"
  [max]="50"
  [step]="5"
  [value]="amount"
  [disabled]="false"
>
  <input
    type="range"
    [min]="min"
    [max]="max"
    [step]="step"
    [value]="value"
    [disabled]="disabled"
    (input)="onInput($event)"
    (change)="onChange($event)"
  />
</rui-slider>

    `,
  }),
};
