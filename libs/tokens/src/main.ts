import StyleDictionary from 'style-dictionary';
import merge from 'lodash.merge';
import fs from 'fs';
import type { DesignTokens } from 'node_modules/style-dictionary/types/DesignToken';

type Theme = {
  id: string;
  name: string;
  selectedTokenSets: {
    [key: string]: string;
  };
}

// read themes json from src/tokens/$themes.json
function readThemes(): Theme[] {
  return require('./tokens/$themes.json');
}

// /**
//  * Merge brand + mode JSONs into a single token object
//  */
// function loadAndMergeSources(sources: string[]) {
//   let merged: DesignTokens = {};
//   for (const src of sources) {
//     const json = JSON.parse(fs.readFileSync(src, "utf8"));
//     merged = merge(json, merged);
//   }
//   return merged;
// }

function getSources(sources: Record<string, string>): string[] {
  return Object.entries(sources)
  .sort(([, typeA]) => typeA === 'enabled' ? -1 : 1)
  .map(([source]) => {
    return `./src/tokens/${source}.json`;
  });
}

const themes = readThemes();

console.log('📦  Compiling tokens...');

const promises = themes.map((theme) => {
  const destination = theme.name.toLowerCase().replace(/ /g, '-') + '.css';

  console.log('📦  Compiling to', destination);
  const source = getSources(theme.selectedTokenSets);
  console.log('📦  Using sources', source);

  const sd = new StyleDictionary({
    source,
    platforms: {
      web: {
        transformGroup: "css",
        buildPath: "dist/",
        files: [
          { destination, format: "css/variables" }
        ]
      }
    }
  });

  sd.log.verbosity = 'verbose';
  return sd.buildAllPlatforms();
});

Promise.all(promises).then(() => {
  console.log('✅  Done');
});
