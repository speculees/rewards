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

      // Inject theme CSS variables directly
      const themeStyles = getThemeStyles(theme);
      let styleElement = document.getElementById('theme-styles');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'theme-styles';
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = themeStyles;

      return story();
    },
  ],
};

function getThemeStyles(theme: string): string {
  const rewardTheme = `
    :root, .theme-reward {
      --colours-buttons-primary-default: #0080f0;
      --colours-buttons-primary-hover-pressed: #5db0ef;
      --colours-buttons-primary-disabled: #c8c7c1;
      --colours-buttons-primary-text-active: #ffffff;
      --colours-buttons-primary-text-disabled: #858585;
      --colours-buttons-secondary-secondary: rgba(255, 255, 255, 0);
      --colours-buttons-secondary-text-active: #00254d;
      --colours-buttons-secondary-text-disabled: #ffffff;
      --colours-background-background-1: #ffffff;
      --colours-background-background-2: #f5faff;
      --typography-font-family-font-family-body: 'Inter';
      --typography-font-size-font-size-md: 1rem;
      --typography-font-weight-font-weight-medium: 500;
      --spacing-3xl: 1rem;
      --spacing-5xl: 1.25rem;
      --radius-button: 0.375rem;
      --colours-body-1: #707070;
    }
  `;

  const natwestTheme = `
    .theme-natwest {
      --colours-buttons-primary-default: #5e10b1;
      --colours-buttons-primary-hover-pressed: #3c1053;
      --colours-buttons-primary-disabled: #b3b3b3;
      --colours-buttons-primary-text-active: #ffffff;
      --colours-buttons-primary-text-disabled: #646068;
      --colours-buttons-secondary-secondary: rgba(255, 255, 255, 0);
      --colours-buttons-secondary-text-active: #333333;
      --colours-buttons-secondary-text-disabled: #ffffff;
      --colours-background-background-1: #ffffff;
      --colours-background-background-2: #f2f2f8;
      --typography-font-family-font-family-body: 'RN House Sans', 'Inter';
      --typography-font-size-font-size-md: 1rem;
      --typography-font-weight-font-weight-medium: 500;
      --spacing-3xl: 1rem;
      --spacing-5xl: 1.25rem;
      --radius-button: 62.438rem;
      --colours-body-1: #333333;
    }
  `;

  return theme === 'natwest' ? rewardTheme + natwestTheme : rewardTheme;
}

export default preview;
