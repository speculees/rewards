import type { Preview } from '@storybook/angular';

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand Theme',
      defaultValue: 'reward',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default Theme', left: '🔵' },
          { value: 'natwest', title: 'Natwest Theme', left: '🟣' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const className = 'brand-css';
      const currentTheme = context.globals['brand'];
      const expectedHref = `${currentTheme}.css`;

      const existingLinks = document.querySelectorAll(`.${className}`);
      existingLinks.forEach((link) => link.remove());

      const link = document.createElement('link');
      link.className = className;
      link.rel = 'stylesheet';
      link.href = expectedHref;

      document.head.appendChild(link);

      return story();
    },
  ],
};

export default preview;
