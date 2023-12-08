import axios from 'axios';
import {
  CREATE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST,
  BOOK_DETAIL_SUCCESS,
  BOOK_DETAIL_FAIL,
  BOOK_DETAIL_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_FAIL,
} from '../actionTypes';

const backendUrl = 'http://localhost:4000'; // Update with your backend URL

export const createBook = bookData => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_BOOK_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`${backendUrl}/api/books`, bookData, config);

      dispatch({
        type: CREATE_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOOK_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const fetchBooks = () => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_BOOK_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`${backendUrl}/api/books`, config);

      dispatch({
        type: FETCH_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_BOOK_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const deleteBook = id => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_BOOK_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.delete(`${backendUrl}/api/books/${id}`, config);
      dispatch({
        type: DELETE_BOOK_SUCCESS,
        payload: data,
      });

      dispatch(fetchBooks()); // You may want to fetch books again after deletion
    } catch (error) {
      dispatch({
        type: DELETE_BOOK_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const fetchBook = id => {
  return async dispatch => {
    try {
      dispatch({
        type: BOOK_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`${backendUrl}/api/books/${id}`, config);

      dispatch({
        type: BOOK_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_DETAIL_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const updateBook = (id, bookData) => {
  return async dispatch => {
    try {
      dispatch({
        type: BOOK_UPDATE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(`${backendUrl}/api/books/${id}`, bookData, config);
      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_UPDATE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};