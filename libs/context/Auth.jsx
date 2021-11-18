import React from "react";

export const AuthContext = React.createContext({});

const initState = {
  authToken: null,
  isSignIn: false,
  loading: true,
};

function authReducer(state = initState, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignIn: true, authToken: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignIn: false, authToken: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function AuthProvider(props) {
  const [state, dispatch] = React.useReducer(authReducer, initState);
  const dispatchSignIn = React.useCallback((authToken) => {
    dispatch({ type: "SIGN_IN", payload: authToken }, [dispatch]);
  });
  const dispatchSignOut = React.useCallback(() => {
    dispatch({ type: "SIGN_OUT" });
  }, [dispatch]);
  const dispatchLoading = React.useCallback((payload) => {
    dispatch({ type: "SET_LOADING", payload: payload });
  });
  const value = React.useMemo(
    () => ({
      ...state,
      dispatchSignIn,
      dispatchSignOut,
      dispatchLoading,
    }),
    [state]
  );
  return <AuthContext.Provider value={value} {...props} />;
}
