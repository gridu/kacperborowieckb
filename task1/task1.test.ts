import { validateUserName } from 'tasks/task1/index';
import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

jest.mock('task1/fetchIsUserNameValid', () => ({
  fetchIsUserNameAvailable: jest.fn().mockReturnValue(true),
}));

const mockFetchIsUserNameAvailable = jest.mocked(fetchIsUserNameAvailable);

describe('task1', () => {
  const validName = 'John';

  beforeEach(() => {
    mockFetchIsUserNameAvailable.mockClear();
  });

  it('returns false if name has length less than 3 symbols', () => {
    expect(validateUserName('Jo')).resolves.toBe(false);
  });

  it('returns false if name do not contains only alphanumeric symbols', () => {
    expect(validateUserName('John/')).resolves.toBe(false);
  });

  it('returns false if name contains spaces', () => {
    expect(validateUserName('John ')).resolves.toBe(false);
  });

  it('returns false if name starts with a number', () => {
    expect(validateUserName('2John')).resolves.toBe(false);
  });

  it('calls fetchIsUserAvailable method to check if name is unique', () => {
    validateUserName(validName);

    expect(mockFetchIsUserNameAvailable).toHaveBeenCalledWith(validName);
  });

  it('do not make any request if name is not valid', () => {
    validateUserName('Jo');

    expect(mockFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('return true with valid name when fetchIsUserAvailable succeed', () => {
    expect(validateUserName(validName)).resolves.toBe(true);
  });

  it('returns false if fetchIsUserAvailable throws', () => {
    mockFetchIsUserNameAvailable.mockImplementation(() => {
      throw new Error();
    });

    expect(validateUserName(validName)).resolves.toBe(false);
  });
});
