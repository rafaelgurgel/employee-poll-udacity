import { SET_AUTHED_USER, LOGOUT_AUTHED_USER, setAuthedUser, logoutAuthedUser } from '../authedUser';

describe('authedUser actions', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('setAuthedUser', () => {
    it('should create an action to set the authed user', () => {
      const userId = 'user123';
      const expectedAction = {
        type: SET_AUTHED_USER,
        id: userId,
      };

      const action = setAuthedUser(userId);
      expect(action).toEqual(expectedAction);
    });

    it('should save the authed user ID to localStorage', () => {
      const userId = 'user123';

      setAuthedUser(userId);
      expect(localStorage.getItem('authedUser')).toBe(userId);
    });
  });

  describe('logoutAuthedUser', () => {
    it('should create an action to log out the authed user', () => {
      const expectedAction = {
        type: LOGOUT_AUTHED_USER,
      };

      const action = logoutAuthedUser();
      expect(action).toEqual(expectedAction);
    });

    it('should remove the authed user ID from localStorage', () => {
      localStorage.setItem('authedUser', 'user123');

      logoutAuthedUser();
      expect(localStorage.getItem('authedUser')).toBeNull();
    });
  });
});
