import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from './types';
import user from './auth/reducer';

const combinedReducer = combineReducers<RootState>({ user });

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    };
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
