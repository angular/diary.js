import {MockReporter} from '../../src/reporters/mock';

describe('MockReporter', () => {

  describe('logs', () => {

    it('should create an object with the logs property set to an empty array', () => {
      var reporter = new MockReporter();
      expect(reporter.logs).toEqual([]);
    });

  }


  describe('receive', () => {

    it('should take a info log object and store it in the log array as a string', () => {
      var reporter = new MockReporter();
      reporter.receive({
        level: 'info',
        message: 'an info message',
        group: 'test'
      });
      expect(reporter.logs).toEqual(['[info|test] an info message']);
    });


    it('should log messages into the log property in the proper order', () => {
      var reporter = new MockReporter();

      reporter.receive({
        level: 'info',
        message: 'an info message',
        group: 'test'
      });

      reporter.receive({
        level: 'error',
        message: 'an error message',
        group: 'test'
      });

      expect(reporter.logs).toEqual(['[info|test] an info message', '[error|test] an error message']);
    });
  });
});
