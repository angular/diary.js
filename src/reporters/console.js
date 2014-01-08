export class ConsoleReporter {

  constructor(options) {
    this.console = options.console;
  }

  receive(log) {
    var {level, group, message} = log;
    // TODO Too assuming about current browser console implementations.
    this.console[level](`[${level}|${group}] ${message}`);
  }
}
