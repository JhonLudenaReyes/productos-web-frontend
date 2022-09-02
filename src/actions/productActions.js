import axios from "axios";

import {
  LIST_PRODUCTS,
  SAVE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  EDIT_PRODUCT,
} from "./types";

export const getProducts = () => (dispatch) => {
  axios
    .get(`/productos/list-products`)
    .then((res) => {
      dispatch({
        type: LIST_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const saveProduct = (product) => (dispatch) => {
  axios
    .post(`/productos/save-product`, product)
    .then((res) => {
      dispatch({
        type: SAVE_PRODUCT,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const editProduct = (product) => (dispatch) => {
  axios
    .put(`/productos/update-product`, product)
    .then((res) => {
      dispatch({
        type: EDIT_PRODUCT,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const deleteProduct = (idProduct) => (dispatch) => {
  axios
    .put(`/productos/delete-product/${idProduct}`)
    .then((res) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const setProduct = (product) => (dispatch) => {
  dispatch({
    type: SET_PRODUCT,
    payload: product,
  });
};
