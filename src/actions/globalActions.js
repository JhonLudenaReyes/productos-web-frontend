import { CHANGE_STATE, RESET_STORE } from "./types";

export const changeState = (state) => (dispatch) => {
  dispatch({
    type: CHANGE_STATE,
    payload: state,
  });
};

export const resetStore = (state) => (dispatch) => {
  dispatch({
    type: RESET_STORE,
    payload: state,
  });
};
