import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent, ButtonType  } from './button';

// Define a type for Storybook args that extends the component inputs
type ButtonStoryArgs = {
  type: ButtonType;
  disabled: boolean;
  label: string;  // Storybook-only property for content
};

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: {
      type: args.type,
      disabled: args.disabled
    },
    template: `
      <button ruiButton [type]="type" [disabled]="disabled">
        ${args.label}
      </button>
    `,
  }),
  args: {
    disabled: false,
    label: 'Button'
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    label: {
      control: 'text',
      description: 'Button text content (Storybook only)',
      table: {
        category: 'Storybook',
      }
    },
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
  args: {
    type: 'primary',
    label: 'Primary Button'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/3gcrqy7MNDS7Zem1pxMWp5/Reward-Design-System-_DEVELOPMENT--Copy-?node-id=438-33424&t=85J6VXp1PvBaZCIt-0'
    }
  }
};
