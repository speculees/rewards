import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PillComponent } from './pill';
import { PillGroupComponent } from '../pill-group/pill-group';
import { IconComponent } from '../icon/icon';
import { SuffixDirective } from '../form-field/directives/suffix';
import { PrefixDirective } from '../form-field/directives/prefix';

const meta: Meta<unknown> = {
  title: 'Product/Pill',
  component: PillComponent,
  decorators: [
    moduleMetadata({
      imports: [
        PillComponent,
        IconComponent,
        SuffixDirective,
        PrefixDirective,
        PillGroupComponent,
      ],
    }),
  ],
  args: {
    variant: 'dark',
  },
  argTypes: {
    variant: {
      options: ['dark', 'light'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

export const All: StoryObj<PillComponent> = {
  render: (args) => ({
    props: { args },
    template: `
      <rui-pill [variant]="args.variant">All</rui-pill>
    `,
  }),
  args: {
    variant: 'dark',
  },
};

export const WithIcon: StoryObj<PillComponent> = {
  render: (args) => ({
    props: { args },
    template: `
      <rui-pill [variant]="args.variant">
        <rui-icon ruiPrefix>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 9.51902C12.5 12.5466 10.0381 15 7 15C3.9619 15 1.5 12.5466 1.5 9.51902C1.5 8.62118 1.72 7.77554 2.10762 7.02386C2.12857 8.7569 3.13429 10.1559 4.36 10.1559C5.37619 10.1559 6.19333 9.34154 6.19333 8.32886C6.19333 7.89038 6.04667 7.49366 5.78476 7.17002C5.25048 6.4601 4.92571 5.58315 4.92571 4.62267C4.92571 3.08799 5.74286 1.75168 6.96857 1C6.9581 5.65623 12.5 5.53095 12.5 9.51902Z" stroke="#30283E" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </rui-icon>
        Trending
      </rui-pill>
    `,
  }),
  args: {
    variant: 'dark',
  },
};
