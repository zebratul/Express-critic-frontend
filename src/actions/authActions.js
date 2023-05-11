import axiosInstance from '../utils/axiosInstance';
export const AUTH_USER = 'AUTH_USER';
export const LOGOUT = 'LOGOUT';


export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: { user },
  };
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.post('/api/auth/logout', {}, { withCredentials: true });
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};