export class MockReporter {

  constructor() {
    this.logs = [];
  }

  receive(log) {
    var {level, message, group} = log;
    this.logs.push(`[${level}|${group}] ${message}`);
  }

}
