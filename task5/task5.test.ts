import { GlobalCounter } from './index';

describe('GlobalCounter', () => {
  let GlobalCounterIsolate: typeof GlobalCounter;

  beforeEach(() => {
    jest.isolateModules(() => {
      GlobalCounterIsolate = require('./index').GlobalCounter;
    });
  });

  it('has initial value "0"', () => {
    expect(GlobalCounterIsolate.getValue()).toBe(0);
  });

  it('increments counter', () => {
    GlobalCounterIsolate.increment();

    expect(GlobalCounterIsolate.getValue()).toBe(1);
  });

  it('decrements value', () => {
    GlobalCounterIsolate.decrement();

    expect(GlobalCounterIsolate.getValue()).toBe(-1);
  });

  it('multiplies counter', () => {
    GlobalCounterIsolate.multiply(4);

    expect(GlobalCounterIsolate.getValue()).toBe(0);
  });

  it('multiplies counter after increment action', () => {
    GlobalCounterIsolate.increment();
    GlobalCounterIsolate.increment();
    GlobalCounterIsolate.multiply(4);

    expect(GlobalCounterIsolate.getValue()).toBe(8);
  });
});
