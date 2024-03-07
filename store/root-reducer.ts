import { combineReducers } from '@reduxjs/toolkit';
import loginTokenScreen from './slice/login-slice';

const appReducer = combineReducers({
  loginTokenScreen: loginTokenScreen,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'loginScreen/logoutUser') {
    // this applies to all keys defined in persistConfig(s)
    // storage.removeItem('persist:root')
    state = undefined;

    state = {} as RootState;
  }
  //   if (action.type === "LogoutSuccess") {
  //     state = undefined;
  //   }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
