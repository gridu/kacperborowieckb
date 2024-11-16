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

  it('returns false if name has length less than 3 symbols', async () => {
    const result = await validateUserName('Jo');

    expect(result).toBe(false);
  });

  it('returns false if name do not contains only alphanumeric symbols', async () => {
    const result = await validateUserName('John/');

    expect(result).toBe(false);
  });

  it('returns false if name contains spaces', async () => {
    const result = await validateUserName('John ');

    expect(result).toBe(false);
  });

  it('returns false if name starts with a number', async () => {
    const result = await validateUserName('2John');

    expect(result).toBe(false);
  });

  it('calls fetchIsUserAvailable method to check if name is unique', async () => {
    await validateUserName(validName);

    expect(mockFetchIsUserNameAvailable).toHaveBeenCalledWith(validName);
  });

  it('do not make any request if name is not valid', async () => {
    await validateUserName('Jo');

    expect(mockFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('return true with valid name when fetchIsUserAvailable succeed', async () => {
    const result = await validateUserName(validName);

    expect(result).toBe(true);
  });

  it('returns false if fetchIsUserAvailable throws', async () => {
    mockFetchIsUserNameAvailable.mockImplementation(() => {
      throw new Error();
    });

    const result = await validateUserName(validName);

    expect(result).toBe(false);
  });
});
