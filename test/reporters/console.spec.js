import {ConsoleReporter} from '../../src/reporters/console';

describe('ConsoleReporter', () => {
  var reporter, target;

  beforeEach(() => {
    target  = jasmine.createSpyObj('target', ['info', 'warn', 'error']);
    reporter = new ConsoleReporter({
      console: target
    });
  });

  describe('constructor', () => {

    it('should construct a class', () => {
      expect(reporter).toBeDefined();
    });

    it('should gracefully handle the absence of an options parameter', () => {
      expect(() => { new ConsoleReporter(); }).not.toThrow();
    });

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

    it('should invoke console.warn at the warn level', () => {
      reporter.receive({
        level: 'warn',
        message: 'a warn message',
        group: 'test'
      });

      expect(target.warn).toHaveBeenCalledWith('[warn|test] a warn message');
    });

    it('should invoke console.error at the error level', () => {
      reporter.receive({
        level: 'error',
        message: 'a error message',
        group: 'test'
      });

      expect(target.error).toHaveBeenCalledWith('[error|test] a error message');
    });

    it('should invoke console.error at the fatal level', () => {
      reporter.receive({
        level: 'fatal',
        message: 'a fatal message',
        group: 'test'
      });

      expect(target.error).toHaveBeenCalledWith('[fatal|test] a fatal message');
    });
  });
});
