module.exports = {
  source: [
    'libs/ui/tokens/style-dictionary/tokens/global.json',
    'libs/ui/tokens/style-dictionary/tokens/Primitive-Reward/**/*.json',
    'libs/ui/tokens/style-dictionary/tokens/Modes/Reward.json',
  ],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'libs/ui/tokens/generated/',
      files: [
        {
          destination: '_reward-classes.scss',
          format: 'css/variables',
          options: {
            selector: ':root, .theme-reward',
          },
        },
      ],
    },
  },
};
