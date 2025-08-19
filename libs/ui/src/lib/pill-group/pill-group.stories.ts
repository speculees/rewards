import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PillComponent } from '../pill/pill';
import { IconComponent } from '../icon/icon';
import { SuffixDirective } from '../form-field/directives/suffix';
import { PrefixDirective } from '../form-field/directives/prefix';
import { PillGroupComponent } from './pill-group';

const meta: Meta<unknown> = {
  title: 'Product/PillGroup',
  component: PillGroupComponent,
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

export const Default: StoryObj<unknown> = {
  render: (args) => ({
    props: { args },
    template: `
      <rui-pill-group>
        <rui-pill [variant]="args.variant">All</rui-pill>

        <rui-pill [variant]="args.variant">
          <rui-icon ruiPrefix>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 9.51902C12.5 12.5466 10.0381 15 7 15C3.9619 15 1.5 12.5466 1.5 9.51902C1.5 8.62118 1.72 7.77554 2.10762 7.02386C2.12857 8.7569 3.13429 10.1559 4.36 10.1559C5.37619 10.1559 6.19333 9.34154 6.19333 8.32886C6.19333 7.89038 6.04667 7.49366 5.78476 7.17002C5.25048 6.4601 4.92571 5.58315 4.92571 4.62267C4.92571 3.08799 5.74286 1.75168 6.96857 1C6.9581 5.65623 12.5 5.53095 12.5 9.51902Z" stroke="#30283E" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
          </rui-icon>
          Trending
        </rui-pill>

        <rui-pill [variant]="args.variant">
          <rui-icon ruiPrefix>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4V8L10 10M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#30283E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </rui-icon>
          Ends soon
        </rui-pill>
      </rui-pill-group>
    `,
  }),
  args: {
    variant: 'dark',
  },
};
