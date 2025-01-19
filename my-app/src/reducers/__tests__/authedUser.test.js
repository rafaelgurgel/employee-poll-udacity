import authedUser from '../authedUser';
import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from '../../actions/authedUser';

describe('authedUser reducer', () => {
  const initialState = null;

  it('should return the initial state when no action is passed', () => {
    const state = authedUser(undefined, {});
    expect(state).toBe(initialState);
  });

  it('should handle SET_AUTHED_USER', () => {
    const action = {
      type: SET_AUTHED_USER,
      id: 'user123',
    };

    const state = authedUser(initialState, action);
    expect(state).toBe('user123');
  });

  it('should handle LOGOUT_AUTHED_USER', () => {
    const action = {
      type: LOGOUT_AUTHED_USER,
    };

    const state = authedUser('user123', action);
    expect(state).toBeNull();
  });

  it('should return the current state for unknown action types', () => {
    const currentState = 'user123';
    const action = { type: 'UNKNOWN_ACTION' };

    const state = authedUser(currentState, action);
    expect(state).toBe(currentState);
  });

  it('should initialize state from localStorage if available', () => {
    const mockLocalStorageState = 'storedUser';
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockLocalStorageState);

    const state = authedUser(undefined, {});
    expect(state).toBe(mockLocalStorageState);

    Storage.prototype.getItem.mockRestore();
  });
});
