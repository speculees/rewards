import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Brand Theme',
      defaultValue: 'reward',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'reward', title: 'Reward Theme', left: '🔵' },
          { value: 'natwest', title: 'Natwest Theme', left: '🟣' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals['theme'] || 'reward';

      // Apply theme class to body
      document.body.className = document.body.className.replace(
        /theme-\w+/g,
        ''
      );
      document.body.classList.add(`theme-${theme}`);

      return story();
    },
  ],
};

export default preview;
