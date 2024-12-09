import { QuantityValidator } from 'tasks/task2';

const validMessageStub = { isValid: true, error: null } as const;

const createValidateErrorMessage = (message: string) => {
  return {
    isValid: false,
    error: message,
  } as const;
};

describe('QuantityValidator', () => {
  describe('constructor', () => {
    it('accepts valid valued for threshold and packageSize', () => {
      expect(() => new QuantityValidator(20, 10)).not.toThrow();
    });

    it('throws an error when threshold is a negative value', () => {
      expect(() => new QuantityValidator(-2, 10)).toThrow();
    });

    it('accepts threshold with 0 value', () => {
      expect(() => new QuantityValidator(0, 10)).not.toThrow();
    });

    it('throws an error when packageSize is negative', () => {
      expect(() => new QuantityValidator(10, -2)).toThrow();
    });

    it('throws an error when packageSize is zero', () => {
      expect(() => new QuantityValidator(10, 0)).toThrow();
    });
  });

  describe('validate()', () => {
    it('should be defined', () => {
      const validator = new QuantityValidator(10, 5);

      expect(validator.validate).toBeDefined();
    });

    it('returns success validation when quantity is less than threshold ', () => {
      const validator = new QuantityValidator(10, 5);

      expect(validator.validate(8)).toEqual(validMessageStub);
    });

    it('returns success validation when quantity is more than threshold and divisible by packageSize', () => {
      const validator = new QuantityValidator(10, 5);

      expect(validator.validate(15)).toEqual(validMessageStub);
    });

    it('returns success validation when quantity is equal threshold and divisible by packageSize', () => {
      const validator = new QuantityValidator(10, 5);

      expect(validator.validate(10)).toEqual(validMessageStub);
    });

    it('returns failed validation when quantity is more than threshold and not divisible by packageSize', () => {
      const validator = new QuantityValidator(10, 5);

      expect(validator.validate(12)).toEqual(
        createValidateErrorMessage('Quantity should be divisible by 5')
      );
    });

    it('returns failed validation when quantity is equal threshold and not divisible by packageSize', () => {
      const validator = new QuantityValidator(10, 6);

      expect(validator.validate(10)).toEqual(
        createValidateErrorMessage('Quantity should be divisible by 6')
      );
    });

    it('returns failed validation when quantity is less than 0', () => {
      const validator = new QuantityValidator(10, 6);

      expect(validator.validate(-2)).toEqual(
        createValidateErrorMessage('Quantity should be a positive value')
      );
    });

    it('returns failed validation when quantity is equal 0', () => {
      const validator = new QuantityValidator(10, 6);

      expect(validator.validate(0)).toEqual(
        createValidateErrorMessage('Quantity should be a positive value')
      );
    });
  });
});
