import { createSlice } from '@reduxjs/toolkit';

import { IReduxAction } from '~/store';

/** User local state */
export interface ITestState {
  _: undefined
}

/** Default user state */
export const testSliceDefaults: ITestState = {
  _: undefined
};

const testSlice = createSlice({
  name: 'test',
  initialState: testSliceDefaults,
  reducers: {
    reducer(state, action: IReduxAction<ITestState>) {
      for (let key in action.payload) {
        state[key] = action.payload[key];
      }
    }
  }
});

export default testSlice;