import { Meta, StoryObj } from '@storybook/angular';
import { action } from 'storybook/actions';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Product/Button',
  component: ButtonComponent,
  args: {
    color: 'primary',
    variant: 'contained',
    disabled: false,
  },
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

export const Default: StoryObj<ButtonComponent> = {
  render: (args) => ({
    props: { args, onClick: action('clicked') },
    template: `
      <button ruiButton
        (click)="onClick($event)"
        [color]="args.color"
        [disabled]="args.disabled"
        [variant]="args.variant">
        Button
      </button>
    `,
  }),
};

export const Link: StoryObj<ButtonComponent> = {
  render: (args) => ({
    props: { args },
    template: `
      <a ruiButton
        href="#"
        target="_blank"
        [color]="args.color"
        [disabled]="args.disabled"
        [variant]="args.variant">
        Link
      </a>
    `,
  }),
  args: {
    variant: 'text',
  }
};
