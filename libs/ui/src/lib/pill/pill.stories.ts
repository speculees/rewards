import { Meta, StoryObj } from '@storybook/angular';
import { PillComponent } from './pill';

const meta: Meta<unknown> = {
  title: 'Product/Pill',
  component: PillComponent,
  args: {
    variant: 'success',
  },
  argTypes: {
    variant: {
      options: ['success', 'error'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

export const Default: StoryObj<PillComponent> = {
  render: (args) => ({
    props: { args },
    template: `
      <rui-pill [variant]="args.variant"> Pill </rui-pill>
    `,
  }),
  args: {
    variant: 'success',
  },
};
