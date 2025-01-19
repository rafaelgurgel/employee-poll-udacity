import { RECEIVE_USERS, receiveUsers } from '../users';

describe('users actions', () => {
  describe('receiveUsers', () => {
    it('should create an action to receive users', () => {
      const users = {
        user1: { id: 'user1', name: 'User One' },
        user2: { id: 'user2', name: 'User Two' },
      };

      const expectedAction = {
        type: RECEIVE_USERS,
        users,
      };

      const action = receiveUsers(users);
      expect(action).toEqual(expectedAction);
    });

    it('should handle an empty users object', () => {
      const users = {};

      const expectedAction = {
        type: RECEIVE_USERS,
        users,
      };

      const action = receiveUsers(users);
      expect(action).toEqual(expectedAction);
    });

    it('should handle null or undefined users gracefully', () => {
      const expectedAction = {
        type: RECEIVE_USERS,
        users: null,
      };

      const action = receiveUsers(null);
      expect(action).toEqual(expectedAction);
    });
  });
});
