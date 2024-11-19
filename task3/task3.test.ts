import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('task3', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('returns correct date without argument passed', () => {
    mockDate.set({ isoDate: '2019-03-05T15:00:00.000Z' });

    expect(getUtcStringDate()).toBe('2019-03-05T15:00:00.000Z');
  });

  it('returns correct date with argument passed', () => {
    const now = new Date('2019-03-05T15:00:00.000Z');

    expect(getUtcStringDate(now)).toBe('2019-03-05T15:00:00.000Z');
  });

  it('returns correct date without argument passed and with timezone offset', () => {
    mockDate.set({
      isoDate: '2019-03-05 15:00:00',
      offset: 120,
    });

    expect(getUtcStringDate()).toBe('2019-03-05T13:00:00.000Z');
  });

  it('returns correct date with argument passed and with timezone offset', () => {
    mockDate.set({ offset: 180 });

    const now = new Date('2019-03-05 15:00:00');

    expect(getUtcStringDate(now)).toBe('2019-03-05T13:00:00.000Z');
  });
});
