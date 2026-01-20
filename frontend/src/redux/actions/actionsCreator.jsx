import {
  ADD_TO_CART,
  DECREMENT_ITEM,
  FETCH_FAILED,
  FETCH_START,
  FETCH_SUCCESS,
  RANGE_FILTER,
  REMOVE_FROM_CART,
  SELECTED_PRODUCT,
  SET_PROFILE_INFO,
} from "./actionsTypes";

//action creators
export const startFetch = () => {
  return {
    type: FETCH_START,
  };
};

export const successFetch = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};

export const failedFetch = () => {
  return {
    type: FETCH_FAILED,
  };
};

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload: payload,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const setProfileInfo = (payload) => {
  return {
    type: SET_PROFILE_INFO,
    payload: payload,
  };
};

export const setSelectProduct = (payload) => {
  return {
    type: SELECTED_PRODUCT,
    payload: payload,
  };
};

export const decrementItem = (id) => {
  return {
    type: DECREMENT_ITEM,
    payload: id,
  };
};

export const setRangeValue = (payload) => {
  return {
    type: RANGE_FILTER,
    payload: payload,
  };
};

export const setSearchTerm = (payload) => {
  return {
    type: SEARCH_FILTER,
    payload: payload,
  };
};
