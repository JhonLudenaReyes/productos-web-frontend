import axios from "axios";

import { LIST_CATEGORY } from "./types";

export const getCategories = () => (dispatch) => {
  axios
    .get(`/categorias/list-categoria`)
    .then((res) => {
      dispatch({
        type: LIST_CATEGORY,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
