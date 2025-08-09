// components/ReduxProvider.tsx
import React, { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { initGameThunk } from './slices/dataSlice';
import { store } from './store';


interface Props {
  children: ReactNode;
}

const ReduxProvider = ({children }: Props) => {

  useEffect(() => {
    debugger;
    store.dispatch(initGameThunk());
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;