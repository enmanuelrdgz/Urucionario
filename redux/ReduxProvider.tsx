// components/ReduxProvider.tsx
import { initializeGame } from '@/db/db';
import React, { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadLevels } from './slices/globalSlice';
import { store } from './store';


interface Props {
  children: ReactNode;
}

const ReduxProvider = ({children }: Props) => {

  useEffect(() => {
    initializeGame()
    .then(levels => {
        store.dispatch(loadLevels(levels));
    })
    .catch(err => {
        console.log(err)
    })
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;