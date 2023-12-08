import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
} from '../actionTypes';

const backendUrl = 'http://localhost:4000'; // Update with your backend URL

export const registerUser = (name, email, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/users`,
        {
          name,
          email,
          password,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      // Save the user into localstorage
      localStorage.setItem('userAuthData', JSON.stringify(data));
    } catch (error) {
      console.log('mongodb error', error);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const loginUser = (email, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/api/users/login`,
        { email, password },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userAuthData', JSON.stringify(data));
    } catch (error) {
      // Every error has a response.data where we can grab the error and display it to the user
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.message, // The message is a key for our error message in our routes
      });
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem('userAuthData');
    try {
      dispatch({
        type: USER_LOGOUT,
      });
    } catch (error) {}
  };
};

export const getUserProfile = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: USER_PROFILE_REQUEST,
      });
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${backendUrl}/api/users/profile`, config);
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

export const updateUser = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
        loading: true,
      });
      // Get the token of the user from store because that's what our endpoint needs
      const { userInfo } = getState().userLogin;
      // Create a config and pass it to axios for authentication
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${backendUrl}/api/users/profile/update`,
        { name, email, password },
        config
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const fetchUsers = () => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_USERS_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`${backendUrl}/api/users`, config);
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};
