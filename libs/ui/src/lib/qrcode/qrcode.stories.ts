import { Meta, StoryObj } from '@storybook/angular';
import { Qrcode } from './qrcode';

const meta: Meta<unknown> = {
  title: 'Product/Qrcode',
  component: Qrcode,
  args: {
    value: '123456789',
  }
};

export default meta;

export const Default: StoryObj<Qrcode> = {
  render: (args) => ({
    props: { args },
    template: `<rui-qrcode [value]="args.value"></rui-qrcode>`,
  }),
};
