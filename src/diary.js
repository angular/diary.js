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
          level, group, message
        });
      }
    }
  }

  /**
   * Factory method for convenient logger construction.
   */
  static logger(group) {
    return new Diary(group);
  }
  /**
   * Register a reporter.
   */
  static reporter(reporter, config = {}) {
    var defaults = { level: ['*'], group: ['*'] };
    config = [defaults, config].reduce(Object.assign);
    Diary.reporters.push({
      reporter, config
    });
  }

  static get reporters() {
    return reporters;
  }
}

var reporters = [];

/**
 * Dynamically construct all of the log level functions.
 */
for (var level of ['info', 'warn', 'fatal', 'error']) (function(level) {
  Diary.prototype[level] = function(message) {
    this.log(level, this.group, message);
  }
})(level);
