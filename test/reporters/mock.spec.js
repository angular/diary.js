import {MockReporter} from '../../src/reporters/mock';

describe('MockReporter', () => {
  var reporter;

  beforeEach(() => {
    reporter = new MockReporter();
  });

  describe('constructor', () => {

    it('should construct a class', () => {
      expect(reporter).toBeDefined();
    });

  });

  describe('receive', () => {

    it('should invoke console.info at the info level', () => {
      expect(reporter.logs.length).toEqual(0);

      reporter.receive({
        level: 'info',
        message: 'an info message',
        group: 'test'
      });

      expect(reporter.logs[0]).toEqual('[info|test] an info message');
    });
  });
});
