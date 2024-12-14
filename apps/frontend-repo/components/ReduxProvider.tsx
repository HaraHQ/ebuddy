"use client";

import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store";

interface ReduxProviderProps {
  children: ReactNode;  // Ensure you're using the right ReactNode type
}

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <div>
        {children}
      </div>
    </Provider>
  );
}

export default ReduxProvider;
