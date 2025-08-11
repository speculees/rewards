module.exports = {
  source: [
    'libs/ui/tokens/style-dictionary/tokens/global.json',
    'libs/ui/tokens/style-dictionary/tokens/Primitive-Reward/**/*.json',
    'libs/ui/tokens/style-dictionary/tokens/Primitive-Natwest/**/*.json',
    'libs/ui/tokens/style-dictionary/tokens/Modes/Natwest.json',
  ],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'libs/ui/tokens/generated/',
      files: [
        {
          destination: '_natwest-classes.scss',
          format: 'css/variables',
          options: {
            selector: '.theme-natwest',
          },
        },
      ],
    },
  },
};
