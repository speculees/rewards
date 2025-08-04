import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from 'storybook/actions';
import { SliderComponent } from './slider';
import { SliderModule } from './module';

const meta: Meta<SliderComponent> = {
  title: 'Product/Slider',
  component: SliderComponent,
  decorators: [
    moduleMetadata({
      imports: [SliderModule],
    })
  ],
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
    step: 0,
    value: 50,
    disabled: false,
  }
};


export default meta;

export const Default: StoryObj<SliderComponent> = {
  render: (args) => ({
    props: {
      args,
      onInput: action('slider input'),
    },
    template: `
      <rui-slider
        [min]="args.min"
        [max]="args.max"
        [step]="args.step"
        [disabled]="args.disabled">
        <input ruiSliderThumb value="20" />
      </rui-slider>
    `,
  }),
};
