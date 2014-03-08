export class ConsoleReporter {

  constructor(options = {}) {
    this.console = options.console || window.console;
  }

  receive(log) {
    var {level, group, message} = log;
    var processed = `[${level}|${group}] ${message}`;

    if (level === 'fatal') {
      this.error(processed);
    } else {
      this[level](processed);
    }
  }

  info(message) {
    this.console.info(message);
  }

  warn(message) {
    this.console.warn(message);
  }

  error(message) {
    this.console.error(message);
  }
}
