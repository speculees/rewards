module.exports = {
  source: ['libs/ui/tokens/tokens.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'libs/ui/tokens/generated/',
      files: [
        {
          destination: '_variables.scss',
          format: 'css/variables'
        }
      ]
    }
  }
};

