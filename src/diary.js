import guid from './guid';

export class Diary {
  constructor(group) {
    this.group = group;
    this.isTiming = false;
  }

  log(level, group, message, endOf = false) {
    var id = guid();
    var message = {
      level, group, message,
      timestamp: Date.now(),
      guid: id
    };


    if (endOf) {
      message.endOf = endOf;
    }

    for (var target of Diary.reporters) {
      var {config, reporter} = target;
      if ((config.level.indexOf('*') !== -1 || config.level.indexOf(level) !== -1)
          &&
          (config.group.indexOf('*') !== -1 || config.group.indexOf(group) !== -1)
         ) {
        reporter.receive(message);
      }
    }

    if (this.isTiming) {
      this.isTiming = false;

      return (message) => {
        return this.log(level, group, message, id);
      };
    }

  }

  get start() {
    this.isTiming = true;
    return this;
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
    var newReporter = {
      reporter, config
    };

    Diary.reporters.push(newReporter);
    
    return () => {
      Diary.reporters.splice(Diary.reporters.indexOf(newReporter), 1);
    };
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
    return this.log(level, this.group, message);
  }
})(level);
