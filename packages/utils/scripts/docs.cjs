const glob = require('glob');
const { generateDocumentation } = require('tsdoc-markdown');

const inputFiles = glob.globSync('lib/**/*.ts', {
  ignore: ['lib/**/*.spec.ts'],
});

generateDocumentation({
  inputFiles: inputFiles,
  outputFile: 'README.md',
  markdownOptions: {
    emoji: null,
    headingLevel: '##',
  },
  buildOptions: {
    explore: true,
    types: false,
  },
});