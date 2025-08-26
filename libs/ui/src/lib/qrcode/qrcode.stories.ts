import { Meta, StoryObj } from '@storybook/angular';
import { QrcodeComponent } from './qrcode';

const meta: Meta<unknown> = {
  title: 'Components/Qrcode',
  component: QrcodeComponent,
  args: {
    value: '123456789',
  },
};

export default meta;

export const Default: StoryObj<QrcodeComponent> = {
  render: (args) => ({
    props: { args },
    template: `<rui-qrcode [value]="args.value"></rui-qrcode>`,
  }),
};
