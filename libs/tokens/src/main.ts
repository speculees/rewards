import StyleDictionary from 'style-dictionary';

type Theme = {
  id: string;
  name: string;
  selectedTokenSets: {
    [key: string]: string;
  };
}

function getSources(sources: Record<string, string>): string[] {
  return Object
    .entries(sources)
    .sort(([, typeA]) => typeA === 'enabled' ? -1 : 1)
    .map(([source]) => `./src/tokens/${source}.json`);
}

const themes: Theme[] = require('./tokens/$themes.json');

console.log('📦  Compiling tokens...');

const promises = themes.map((theme) => {
  const destination = theme.name.toLowerCase().replace(/ /g, '-') + '.css';
  const source = getSources(theme.selectedTokenSets);

  console.log('📦  Compiling to', destination);
  console.log('📦  Using sources', source);

  const sd = new StyleDictionary({
    source,
    platforms: {
      web: {
        transformGroup: "css",
        buildPath: "dist/",
        files: [{ destination, format: "css/variables" }]
      }
    }
  });

  sd.log.verbosity = 'verbose';
  return sd.buildAllPlatforms();
});

Promise
  .all(promises)
  .then(() => console.log('✅  Done'));
