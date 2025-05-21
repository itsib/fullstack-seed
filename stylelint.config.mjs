/** @type {import('stylelint').Config} */
export default {
  configBasedir: '.',
  ignoreFiles: ['!**/*'],
  overrides: [
    {
      extends: 'stylelint-config-recommended',
      files: ['**/*.css'],
      ignoreFiles: ["**/icon-font.css", "**/icons.css"],
      plugins: [
        'stylelint-use-nesting',
      ],
      rules: {
        'no-descending-specificity': null,
        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['screen', 'tailwind']
          }
        ],
        'at-rule-no-deprecated': [
          true,
          {
            ignoreAtRules: ['apply']
          }
        ]
      }
    }
  ],
};