import {ConsoleReporter} from '../../src/reporters/console.js';

describe('ConsoleReporter', () => {
  var reporter, target;

  beforeEach(() => {
    target  = jasmine.createSpyObj('target', ['info', 'warn']);
    reporter = new ConsoleReporter({
      console: target
    });
  });

  it('should construct a class', () => {
    expect(reporter).toBeDefined();
  });

  describe('receive', () => {

    it('should invoke console.info at the info level', () => {
      reporter.receive({
        level: 'info',
        message: 'an info message',
        group: 'test'
      });

      expect(target.info).toHaveBeenCalledWith('[info|test] an info message');
    });
  });
});
