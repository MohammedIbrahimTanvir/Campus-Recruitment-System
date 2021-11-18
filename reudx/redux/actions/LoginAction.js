import { LOGGED_IN } from "../types";

export const LoginAction = (userData) => {
  console.log("From LoginAction ", userData);
  return (dispatch) => {
    dispatch({
      type: LOGGED_IN,
      payload: userData,
    });
  };
};
