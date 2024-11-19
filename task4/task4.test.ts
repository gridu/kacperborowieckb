import { validateMathExpression } from './index';

describe('task 5', () => {
  it.each([
    '1+1,23',
    '(2*(2-2))',
    '(4)(2 / 2^2.24)',
    '(2 * 2) / (1 + 4)',
    '(((4.2) * 2 + 1) + 23) / -1',
  ])('recognized %p as valid math expression', (mathExpression) => {
    expect(validateMathExpression(mathExpression)).toBe(true);
  });

  it.each(['1x', '2x2', '()', '2,,23', '2..2', '(2)22/', 'some text'])(
    'recognized %p as invalid math expression',
    (mathExpression) => {
      expect(validateMathExpression(mathExpression)).toBe(false);
    }
  );
});
