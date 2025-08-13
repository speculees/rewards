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

export const Primary: Story = {
  args: {
    type: 'primary',
    label: 'Primary Button'
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    label: 'Secondary Button'
  },
};

export const White: Story = {
  args: {
    type: 'white',
    label: 'White Button'
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    label: 'Tertiary Button'
  },
};

export const Pill: Story = {
  args: {
    type: 'pill',
    label: 'Pill Button'
  },
};

export const Icon: Story = {
  args: {
    type: 'icon',
    label: '✕'
  },
  render: (args) => ({
    props: {
      type: args.type,
      disabled: args.disabled
    },
    template: `
      <button ruiButton type="icon" [disabled]="disabled" aria-label="Close">
        ${args.label}
      </button>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    type: 'primary',
    disabled: true,
    label: 'Disabled Button'
  },
};