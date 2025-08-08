module.exports = {
  source: [
    'libs/ui/tokens/tokens/Primitive-Natwest/Mode 1.json',
    'libs/ui/tokens/tokens/Modes/Natwest.json'
  ],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'libs/ui/tokens/generated/',
      files: [
        {
          destination: '_variable-natwest.scss',
          format: 'css/variables'
        }
      ]
    }
  }
};

