import axiosInstance from '../utils/axiosInstance';
import { authUser } from '../actions/authActions';

export const checkAuth = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/api/auth/check', { withCredentials: true });
        const { user } = response.data;
        dispatch(authUser(user));
    } catch (error) {
        console.log('Error checking authentication status:', error);
    }
};
