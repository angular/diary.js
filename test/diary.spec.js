import {Diary} from '../src/diary';

describe('Diary Reporter Registration', () => {
  it('should provide a callback to unregister the reporter', () => {
    var remove = Diary.reporter({ receive() {}});
    expect(remove).toBeDefined();
    expect(Diary.reporters.length).toEqual(1);
    remove();
    expect(Diary.reporters.length).toEqual(0);
  });

  it('should remove the correct reporter', () => {
    var persist = { receive() {}};
    var remove = Diary.reporter({ receive() {}});
    Diary.reporter(persist);
    expect(Diary.reporters.length).toEqual(2);
    remove();
    expect(Diary.reporters.length).toEqual(1);
    expect(Diary.reporters[0].reporter).toEqual(persist);
  });
});

describe('Diary', () => {
  var logger, reporter;

  beforeEach(() => {
    logger = Diary.logger('feature');
    reporter = jasmine.createSpyObj('reporter', ['receive']);
    Diary.reporter(reporter);
  });

  it('logger should provide an object', () => {
    expect(logger).not.toBeUndefined();
  });


  it('it should log the event to all reporters', () => {
    logger.log('info', 'feature', 'ahoy');

    expect(reporter.receive).toHaveBeenCalledWith({
      level: 'info',
      group: 'feature', 
      message: 'ahoy'
    });
  });

  it('should log my info', () => {
    logger.info('my test message');

    expect(reporter.receive).toHaveBeenCalledWith({
      level: 'info',
      group: 'feature',
      message: 'my test message'
    });
  });

  it('should only send events for info', () => {
    var featureReporter = jasmine.createSpyObj('featureReporter', [
      'receive'
    ]);

    Diary.reporter(featureReporter, {
      level: ['info']
    });

    logger.info('a info message');
    logger.warn('a warn message');

    expect(featureReporter.receive).toHaveBeenCalledWith({
      level: 'info', 
      group: 'feature',
      message: 'a info message'
    });
    expect(featureReporter.receive.calls.count()).toEqual(1);
  });

  it('should support info, warn, fatal & error', () => {
    logger.info('info');
    logger.warn('warn');
    logger.fatal('fatal');
    logger.error('error');

    expect(reporter.receive.calls.count()).toEqual(4);
  });

  it('should accept a string as the config level', () => {
    var string = jasmine.createSpyObj('featureReporter', [
      'receive'
    ]);

    Diary.reporter(string, { level: 'warn' });
    var log = Diary.logger('custom');
    log.warn('hello');
    expect(string.receive.calls.count()).toEqual(1);

  });

  it('start as the level should receive events regardless of level', () => {

    var universal = jasmine.createSpyObj('featureReporter', [
      'receive'
    ]);

    Diary.reporter(universal, {
      level: ['*']
    });

    logger.info('a info message');
    logger.warn('a warn message');

    expect(universal.receive).toHaveBeenCalledWith({
      level: 'info',
      group: 'feature',
      message: 'a info message'
    });

    expect(universal.receive).toHaveBeenCalledWith({
      level: 'warn',
      group: 'feature',
      message: 'a warn message'
    });

  });

  it('should guard based on group', () => {

    var http = jasmine.createSpyObj('featureReporter', [
      'receive'
    ]);

    Diary.reporter(http, {
      level: ['*'],
      group: ['http']
    });

    var httpLogger = Diary.logger('http');

    httpLogger.info('hello');
    logger.info('global');
    expect(http.receive.calls.count()).toEqual(1);
    expect(http.receive).toHaveBeenCalledWith({ level: 'info', group: 'http', message: 'hello' });

  });
  
});
