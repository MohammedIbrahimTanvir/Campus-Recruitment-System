import { LOADING } from "../types";

export const LoadingAction = (loading) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: loading,
    });
  };
};
