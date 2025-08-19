import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { action } from 'storybook/actions';
import { InputComponent } from './input';
import { IconComponent } from '../icon/icon';
import { FormFieldComponent } from '../form-field/form-field';
import { SuffixDirective } from '../form-field/directives/suffix';
import { PrefixDirective } from '../form-field/directives/prefix';

const meta: Meta<unknown> = {
  title: 'Product/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        InputComponent,
        IconComponent,
        FormFieldComponent,
        SuffixDirective,
        PrefixDirective,
      ],
    }),
  ],
  args: {
    label: 'Button',
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj<InputComponent> = {
  render: (args) => ({
    props: {
      args,
      onFocus: action('focused'),
      onBlur: action('blurred'),
      onChange: action('changed'),
    },
    template: `
      <rui-input>
        <input
          [disabled]="args.disabled"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (input)="onChange($event.target.value)"
          placeholder="Input Placeholder" type="text" />
      </rui-input>
    `,
  }),
};

export const WithIcon: StoryObj<InputComponent> = {
  render: (args) => ({
    props: {
      args,
      onFocus: action('focused'),
      onBlur: action('blurred'),
      onChange: action('changed'),
    },
    template: `
      <rui-form-field>
         <rui-icon ruiPrefix>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5C10 7.07107 11.6789 8.75 13.75 8.75C15.8211 8.75 17.5 7.07107 17.5 5C17.5 2.92893 15.8211 1.25 13.75 1.25C11.6789 1.25 10 2.92893 10 5ZM10 5H1.25M10 15C10 12.9289 8.32107 11.25 6.25 11.25C4.17893 11.25 2.5 12.9289 2.5 15C2.5 17.0711 4.17893 18.75 6.25 18.75C8.32107 18.75 10 17.0711 10 15ZM10 15H18.75" stroke="#30283E" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </rui-icon>
        <rui-input>
          <input
            [disabled]="args.disabled"
            (focus)="onFocus($event)"
            (blur)="onBlur($event)"
            (input)="onChange($event.target.value)"
            placeholder="Search for anything..."
            type="text"
          />
        </rui-input>
        <rui-icon ruiSuffix>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5C10 7.07107 11.6789 8.75 13.75 8.75C15.8211 8.75 17.5 7.07107 17.5 5C17.5 2.92893 15.8211 1.25 13.75 1.25C11.6789 1.25 10 2.92893 10 5ZM10 5H1.25M10 15C10 12.9289 8.32107 11.25 6.25 11.25C4.17893 11.25 2.5 12.9289 2.5 15C2.5 17.0711 4.17893 18.75 6.25 18.75C8.32107 18.75 10 17.0711 10 15ZM10 15H18.75" stroke="#30283E" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </rui-icon>
      </rui-form-field>
    `,
  }),
};
