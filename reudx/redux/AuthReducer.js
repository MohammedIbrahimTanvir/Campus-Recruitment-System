import { LOGGED_IN } from "./types";

const initialState = {
  loggedIn: false,
  userInfo: "",
  logType: "",
  token: "",
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      const paylodLoggedIn = action.payload;
      return {
        ...state,
        loggedIn:  paylodLoggedIn.loggedIn,
        userInfo: paylodLoggedIn.userInfo,
        logType: paylodLoggedIn.logType,
        token: paylodLoggedIn.token,
      };

    default:
      return state;
  }
};

export default AuthReducer;
