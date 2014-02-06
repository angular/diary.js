var sharedConfig = require('pipe/karma');

module.exports = function(config) {
  sharedConfig(config);

  config.sauceLabs.testName = 'diary.js';

  config.files = [
    'test-main.js',
    {pattern: 'src/**/*.js', included: false},
    {pattern: 'test/**/*.js', included: false}
  ];

  config.preprocessors = {
    'src/**/*.js': ['traceur'],
    'test/**/*.js': ['traceur']
  };
};
