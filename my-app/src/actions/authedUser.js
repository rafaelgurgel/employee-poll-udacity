export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

export function setAuthedUser(id) {
  localStorage.setItem('authedUser', id);

  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logoutAuthedUser() {
  localStorage.removeItem('authedUser');

  return {
    type: LOGOUT_AUTHED_USER,
  };
}
