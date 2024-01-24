'use client';
import { Provider, useSelector } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { get_access_token } from '@/store/slice/login-slice';
import LoginWrapper from '@/components/loginWrapper';
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginWrapper>{children}</LoginWrapper>
      </PersistGate>
    </Provider>
  );
}
