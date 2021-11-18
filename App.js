import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootScreen from "./screens/RootScreen";
import MainProvider from "./libs/context/MainProvider";
import { createContext, useState } from "react";
import { store } from "./reudx/redux/store";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
export const LoginContext = createContext();

function App() {
  const [logType, setLogType] = useState("");
  return (
    <Provider store={store}>
      <LoginContext.Provider value={[logType, setLogType]}>
        <MainProvider>
          <NavigationContainer>
            <NativeBaseProvider>
              <RootScreen />
            </NativeBaseProvider>
          </NavigationContainer>
        </MainProvider>
      </LoginContext.Provider>
    </Provider>
  );
}

export default App;
