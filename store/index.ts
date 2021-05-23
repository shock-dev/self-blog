import reducer from './reducer';

import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { RootState } from './types';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore: MakeStore<RootState> = () =>
  createStore(reducer, bindMiddleware([]));

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
