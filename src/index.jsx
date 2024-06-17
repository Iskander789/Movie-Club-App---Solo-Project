import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import AppWithRouter from './components/App/App';
import rootReducer from './redux/reducers/_root.reducer';
import rootSaga from './redux/sagas/_root.saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <AppWithRouter />
  </Provider>,
  document.getElementById('react-root')
);
