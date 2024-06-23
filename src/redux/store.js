import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/_root.reducer'; // imports ./redux/reducers/index.js
import rootSaga from './sagas/_root.saga'; // imports ./redux/sagas/index.js

const sagaMiddleware = createSagaMiddleware();

const middlewareList = applyMiddleware(sagaMiddleware);

const store = createStore(
  rootReducer,
  middlewareList,
);

sagaMiddleware.run(rootSaga);

export default store;
