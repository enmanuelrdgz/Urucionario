// components/ReduxProvider.tsx
import React, { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { fetchDataThunk } from './slices/dataSlice';
import { store } from './store';


interface Props {
  children: ReactNode;
}

const ReduxProvider = ({children }: Props) => {

  useEffect(() => {
    store.dispatch(fetchDataThunk());
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;