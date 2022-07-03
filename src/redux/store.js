import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';

/**
 * configureStore(): wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.
 */

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
