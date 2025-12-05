import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import testSlice, { ITestState } from './reducers/testSlice';

export interface IReduxAction<T> {
  type: string,
  payload: T
}

const rootReducer = combineReducers({
  test: testSlice.reducer
});

export const setupStore = (props?: {
  preloadedState: {
    test?: ITestState
  }
}) => {
  const preloadedState = props?.preloadedState;

  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];