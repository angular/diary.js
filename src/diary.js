export class Diary {
  constructor(group) {
    this.group = group;
  }

  log(level, group, message) {
    for (var target of Diary.reporters) {
      var {config, reporter} = target;
      if ((config.level.indexOf('*') !== -1 || config.level.indexOf(level) !== -1)
          &&
          (config.group.indexOf('*') !== -1 || config.group.indexOf(group) !== -1)
         ) {
        reporter.receive({
          level: level, 
          group: group, 
          message: message
        });
      }
    }
  }
}

/**
 * Dynamically construct all of the log level functions.
 */
for (var level of ['info', 'warn', 'fatal', 'error']) (function(level) {
  Diary.prototype[level] = function(message) {
    this.log(level, this.group, message);
  }
})(level);

Diary.reporters = [];

/**
 * Factory method for convenient logger construction.
 */
Diary.logger = (group) => {
  return new Diary(group);
}

/**
 * Register a reporter.
 */
Diary.reporter = (instance, config) => {

  var defaults = { level: ['*'], group: ['*'] };
  var config = config || {};
  for (var key in defaults) {
    config[key] = config[key] || defaults[key];
  }
  Diary.reporters.push({
    reporter: instance,
    config: config
  });
}
