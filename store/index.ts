import { createWrapper, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { applyMiddleware, createStore, Store } from 'redux';
import { RootState } from './types';
import reducer from './reducer';
import rootSaga from './saga';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore: MakeStore<RootState> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, bindMiddleware([sagaMiddleware]));
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<RootState>(makeStore);
